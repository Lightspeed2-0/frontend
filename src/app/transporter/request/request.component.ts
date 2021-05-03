import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TransporterService } from "../transporter.service";

@Component({
  selector: "app-request",
  templateUrl: "./request.component.html",
  styleUrls: ["./request.component.scss"],
})
export class RequestComponent implements OnInit {
  form: FormGroup = new FormGroup({
    Amount: new FormControl(null, Validators.required),
  });

  Req: any[] = [];

  loaded = false;
  panelOpenState = false;
  accept: any[] = [];
  Isaccepted = false;

  constructor(private service: TransporterService) {}

  ngOnInit(): void {
    this.loaded = true;
    this.service.getRequest().subscribe(
      (res) => {
        this.loaded = false;
        const response = res;
        this.Req = response;
        console.log(this.Req);
        this.accept.length = this.Req.length;
        this.accept.fill(false);
        // console.log(this.accept, this.Req.length);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }

  onAccept(index: number) {
    this.accept[index] = true;
    this.Isaccepted = true;
  }

  onDecline(id: string, index: number) {
    const data = { RequestId: id, IsAccepted: this.Isaccepted };
    this.Isaccepted = false;
    this.Req.splice(index, 1);
  }

  onBack(index: number) {
    this.accept[index] = false;
  }

  enterAmount(id: string, index: number) {
    this.Req.splice(index, 1);
    const data = {
      RequestId: id,
      ...this.form.value,
      IsAccepted: this.Isaccepted,
    };
    console.log(data);
  }
}
