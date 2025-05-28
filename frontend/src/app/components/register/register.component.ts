import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { AuthService } from './services/auth.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegisterModel } from './models/register.mode';

@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private _auth: AuthService, private _toastr:ToastrService, private _router:Router) { }
  model:RegisterModel = new RegisterModel();

  register(form:NgForm){

    if(form.valid) {
      this._auth.register(this.model, (res) => {
        if (res.user && res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this._toastr.success('Kayıt İşlemi Başarılı');
          this._router.navigate(['/login']);
        } else {
          this._toastr.error('Kayıt İşlemi Başarısız');
        }
      });
    }
    
  }
}
