import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './views/auth/logout/logout.component';
import { AdminLayoutComponent } from './views/admin/admin-layout/admin-layout.component';
import { AuthGuard } from './core/auth/_guards/auth.guard';
import { UnauthorizedComponent } from './views/auth/unauthorized/unauthorized.component';
import { SupervisorLayoutComponent } from './views/supervisor/supervisor-layout/supervisor-layout.component';
import { AgentLayoutComponent } from './views/agent/agent-layout/agent-layout.component';
import { LoginComponent } from './views/auth/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'adminhome',
    component: AdminLayoutComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'supervisorhome',
    component: SupervisorLayoutComponent
  },
  {
    path: 'agenthome',
    component: AgentLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
