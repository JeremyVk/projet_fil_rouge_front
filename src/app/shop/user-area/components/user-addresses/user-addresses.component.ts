import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/shop/interfaces/address';
import { User } from 'src/app/shop/interfaces/user';
import { UserService } from 'src/app/shop/services/user/user.service';

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.css']
})
export class UserAddressesComponent implements OnInit {

  addresses?: Address[] = [];
  isLoading = false;
  user: User = {};

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.userSubject$.subscribe(res => {
      if (res.id !== undefined) {
        this.user = res;        
        this.userService.getUserAddresses().subscribe(res => {
          this.addresses = res
          this.userService.editUserAddressesSubject(res)
          this.isLoading = false;
        })
      }
    })
  }

  removeAddresse(address: Address) {
    if (this.user.addresses !== undefined) {
      this.user.addresses = this.user.addresses?.filter((elt: string ) => elt.split('/addresses/')[1] !== address.id?.toString())
      
      this.userService.editUser(this.user).subscribe({
        next: (res) => {
          this.userService.getUserAddresses().subscribe(res => {
            this.addresses = res
            this.userService.editUserAddressesSubject(res)
            this.isLoading = false;
          })
        },
        error: (e: any) => {

        }
      });
    }

  }
}
