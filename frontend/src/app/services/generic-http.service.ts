import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpService {
  api: string = 'http://localhost:5000/api';

  constructor(private _http: HttpClient, private _toastr: ToastrService, private _ngxSpinner:NgxSpinnerService) {}

  get<T>(url: string, model: any, callback: (res: T) => void) {
    this._ngxSpinner.show();
    return this._http
      .get<T>(`${this.api}/${url}`, { params: model })
      .subscribe({
        next: (res: T) => {
          callback(res);
          this._ngxSpinner.hide();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error:', err);
          this._toastr.error(err.error.message);
          this._ngxSpinner.hide();
        },
      });
  }

  post<T>(url: string, body: any, callback: (res: T) => void) {
     this._ngxSpinner.show();
    return this._http.post<T>(`${this.api}/${url}`, body, {}).subscribe({
      next: (res: T) => {
        callback(res);
        this._ngxSpinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        this._ngxSpinner.hide();
        console.error('Error:', err);
        this._toastr.error(err.error.message);
      },
    });
  }

  put<T>(url: string, body: any, callback: (res: T) => void) {
    return this._http.put<T>(`${this.api}/${url}`, body).subscribe({
      next: (res: T) => callback(res),
      error: (err: HttpErrorResponse) => {
        console.error('Error:', err);
        this._toastr.error(err.error.message);
      },
    });
  }

  delete<T>(url: string, _id: string, callback: (res: T) => void) {
    return this._http.delete<T>(`${this.api}/${url}`, { body: { _id } }).subscribe({
      next: (res: T) => callback(res),
      error: (err: HttpErrorResponse) => {
        console.error('Error:', err);
        this._toastr.error(err.error.message);
      },
    });
  }
}
