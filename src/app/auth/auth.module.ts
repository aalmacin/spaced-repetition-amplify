import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { AmplifyAngularModule } from 'aws-amplify-angular';
import { AuthService } from './auth.service';
import { SignOutComponent } from './sign-out/sign-out.component';

@NgModule({
  declarations: [SignInComponent, SignOutComponent],
  imports: [CommonModule, AuthRoutingModule, AmplifyAngularModule],
  exports: [SignOutComponent],
  providers: [AuthService]
})
export class AuthModule {}
