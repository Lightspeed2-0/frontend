import { StatusupdaterComponent } from "./../statusupdater/statusupdater.component";
import { AssignedorderComponent } from "./../assignedorder/assignedorder.component";
import { AuthGuard } from "./../../auth/auth.guard";
import { DriverComponent } from "./../driver.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "Driver/:Username",
    component: DriverComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: AssignedorderComponent },
      { path: "Status Updater", component: StatusupdaterComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverRoutingModule {}
