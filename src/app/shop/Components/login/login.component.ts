import { Component, OnInit } from '@angular/core';
import { User } from '../../Interfaces/user';
import { UserService } from '../../Services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.user);
    this.userService.login(this.user).subscribe(res => {
      if (res.token) {
        localStorage.setItem('JWT', res.token);
        this.userService.findUserByEmail(this.user.email).subscribe(res => {
        localStorage.setItem('user', JSON.stringify(res))
        })
      }
    })
  }

}
