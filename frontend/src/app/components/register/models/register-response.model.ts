import { UserModel } from "../../login/models/user.model";

export class RegisterResponseModel {
  user?: UserModel;
  token?: string;
}