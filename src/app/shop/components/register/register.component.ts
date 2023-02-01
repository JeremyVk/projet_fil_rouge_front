import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { FormErrorService } from 'src/app/services/form-error.service';
import { JsonWebTokenService } from 'src/app/services/json-web-token.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private errorService: FormErrorService,
    ) {}

  user: User = {};
  errors: any = [];

  lastNameCtrl = this.fb.control(this.user.lastname, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]);
  firstNameCtrl = this.fb.control(this.user.firstname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]);
  passwordCtrl = this.fb.control(this.user.password, [Validators.required, Validators.minLength(8)]);
  passwordConfirmCtrl = this.fb.control('', [Validators.required]);
  emailCtrl = this.fb.control(this.user.email, [Validators.required, Validators.email]);


  arePasswordsSimilars: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let passwordConfirm = group.get('passwordConfirm')?.value;

    return password === passwordConfirm ? null : {notSame: true}
  }

  registerForm: FormGroup = this.fb.group({
    lastname: this.lastNameCtrl,
    firstname: this.firstNameCtrl,
    password: this.passwordCtrl,
    passwordConfirm: this.passwordConfirmCtrl,
    email: this.emailCtrl
  },
  {validators: this.arePasswordsSimilars })

  ngOnInit(): void {}

  register() {
    this.errors = [];
    if(this.registerForm.invalid) {
      return
    }

    this.userService.registerUser(this.user).subscribe({
      next: (res) => {
        this.userService.setUserLogged(res[0])
        this.router.navigateByUrl('')
      },
      error: e => {
        this.errors = this.errorService.getFormViolations(e)
      }
    })
  }
  
}
