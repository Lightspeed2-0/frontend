import { OrdersComponent } from "./../orders/orders.component";
import { DashbordComponent } from "./../dashbord/dashbord.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthGuard } from "../../auth/auth.guard";
import { ConsigneeComponent } from "../consignee.component";
import { ViewbidsComponent } from "../viewbids/viewbids.component";
import { MoreorderComponent } from "../moreorder/moreorder.component";
import { PaymentdetailsComponent } from "../paymentdetails/paymentdetails.component";

const routes: Routes = [
  {
    path: "Consignee",
    component: ConsigneeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: DashbordComponent },
      { path: "Orders", component: OrdersComponent },
      { path: "View Bids", component: ViewbidsComponent },
      { path: "Your Orders", component: MoreorderComponent },
      { path: "Your Payments", component: PaymentdetailsComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsigneeRoutingModule {}
