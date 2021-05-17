import { Router } from "@angular/router";
import { ConsigneeserviceService } from "./../consigneeservice.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-suggestions",
  templateUrl: "./suggestions.component.html",
  styleUrls: ["./suggestions.component.scss"],
})
export class SuggestionsComponent implements OnInit {
  constructor(
    private service: ConsigneeserviceService,
    private router: Router
  ) {}

  loaded = false;
  isEmpty = true;

  panelOpenState: any[] = [];
  Orders: any[] = [
    {
      _id: 1,
      indent: {
        Source: {
          Address: "22/16",
        },
        Destination: {
          Address: "MIT",
        },
        Weight: 100,
        Volume: 12,
      },
    },
  ];
  clicked: any[] = [];

  getOrders() {
    this.service.recommendPool(this.service.poolIndent).subscribe((res) => {
      console.log(res);
      this.Orders = res;
      if (this.Orders.length > 0) {
        this.isEmpty = false;
      }
      this.panelOpenState.length = this.Orders.length;
      this.clicked.length = this.Orders.length;

      this.panelOpenState.fill(false);
      this.clicked.fill(false);
    });
  }

  ngOnInit(): void {
    this.loaded = true;
    this.getOrders();
  }

  onBack() {
    this.router.navigateByUrl(`/Consignee/${this.service.Username}/Pooling`);
  }

  onAccept(id: string, index: number) {
    this.clicked[index] = true;
  }
}
