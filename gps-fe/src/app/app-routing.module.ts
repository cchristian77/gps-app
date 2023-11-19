import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {SummaryComponent} from "./components/gps/index/summary.component";
import {authGuard} from "./guards/auth.guard";
import {DetailComponent} from "./components/gps/detail/detail.component";

const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  },
  {
    path: 'register',
    title: 'Register',
    component: RegisterComponent
  },
  {
    path: 'gps',
    title: 'GPS Summary',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: SummaryComponent
      },
      {
        path: ':id',
        component: DetailComponent
      },
    ]
  },
  {
    path: '', redirectTo: '/gps', pathMatch: 'full'
  },
  { path: '**', redirectTo: '/gps' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
