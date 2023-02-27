import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormErrorService } from 'src/app/services/form-error.service';
import { Notification } from 'src/app/shop/interfaces/notification';
import { User } from 'src/app/shop/interfaces/user';
import { NotificationsService } from 'src/app/shop/services/notifications/notifications.service';
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
    private notificationService: NotificationsService
    ) {}

  user: User = {};
  errors: any = [];
  subscription = new Subscription();

  passwordCtrl =  this.fb.control(this.user.plainPassword, [Validators.required, Validators.minLength(8)]);
  passwordConfirmCtrl = this.fb.control(this.user.currentPassword, [Validators.required]);

  ngOnInit(): void {
   this.subscription.add(this.userService.userSubject$.subscribe(res => {
    this.user = res;
   }))
  }


  passwordForm: FormGroup = this.fb.group({
    currentPassword: this.passwordCtrl,
    plainPassword: this.passwordConfirmCtrl,
  })

  sendData() {
    if (this.passwordForm.invalid) {
      return;
    }
    this.userService.editUserPassword(this.user).subscribe({
      next: res => {
        let notification: Notification = {text: "Votre mot de passe a bien été modifié"};
        this.notificationService.pushNotification(notification);     
        this.passwordForm.reset();   
      },
      error: e => {
        let notification: Notification = {text: "Une erreur est survenue"};
        this.notificationService.pushNotification(notification);
        this.passwordForm.reset();
          
        this.errors = this.errorService.getFormViolations(e);        
      }
    })    
  }

}
