import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AmplifyAngularModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
