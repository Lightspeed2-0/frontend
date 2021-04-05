import { Router } from '@angular/router';
import { AuthserviceService } from '../../../auth/authservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss'],
})
export class UserloginComponent implements OnInit {
  private user: { Email: string; Password: string } = {
    Email: '',
    Password: '',
  };
  private tokenObj: any;
  form: FormGroup = new FormGroup({
    Email: new FormControl(null, Validators.required),
    Password: new FormControl(null, Validators.required),
  });
  constructor(private auth: AuthserviceService, private router: Router) {}

  ngOnInit(): void {}
  onLogin() {
    this.user = this.form.value;
    this.auth.consigneeLogin(this.user).subscribe(
      (res) => {
        console.log(res);
        this.tokenObj = res;
        localStorage.setItem('token', this.tokenObj.token);
        this.router.navigateByUrl(`/Consignee/${this.tokenObj.Email}`);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigateByUrl('/Login');
          }
        }
      }
    );
  }
}
