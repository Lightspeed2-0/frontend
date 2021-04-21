import { ConsigneeModule } from "./consignee/modules/consignee.module";
import { TransporterRoutingModule } from "./transporter/modules/transporter-routing.module";
import { ConsigneeRoutingModule } from "./consignee/modules/consignee-routing.module";
import { TransporterModule } from "./transporter/modules/transporter.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from "./home/main/main.component";
import { AboutComponent } from "./home/about/about.component";
import { ContactComponent } from "./home/contact/contact.component";
import { LoginComponent } from "./home/login/login.component";
import { SignupComponent } from "./home/signup/signup.component";
import { TransporterloginComponent } from "./home/login/transporterlogin/transporterlogin.component";
import { UserloginComponent } from "./home/login/userlogin/userlogin.component";
import { TokenInterceptorService } from "./auth/token-interceptor.service";
import { StylefeaturesComponent } from "./home/main/stylefeatures/stylefeatures.component";
import { TransportersignupComponent } from "./home/signup/transportersignup/transportersignup.component";
import { ConsigneesignupComponent } from "./home/signup/consigneesignup/consigneesignup.component";
import { VerifyComponent } from "./home/signup/verify/verify.component";
import { OtpComponent } from "./home/signup/verify/otp/otp.component";
import { PancardComponent } from "./home/signup/verify/pancard/pancard.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminLoginComponent } from "./admin/admin-login/admin-login.component";
import { ConsigneeVerifyComponent } from './admin/consignee-verify/consignee-verify.component';
import { TransporterVerifyComponent } from './admin/transporter-verify/transporter-verify.component';
import { TrasnotpComponent } from './home/signup/verify/trasnotp/trasnotp.component';
// import { AdminLoginComponent } from "./admin/admin-login/admin-login.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    MainComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    TransporterloginComponent,
    UserloginComponent,
    StylefeaturesComponent,
    ConsigneesignupComponent,
    TransportersignupComponent,
    VerifyComponent,
    OtpComponent,
    PancardComponent,
    AdminComponent,
    AdminLoginComponent,
    ConsigneeVerifyComponent,
    TransporterVerifyComponent,
    TrasnotpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConsigneeModule,
    ConsigneeRoutingModule,
    TransporterModule,
    TransporterRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
