import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from '@app/core/guard/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {title: 'Iniciar Sesión'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Iniciar Sesión'}
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {title: 'Regístrarse'}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {title: 'Pérfil'},
    canActivate: [AuthGuard]
  },
  {
    path: 'change_password',
    component: ChangePasswordComponent,
    data: {title: 'Pérfil'},
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent, SignupComponent, ProfileComponent, ChangePasswordComponent]
})
export class AuthModule { }
