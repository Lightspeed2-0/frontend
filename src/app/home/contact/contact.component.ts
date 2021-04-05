import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactFrom: FormGroup = new FormGroup({
    Name: new FormControl(null, Validators.required),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Message: new FormControl(null, Validators.required),
  });
  constructor() {}

  ngOnInit(): void {}
}
