import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProfileGuard } from '../services/profile.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', canActivate: [ProfileGuard], component: ProfileComponent },
]

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)],
  
  exports: [
    RouterModule
  ]
  
})
export class UsersModule { }
