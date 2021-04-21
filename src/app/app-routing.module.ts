import { ConsigneeVerifyComponent } from "./admin/consignee-verify/consignee-verify.component";
import { TransporterVerifyComponent } from "./admin/transporter-verify/transporter-verify.component";
import { AdminGuard } from "./admin/admin.guard";
import { AdminLoginComponent } from "./admin/admin-login/admin-login.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PancardComponent } from "./home/signup/verify/pancard/pancard.component";
import { OtpComponent } from "./home/signup/verify/otp/otp.component";
import { VerifyComponent } from "./home/signup/verify/verify.component";
import { TransportersignupComponent } from "./home/signup/transportersignup/transportersignup.component";
import { ConsigneesignupComponent } from "./home/signup/consigneesignup/consigneesignup.component";
import { UserloginComponent } from "./home/login/userlogin/userlogin.component";
import { TransporterloginComponent } from "./home/login/transporterlogin/transporterlogin.component";
import { SignupComponent } from "./home/signup/signup.component";
import { LoginComponent } from "./home/login/login.component";
import { ContactComponent } from "./home/contact/contact.component";
import { AboutComponent } from "./home/about/about.component";
import { MainComponent } from "./home/main/main.component";

import { VerifyguardGuard } from "./home/signup/verify/verify-auth/verifyguard.guard";
import { VerifyGuard } from "./home/signup/verify/verify-auth/verify.guard";
import { AdminComponent } from "./admin/admin.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "About", component: AboutComponent },
  { path: "Contact", component: ContactComponent },
  {
    path: "Login",
    component: LoginComponent,
    children: [
      { path: "", component: UserloginComponent },
      { path: "TransporterLogin", component: TransporterloginComponent },
    ],
  },
  {
    path: "Signup",
    component: SignupComponent,
    children: [
      { path: "", component: ConsigneesignupComponent },
      { path: "TransporterSignup", component: TransportersignupComponent },
    ],
  },
  {
    path: "Verify/:email/:role",
    component: VerifyComponent,
    children: [
      { path: "", component: OtpComponent },
      {
        path: "pan",
        component: PancardComponent,
        canActivate: [VerifyguardGuard],
      },
    ],
    canActivate: [VerifyGuard],
  },
  { path: "Adminlogin", component: AdminLoginComponent },
  {
    path: "Admins",
    component: AdminComponent,
    children: [
      { path: "", component: TransporterVerifyComponent },
      { path: "Consignee", component: ConsigneeVerifyComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
