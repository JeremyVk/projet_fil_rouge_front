import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonWebTokenService } from 'src/app/services/json-web-token.service';
import { User } from '../../Interfaces/user';
import { UserService } from '../../Services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = {};
  errors: Array<HttpErrorResponse> = [];

  emailCtrl = this.fb.control(this.user.email, [Validators.required, Validators.email])
  passwordCtrl = this.fb.control(this.user.password, [Validators.required])

  userLoginForm = this.fb.group({
    email: this.emailCtrl,
    password: this.passwordCtrl
  })

  constructor(
    private userService: UserService,
    private jwtService: JsonWebTokenService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  login() {
    if(this.userLoginForm.invalid) {
      return
    }

    this.errors = [];
    this.userService.login(this.user).subscribe({
      next: (res) => {
        this.jwtService.setJsonWebToken(res.token);
        this.userService.findUserByEmail(this.user.email).subscribe((res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigateByUrl('');
        });
      },
      error: (e) => {
        this.errors.push(e);
        this.user.password = '';
      },
    });
  }
}
