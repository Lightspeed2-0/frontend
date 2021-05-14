import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AppRoutingModule } from "./../../app-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from "ng2-search-filter";

import { TransporterComponent } from "../transporter.component";
import { RequestComponent } from "../request/request.component";
import { TransprofileComponent } from "../transprofile/transprofile.component";
import { TransDashboardComponent } from "../trans-dashboard/trans-dashboard.component";
import { TshortpipePipe } from "../tshortpipe.pipe";
import { DriveraddComponent } from "../driveradd/driveradd.component";
import { DrivermanageComponent } from "../drivermanage/drivermanage.component";
import { TransvieworderComponent } from "../transvieworder/transvieworder.component";
import { TransstatusComponent } from "../transstatus/transstatus.component";
import { TransbidComponent } from "../transbid/transbid.component";
import { MybidComponent } from "../mybid/mybid.component";

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
    TransstatusComponent,
    TransbidComponent,
    MybidComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    Ng2SearchPipeModule,
  ],
})
export class TransporterModule {}
