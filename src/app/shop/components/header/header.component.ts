import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonWebTokenService } from 'src/app/services/json-web-token.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  jwt?: boolean;
  user: boolean = false
  constructor(
    private userService: UserService,
    private jwtService: JsonWebTokenService,
  ) { }

  ngOnInit(): void {
    this.jwt = this.jwtService.hasJsonWebToken();
    this.userService.userSubject$.subscribe(res => {
      this.user = Object.keys(res).length > 0
    })  }

  ngAfterViewChecked() {
    this.jwt = this.jwtService.hasJsonWebToken();
  }

  ngAfterContentInit() {
    this.jwt = this.jwtService.hasJsonWebToken();
  }

  logout() {
    this.userService.logout();
  }
}
