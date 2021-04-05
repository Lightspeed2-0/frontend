import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from '../../auth/auth.guard';
import { ConsigneeComponent } from '../consignee.component';

const routes: Routes = [
  {
    path: 'Consignee/:name',
    component: ConsigneeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsigneeRoutingModule {}
