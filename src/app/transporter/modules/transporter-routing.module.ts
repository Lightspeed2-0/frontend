import { TransprofileComponent } from "./../transprofile/transprofile.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransporterComponent } from "../transporter.component";
import { AuthGuard } from "../../auth/auth.guard";
import { TransDashboardComponent } from "../trans-dashboard/trans-dashboard.component";
import { RequestComponent } from "../request/request.component";

const routes: Routes = [
  {
    path: "Transporter/:username",
    component: TransporterComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: TransDashboardComponent },
      { path: "Profile", component: TransprofileComponent },
      { path: "Request", component: RequestComponent },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransporterRoutingModule {}
