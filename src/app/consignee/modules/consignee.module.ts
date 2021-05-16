import { AppRoutingModule } from "../../app-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatStepperModule } from "@angular/material/stepper";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatTableModule } from "@angular/material/table";

import { ConsigneeComponent } from "../consignee.component";
import { DashbordComponent } from "../dashbord/dashbord.component";
import { OrdersComponent } from "../orders/orders.component";
import { PaymentComponent } from "../orders/payment/payment.component";
import { StatusComponent } from "../moreorder/status/status.component";
import { ManualComponent } from "../orders/manual/manual.component";
import { MoreorderComponent } from "../moreorder/moreorder.component";
import { ViewbidsComponent } from "../viewbids/viewbids.component";
import { PaymentdetailsComponent } from "../paymentdetails/paymentdetails.component";
import { ShortenPipePipe } from "../shorten-pipe.pipe";
import { ProfileComponent } from "../profile/profile.component";
import { BiddingComponent } from "../orders/bidding/bidding.component";
import { MapDirective } from "src/app/direction/map.directive";
import { DirectionComponent } from "./../../direction/direction.component";

@NgModule({
  declarations: [
    ConsigneeComponent,
    DashbordComponent,
    OrdersComponent,
    StatusComponent,
    PaymentComponent,
    ManualComponent,
    BiddingComponent,
    MoreorderComponent,
    ViewbidsComponent,
    PaymentdetailsComponent,
    ShortenPipePipe,
    ProfileComponent,
    DirectionComponent,
    MapDirective,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTableModule,
  ],
})
export class ConsigneeModule {}
