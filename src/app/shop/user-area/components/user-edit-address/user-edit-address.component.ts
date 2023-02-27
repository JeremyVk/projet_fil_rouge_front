import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/shop/interfaces/address';
import { UserService } from 'src/app/shop/services/user/user.service';

@Component({
  selector: 'app-user-edit-address',
  templateUrl: './user-edit-address.component.html',
  styleUrls: ['./user-edit-address.component.css']
})
export class UserEditAddressComponent implements OnInit {
  id: Number|null = null;
  legacy: boolean = false;
  address: Address = {};

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = null
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.checkIfLegacy();    
  }

  checkIfLegacy() {
    this.userService.userAddresses$.subscribe(res => {
      let addresses = res;
      addresses.forEach(address => {
        if (address.id === this.id) {
          this.address = address
          this.legacy = true
        }
      })

      if (!this.legacy && this.id !== null) {
        this.router.navigateByUrl('/')
        this.id = null
      }
    })
  }
}
