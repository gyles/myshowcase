import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRating, Rating } from 'app/shared/model/rating.model';
import { RatingService } from './rating.service';
import { IUser, UserService, AccountService } from 'app/core';
import { ClickEvent, RatingChangeEvent, HoverRatingChangeEvent } from 'angular-star-rating';

@Component({
  selector: 'jhi-rating-update',
  templateUrl: './rating-update.component.html'
})
export class RatingUpdateComponent implements OnInit {
  rating: IRating;
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    score: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    review: [null, [Validators.required, Validators.maxLength(255)]],
    user: [{ value: '', disabled: true }, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ratingService: RatingService,
    protected userService: UserService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rating }) => {
      this.updateForm(rating);
      this.rating = rating;
    });

    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));

    this.accountService.identity().then(account => {
      this.userService
        .find(account.login)
        .pipe(
          filter((mayBeOk: HttpResponse<IUser>) => mayBeOk.ok),
          map((response: HttpResponse<IUser>) => response.body)
        )
        .subscribe(
          (res: IUser) => {
            this.users = [res];
            this.editForm.controls['user'].setValue(res);
          },
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    });
  }

  updateForm(rating: IRating) {
    this.editForm.patchValue({
      id: rating.id,
      score: rating.score,
      review: rating.review,
      user: rating.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rating = this.createFromForm();
    if (rating.id !== undefined) {
      this.subscribeToSaveResponse(this.ratingService.update(rating));
    } else {
      this.subscribeToSaveResponse(this.ratingService.create(rating));
    }
  }

  private createFromForm(): IRating {
    const entity = {
      ...new Rating(),
      id: this.editForm.get(['id']).value,
      score: this.editForm.get(['score']).value,
      review: this.editForm.get(['review']).value,
      user: this.editForm.get(['user']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRating>>) {
    result.subscribe((res: HttpResponse<IRating>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  onClick = ($event: ClickEvent) => {
    console.log('onClick $event: ', $event);
    this.editForm.controls['score'].setValue($event.rating);
    console.log(this.editForm.get(['score']).value);
  };

  onRatingChange = ($event: RatingChangeEvent) => {
    console.log('onRatingUpdated $event: ', $event);
    this.editForm.controls['score'].setValue($event.rating);
    console.log(this.editForm.get(['score']).value);
  };

  onHoverRatingChange = ($event: HoverRatingChangeEvent) => {
    console.log('onHoverRatingChange $event: ', $event);
    console.log(this.editForm.get(['score']).value);
  };

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
