import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { AmplifyAngularModule } from 'aws-amplify-angular';
import { SignOutComponent } from './sign-out/sign-out.component';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SignInComponent, SignOutComponent, AuthComponent],
  imports: [CommonModule, AuthRoutingModule, AmplifyAngularModule, SharedModule],
  exports: [SignOutComponent]
})
export class AuthModule {}
