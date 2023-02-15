import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonWebTokenService } from 'src/app/services/json-web-token.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  jwt?: boolean;
  constructor(
    private userService: UserService,
    private jwtService: JsonWebTokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.jwt = this.jwtService.hasJsonWebToken();
  }

  ngAfterViewChecked() {
    this.jwt = this.jwtService.hasJsonWebToken();
  }

  ngAfterContentInit() {
    this.jwt = this.jwtService.hasJsonWebToken();
  }

  logout() {
    this.userService.logout();
  }

  redirectToMainPage() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/']));  }
}
