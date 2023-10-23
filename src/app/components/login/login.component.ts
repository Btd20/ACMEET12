import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { login } from '../../interfaces/login';
import { tokenUser } from '../../interfaces/token';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  token: tokenUser | undefined;
  eslogan = 'Booking has never been easier.';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {
    this.form = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    const login: login = {
      userName: this.form.value.user,
      email: this.form.value.user,
      password: this.form.value.password
    };

    this.loginService.userLogin(login).subscribe(
      (data: tokenUser | undefined) => {
        this.token = data;
        const tokenUser = this.token?.token;
        if (tokenUser) {
          sessionStorage.setItem('token', tokenUser);

          const tokenInfo = this.getDecodedAccessToken(tokenUser);
          const userRole = tokenInfo['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          sessionStorage.setItem('userRole', userRole);
        }
        this.router.navigate(['/home']);

      },
      (error: any) => {
        this.error();
        this.form.reset();
      }
    );
      sessionStorage.setItem('user', this.form.value.user);
  }

  get f(): any {
    return this.form.controls;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }


  error(): void {
    this.snackBar.open('User or password incorrect', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
