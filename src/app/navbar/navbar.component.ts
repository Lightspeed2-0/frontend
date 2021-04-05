import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  goLogin() {
    this.router.navigateByUrl('/Login');
  }
  goSignup() {
    this.router.navigateByUrl('/Signup');
  }
}
