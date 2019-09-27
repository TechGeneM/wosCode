import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { KpiComponent } from './admin-pages/kpi/kpi.component';
import { WorkCenterComponent } from './admin-pages/kpi/work-center/work-center.component';
import { TeamComponent } from './admin-pages/kpi/team/team.component';
import { RosterComponent } from './admin-pages/roster/roster.component';
import { TeamSettingsComponent } from './admin-pages/team-settings/team-settings.component';
import { ReportsComponent } from './admin-pages/reports/reports.component';
import { SystemStatisticsComponent } from './admin-pages/system-statistics/system-statistics.component';
import { TeamSettingsModule } from './admin-pages/team-settings/team-settings.module';
import { AuthGuard } from 'src/app/core/auth/_guards/auth.guard';

const routes: Routes = [

  {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
              path: '',
              redirectTo: 'kpi',
              pathMatch: 'full',
              
          },
          {
              path: 'kpi',
              component: KpiComponent,
              // canActivate: [AuthGuard]
              children: [
                {
				    path: '',
				    redirectTo: 'work-center',
				    pathMatch: 'full'
                },
                  {
                      path: 'work-center',
                      component: WorkCenterComponent
                  },
                  {
                    path: 'team',
                    component: TeamComponent
                  }
              ]
          },
          {
              path: 'roster',
              component: RosterComponent,
              // canActivate: [AuthGuard]
          },
          {
              path: 'teamsettings',
              component: TeamSettingsComponent,
              // canActivate: [AuthGuard]
          },
          {
              path: 'reports',
              component: ReportsComponent,
              // canActivate: [AuthGuard]
          },
          {
              path: 'systemstatistics',
              component: SystemStatisticsComponent,
              // canActivate: [AuthGuard]
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [
        WorkCenterComponent,
        TeamComponent
  ]
})
export class AdminRoutingModule { }
