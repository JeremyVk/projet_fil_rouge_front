import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterFormComponent } from './components/user-register-form/user-register-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { ButtonsModule } from '../buttons/buttons.module';



@NgModule({
  declarations: [
    UserRegisterFormComponent,
    AddressFormComponent
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
    AddressFormComponent
  ]
})
export class AppFormsModule { }
