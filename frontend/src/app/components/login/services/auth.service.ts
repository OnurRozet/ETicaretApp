import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../services/generic-http.service';
import { LoginResponseModel } from '../models/login-response.model';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:GenericHttpService) { }

  login(model:LoginModel, callback: (res: LoginResponseModel) => void) {
    return this._http.post<LoginResponseModel>('auth/login', model, (res)=> callback(res))
  }
}
