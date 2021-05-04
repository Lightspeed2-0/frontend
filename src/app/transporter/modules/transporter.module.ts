import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AppRoutingModule } from "./../../app-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TransporterComponent } from "../transporter.component";
import { RequestComponent } from "../request/request.component";
import { TransprofileComponent } from "../transprofile/transprofile.component";
import { TransDashboardComponent } from "../trans-dashboard/trans-dashboard.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TshortpipePipe } from "../tshortpipe.pipe";
import { DriveraddComponent } from "../driveradd/driveradd.component";
import { DrivermanageComponent } from "../drivermanage/drivermanage.component";
import { TransvieworderComponent } from "../transvieworder/transvieworder.component";

@NgModule({
  declarations: [
    TransporterComponent,
    TransprofileComponent,
    RequestComponent,
    TransDashboardComponent,
    TshortpipePipe,
    DriveraddComponent,
    DrivermanageComponent,
    TransvieworderComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
  ],
})
export class TransporterModule {}
