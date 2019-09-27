import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/auth/login/login.component';
import { LogoutComponent } from './views/auth/logout/logout.component';
import { AuthService } from './core/auth/_services/auth.service';
import { AdminModule } from './views/admin/admin.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UnauthorizedComponent } from './views/auth/unauthorized/unauthorized.component';
import { SupervisorLayoutComponent } from './views/supervisor/supervisor-layout/supervisor-layout.component';
import { AgentLayoutComponent } from './views/agent/agent-layout/agent-layout.component';
import { DataTablesModule } from 'angular-datatables';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    UnauthorizedComponent,
    SupervisorLayoutComponent,
    AgentLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    FullCalendarModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
