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
        // this.Req = response["requests"];
        for (let i = 0; i < response["requests"].length; i++) {
          if (response["requests"][i].Amount == -1) {
            this.Req.push(response["requests"][i]);
          }
        }
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
    this.Isaccepted = false;
    const data = { RequestId: id, IsAccepted: this.Isaccepted };
    this.service.putDecline(data).subscribe(
      (res) => {
        console.log(res);
        this.Req.splice(index, 1);
        this.accept.splice(index, 1);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }

  onBack(index: number) {
    this.accept[index] = false;
  }

  enterAmount(id: string, index: number) {
    const data = {
      RequestId: id,
      ...this.form.value,
      IsAccepted: this.Isaccepted,
    };
    // console.log(data);
    this.service.putAccept(data).subscribe(
      (res) => {
        console.log(res);
        this.Req.splice(index, 1);
        this.accept.splice(index, 1);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error);
        }
      }
    );
  }
}
