import { AppRoutingModule } from "./../../app-routing.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TransporterComponent } from "../transporter.component";

@NgModule({
  declarations: [TransporterComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class TransporterModule {}
