import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { UserChangePasswordFormComponent } from './components/user-change-password-form/user-change-password-form.component';



@NgModule({
  declarations: [
    UserRegisterFormComponent,
    AddressFormComponent,
    UserChangePasswordFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonsModule
  ],
  exports: [
    UserRegisterFormComponent,
    AddressFormComponent,
    UserChangePasswordFormComponent
  ]
})
export class AppFormsModule { }
