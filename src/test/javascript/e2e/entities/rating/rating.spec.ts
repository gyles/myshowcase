/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RatingComponentsPage, RatingDeleteDialog, RatingUpdatePage } from './rating.page-object';

const expect = chai.expect;

describe('Rating e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ratingUpdatePage: RatingUpdatePage;
  let ratingComponentsPage: RatingComponentsPage;
  /*let ratingDeleteDialog: RatingDeleteDialog;*/

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Ratings', async () => {
    await navBarPage.goToEntity('rating');
    ratingComponentsPage = new RatingComponentsPage();
    await browser.wait(ec.visibilityOf(ratingComponentsPage.title), 5000);
    expect(await ratingComponentsPage.getTitle()).to.eq('myshowcaseApp.rating.home.title');
  });

  it('should load create Rating page', async () => {
    await ratingComponentsPage.clickOnCreateButton();
    ratingUpdatePage = new RatingUpdatePage();
    expect(await ratingUpdatePage.getPageTitle()).to.eq('myshowcaseApp.rating.home.createOrEditLabel');
    await ratingUpdatePage.cancel();
  });

  /* it('should create and save Ratings', async () => {
        const nbButtonsBeforeCreate = await ratingComponentsPage.countDeleteButtons();

        await ratingComponentsPage.clickOnCreateButton();
        await promise.all([
            ratingUpdatePage.setScoreInput('5'),
            ratingUpdatePage.setReviewInput('review'),
            ratingUpdatePage.userSelectLastOption(),
        ]);
        expect(await ratingUpdatePage.getScoreInput()).to.eq('5', 'Expected score value to be equals to 5');
        expect(await ratingUpdatePage.getReviewInput()).to.eq('review', 'Expected Review value to be equals to review');
        await ratingUpdatePage.save();
        expect(await ratingUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await ratingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    });*/

  /* it('should delete last Rating', async () => {
        const nbButtonsBeforeDelete = await ratingComponentsPage.countDeleteButtons();
        await ratingComponentsPage.clickOnLastDeleteButton();

        ratingDeleteDialog = new RatingDeleteDialog();
        expect(await ratingDeleteDialog.getDialogTitle())
            .to.eq('myshowcaseApp.rating.delete.question');
        await ratingDeleteDialog.clickOnConfirmButton();

        expect(await ratingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });*/

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
