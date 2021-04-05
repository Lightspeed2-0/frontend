import { ConsigneeModule } from "./consignee/modules/consignee.module";
import { TransporterRoutingModule } from "./transporter/modules/transporter-routing.module";
import { ConsigneeRoutingModule } from "./consignee/modules/consignee-routing.module";
import { TransporterModule } from "./transporter/modules/transporter.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TransporterModule,
    ConsigneeModule,
    ConsigneeRoutingModule,
    TransporterRoutingModule,
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
