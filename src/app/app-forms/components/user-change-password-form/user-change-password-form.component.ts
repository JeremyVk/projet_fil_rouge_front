import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormErrorService } from 'src/app/services/form-error.service';
import { User } from 'src/app/shop/interfaces/user';
import { UserService } from 'src/app/shop/services/user/user.service';

@Component({
  selector: 'app-user-change-password-form',
  templateUrl: './user-change-password-form.component.html',
  styleUrls: ['./user-change-password-form.component.css']
})
export class UserChangePasswordFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private errorService: FormErrorService,
    ) {}


  @Input() user: User = {}
  errors: any = [];

  passwordCtrl =  this.fb.control(this.user.password, [Validators.required, Validators.minLength(8)]);
  passwordConfirmCtrl = this.fb.control('', [Validators.required]);

  ngOnInit(): void {
  }

  arePasswordsSimilars: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
      let password = group.get('password')?.value;
      let passwordConfirm = group.get('passwordConfirm')?.value;
  
      return password === passwordConfirm ? null : {notSame: true}
  }

  registerForm: FormGroup = this.fb.group({
    password: this.passwordCtrl,
    passwordConfirm: this.passwordConfirmCtrl,
  },
  {validators: this.arePasswordsSimilars })

  sendData() {

  }

}
