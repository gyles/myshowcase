import { IUser } from 'app/core/user/user.model';

export interface IRating {
  id?: number;
  score?: number;
  review?: string;
  user?: IUser;
}

export class Rating implements IRating {
  constructor(public id?: number, public score?: number, public review?: string, public user?: IUser) {}
}
