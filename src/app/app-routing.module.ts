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
    path: "Verify/:email",
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
