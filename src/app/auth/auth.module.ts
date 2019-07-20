import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { AmplifyAngularModule } from 'aws-amplify-angular';
import { SignOutComponent } from './sign-out/sign-out.component';
import { NavComponent } from './nav/nav.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [SignInComponent, SignOutComponent, NavComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule, AmplifyAngularModule],
  exports: [SignOutComponent]
})
export class AuthModule {}
