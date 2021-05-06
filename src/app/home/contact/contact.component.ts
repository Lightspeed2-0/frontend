import { HttpErrorResponse } from "@angular/common/http";
import { AuthserviceService } from "src/app/auth/authservice.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  contactFrom: FormGroup = new FormGroup({
    Name: new FormControl(null, Validators.required),
    Email: new FormControl(null, [Validators.required, Validators.email]),
    Message: new FormControl(null, Validators.required),
  });

  constructor(private service: AuthserviceService) {}

  get formControls() {
    return this.contactFrom.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.service.sendContact(this.contactFrom.value).subscribe(
      (res) => {
        console.log(res);
        this.contactFrom.reset();
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error.error.msg);
        }
      }
    );
  }
}
