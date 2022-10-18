import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  jwt: string|null = null
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkJwt();
  }

  ngAfterViewChecked() {
    this.checkJwt()
  }

  ngAfterContentInit() {
    this.checkJwt()
  }

  checkJwt() {
    this.jwt = localStorage.getItem('JWT');
  }

  logout() {
    // console.log('ibfoezrbf')
    localStorage.removeItem('JWT');
    this.router.navigateByUrl('');
  }
}
