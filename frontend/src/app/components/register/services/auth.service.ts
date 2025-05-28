import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../services/generic-http.service';
import { RegisterModel } from '../models/register.mode';
import { RegisterResponseModel } from '../models/register-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: GenericHttpService) { }

  register(model: RegisterModel, callback: (res: RegisterResponseModel) => void) {
    return this._http.post<RegisterResponseModel>('auth/register', model, (res) => callback(res));
  }
}
