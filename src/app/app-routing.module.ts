import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { UserloginComponent } from './home/login/userlogin/userlogin.component';
import { TransporterloginComponent } from './home/login/transporterlogin/transporterlogin.component';
import { SignupComponent } from './home/signup/signup.component';
import { LoginComponent } from './home/login/login.component';
import { ContactComponent } from './home/contact/contact.component';
import { AboutComponent } from './home/about/about.component';
import { MainComponent } from './home/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Contact', component: ContactComponent },
  {
    path: 'Login',
    component: LoginComponent,
    children: [
      { path: '', component: UserloginComponent },
      { path: 'TransporterLogin', component: TransporterloginComponent },
    ],
  },
  { path: 'Signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
