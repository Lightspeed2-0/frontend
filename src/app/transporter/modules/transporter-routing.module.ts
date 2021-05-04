import { DriveraddComponent } from "./../driveradd/driveradd.component";
import { TransprofileComponent } from "./../transprofile/transprofile.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransporterComponent } from "../transporter.component";
import { AuthGuard } from "../../auth/auth.guard";
import { TransDashboardComponent } from "../trans-dashboard/trans-dashboard.component";
import { RequestComponent } from "../request/request.component";
import { DrivermanageComponent } from "../drivermanage/drivermanage.component";
import { TransvieworderComponent } from "../transvieworder/transvieworder.component";

const routes: Routes = [
  {
    path: "Transporter/:username",
    component: TransporterComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: TransDashboardComponent },
      { path: "Profile", component: TransprofileComponent },
      { path: "Request", component: RequestComponent },
      { path: "View Orders", component: TransvieworderComponent },
      { path: "Add Driver", component: DriveraddComponent },
      { path: "Manage Driver", component: DrivermanageComponent },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransporterRoutingModule {}
