import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormErrorService } from 'src/app/services/form-error.service';
import { JsonWebTokenService } from 'src/app/services/json-web-token.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service';
import {Location} from "@angular/common";

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
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private jwtService: JsonWebTokenService,
  ) {}

  ngOnInit(): void {
    let token = this.route.snapshot.queryParamMap.get("token");

    if (token) {
      this.jwtService.setJsonWebToken(token);
      this.userService.getUser();
      this.router.navigateByUrl('/');
    }
  }

  login() {
    if(this.userLoginForm.invalid) {
      return
    }

    this.errors = [];
    this.userService.login(this.user).subscribe({
      next: () => {
        this.location.back();
      },
      error: (e) => {
        this.errors.push(e);
        this.user.password = '';
      },
    });
  }
}
