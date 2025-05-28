import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { LoginModel } from './models/login.model';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private _toastr: ToastrService,private _authService: AuthService, private _roter:Router) { }
  

 login(form:NgForm) {
  if(form.valid) {
    let model = new LoginModel();
    model.email = form.value.email;
    model.password = form.value.password;

    this._authService.login(model, (res) => {
      this._toastr.success('Login successful');
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      this._roter.navigate(['/']);
    });
  }
 }
}
