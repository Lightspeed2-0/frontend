import { FormControl, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { AdminService } from "./../admin.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-queries",
  templateUrl: "./queries.component.html",
  styleUrls: ["./queries.component.scss"],
})
export class QueriesComponent implements OnInit {
  Queries: any[] = [];
  loaded: any;
  isEmpty = true;
  panelOpenState = false;
  clicked: any[] = [];
  contact: any;
  form: FormGroup = new FormGroup({
    Reply: new FormControl(null, Validators.required),
  });

  constructor(private service: AdminService) {}

  getContact() {
    this.service.getQuery().subscribe(
      (res) => {
        this.loaded = false;
        console.log(res);
        this.Queries = res["contacts"];
        if (this.Queries.length > 0) {
          this.isEmpty = false;
        }
        this.clicked.length = this.Queries.length;
        this.clicked.fill(false);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error.error.msg);
        }
      }
    );
  }

  ngOnInit(): void {
    this.loaded = true;
    this.getContact();
  }

  onReply(data: any, index: number) {
    this.clicked[index] = true;
    this.contact = data;
  }

  onDelete(id: string) {
    this.service.delteQuery({ _id: id }).subscribe(
      (res) => {
        console.log(res);
        this.loaded = true;
        this.getContact();
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error.error.msg);
        }
      }
    );
  }

  onSend() {
    this.service.sendReply({ ...this.contact, ...this.form.value }).subscribe(
      (res) => {
        console.log(res);
        this.loaded = true;
        this.getContact();
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(error.error.msg);
        }
      }
    );
  }
}
