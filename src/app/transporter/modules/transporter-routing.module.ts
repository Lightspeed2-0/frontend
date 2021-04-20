import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransporterComponent } from "../transporter.component";
import { AuthGuard } from "../../auth/auth.guard";

const routes: Routes = [
  {
    path: "Transporter/:username",
    component: TransporterComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransporterRoutingModule {}
