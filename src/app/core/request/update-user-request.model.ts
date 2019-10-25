import { User } from '../models/user.model';

export class UpdateUserRequest {
  constructor(public user: User) {}
}
