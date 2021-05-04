import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "src/app/app-routing.module";
import { DriverComponent } from "../driver.component";
import { AssignedorderComponent } from "../assignedorder/assignedorder.component";
import { StatusupdaterComponent } from "../statusupdater/statusupdater.component";

@NgModule({
  declarations: [
    DriverComponent,
    AssignedorderComponent,
    StatusupdaterComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
})
export class DriverModule {}
