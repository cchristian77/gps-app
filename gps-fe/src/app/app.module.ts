import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {SummaryComponent} from './components/gps/index/summary.component';
import {RegisterComponent} from './components/register/register.component';
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {HttpClientModule} from "@angular/common/http";
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { DetailComponent } from './components/gps/detail/detail.component';
import {TableModule} from "primeng/table";
import {RippleModule} from "primeng/ripple";
import { ChartModule } from 'primeng/chart';
import {FieldsetModule} from "primeng/fieldset";
import {PaginatorModule} from "primeng/paginator";
import { NavbarComponent } from './components/layout/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SummaryComponent,
    RegisterComponent,
    DetailComponent,
    NavbarComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      CardModule,
      InputTextModule,
      ReactiveFormsModule,
      ButtonModule,
      HttpClientModule,
      ToastModule,
      BrowserAnimationsModule,
      TableModule,
      RippleModule,
      ChartModule,
      FieldsetModule,
      PaginatorModule
    ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
