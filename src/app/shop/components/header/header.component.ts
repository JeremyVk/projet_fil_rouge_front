import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonWebTokenService } from 'src/app/services/json-web-token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  jwt?: boolean;
  constructor(private router: Router, private jwtService: JsonWebTokenService) { }

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
    // console.log('ibfoezrbf')
    this.jwtService.deleteJsonWebToken();
    this.router.navigateByUrl('');
  }
}
