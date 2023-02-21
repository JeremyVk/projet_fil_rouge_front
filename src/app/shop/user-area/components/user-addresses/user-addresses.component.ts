import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/shop/interfaces/address';
import { UserService } from 'src/app/shop/services/user/user.service';

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.css']
})
export class UserAddressesComponent implements OnInit {

  addresses?: Address[] = [];
  isLoading = false;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.userSubject$.subscribe(res => {
      if (res.id !== undefined) {
        this.userService.getUserAddresses().subscribe(res => {
          this.addresses = res
          this.userService.editUserAddressesSubject(res)
          this.isLoading = false;
        })
      }
    })
  }
}
