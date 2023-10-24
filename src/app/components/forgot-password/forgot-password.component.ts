import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { tokenUser } from '../../shared/interfaces/token';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forms: FormGroup;
    token: tokenUser | undefined;
 /* token?: tokenUser;*/
  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.forms = this.fb.group({
      user: ['', [Validators.required]],
      email: ['', [ Validators.email]]
    })
  }
}
