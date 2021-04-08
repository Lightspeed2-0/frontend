import { PaymentComponent } from "./../payment/payment.component";
import { StatusComponent } from "./../status/status.component";
import { OrdersComponent } from "./../orders/orders.component";
import { DashbordComponent } from "./../dashbord/dashbord.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthGuard } from "../../auth/auth.guard";
import { ConsigneeComponent } from "../consignee.component";

const routes: Routes = [
  {
    path: "Consignee",
    component: ConsigneeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: DashbordComponent },
      { path: "Orders", component: OrdersComponent },
      { path: "Status", component: StatusComponent },
      { path: "Payment", component: PaymentComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsigneeRoutingModule {}
