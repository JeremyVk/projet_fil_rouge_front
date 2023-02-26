import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormErrorService } from 'src/app/services/form-error.service';
import { Address } from 'src/app/shop/interfaces/address';
import { Notification } from 'src/app/shop/interfaces/notification';
import { AddressService } from 'src/app/shop/services/address/address.service';
import { NotificationsService } from 'src/app/shop/services/notifications/notifications.service';
import { UserService } from 'src/app/shop/services/user/user.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  @Input() address: Address = {};
  errors: any = [];
  @Input() method: string = "";
  @Input() checkout: boolean = false;

  lastNameCtrl = this.fb.control(this.address.lastname, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]);
  firstNameCtrl = this.fb.control(this.address.firstname, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]);
  postalCodeCtrl = this.fb.control(this.address.postalCode, [Validators.required, Validators.minLength(5)]);
  streetCtrl = this.fb.control(this.address.street, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]);

  addressForm: FormGroup = this.fb.group({
    lastname: this.lastNameCtrl,
    firstname: this.firstNameCtrl,
    postalCode: this.postalCodeCtrl,
    street: this.streetCtrl
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private addressService: AddressService,
    private router: Router,
    private errorService: FormErrorService,
    private notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.address.user = this.userService.getUserLogged()['@id'];
  }

 

  public postAddress() {
    if (this.addressForm.invalid) {
      return;
    }
    if (this.method === "POST") {
      this.addressService.postAddress(this.address).subscribe({
        next: (res) => {
          this.userService.getUser();
          this.redirect();
        },
        error: (err) => {
          this.errors = this.errorService.getFormViolations(err);
        },
      })
    }
    if (this.method === "PUT") {
      this.addressService.editAddress(this.address).subscribe({
        next: (res) => {
          this.redirect();
        },
        error: (err) => {
          this.errors = this.errorService.getFormViolations(err);
        },
      })
    }
  }

public redirect() {
  if ( this.method === "POST" && this.checkout) {
    this.router.navigateByUrl('/checkout/select-address')
  }

  if (this.method === "POST" && !this.checkout) {
    this.router.navigateByUrl('/user/dashboard/addresses');
    let notification: Notification = {text: "Votre adresse a bien été enregistrée"};
    this.notificationService.pushNotification(notification);
  }

  if (this.method === "PUT") {
    this.router.navigateByUrl('/user/dashboard/addresses');
    let notification: Notification = {text: "Votre adresse a bien été modifiée"};
    this.notificationService.pushNotification(notification);
  }
}
}
