import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormErrorService } from 'src/app/services/form-error.service';
import { Notification } from 'src/app/shop/interfaces/notification';
import { User } from 'src/app/shop/interfaces/user';
import { NotificationsService } from 'src/app/shop/services/notifications/notifications.service';
import { UserService } from 'src/app/shop/services/user/user.service';

@Component({
  selector: 'app-user-register-form',
  templateUrl: './user-register-form.component.html',
  styleUrls: ['./user-register-form.component.css']
})
export class UserRegisterFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private errorService: FormErrorService,
    private notificationService: NotificationsService
    ) {}
  
  user: User = {};
  errors: any = [];
  @Input()method: string = "";
  @Input()checkout: boolean = false;
  @Input()ctaText: string = ''

  lastNameCtrl = this.fb.control(this.user.lastname, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]);
  firstNameCtrl = this.fb.control(this.user.firstname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]);
  
  passwordCtrl = this.method === "POST" ? this.fb.control(this.user.password, [Validators.required, Validators.minLength(8)]) : null;
  passwordConfirmCtrl = this.method === "POST" ? this.fb.control('', [Validators.required]) : null;
  emailCtrl = this.fb.control(this.user.email, [Validators.required, Validators.email]);


  arePasswordsSimilars: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    if (this.method === "POST") {
      let password = group.get('password')?.value;
      let passwordConfirm = group.get('passwordConfirm')?.value;
  
      return password === passwordConfirm ? null : {notSame: true}
    }
    return null;
  }

  registerForm: FormGroup = this.fb.group({
    lastname: this.lastNameCtrl,
    firstname: this.firstNameCtrl,
    password: this.passwordCtrl,
    passwordConfirm: this.passwordConfirmCtrl,
    email: this.emailCtrl
  },
  {validators: this.arePasswordsSimilars })

  ngOnInit(): void {
    if (this.method === "PUT") {
      this.userService.userSubject$.subscribe({
        next: res => {
          this.user = res
        },
        error: e => {
          console.log(e);
          
        }
      })
    }
  }

  sendData() {
    this.errors = [];
    if(this.registerForm.invalid) {
      return
    }

    if (this.method === 'POST') {
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

    if (this.method === "PUT") {
      this.userService.editUser(this.user).subscribe(res => {
        let notification: Notification = { text: "Vos informations ont été mises à jour" };
        this.notificationService.pushNotification(notification);        
      })
    }
  }

}
