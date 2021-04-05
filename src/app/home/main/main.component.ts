import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  goLogin() {
    this.router.navigateByUrl('/Login');
  }
  goSignup() {
    this.router.navigateByUrl('/Signup');
  }
}
