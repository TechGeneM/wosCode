// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
// Auth
import { AuthGuard } from '../../../core/auth';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'schedule',
				loadChildren: () => import('app/views/pages/schedule/schedule.module').then(m => m.ScheduleModule)
			},
			{
				path: 'metrics',
				loadChildren: () => import('app/views/pages/metrics/metrics.module').then(m => m.MetricsModule)
			},
			{
				path: 'roster',
				loadChildren: () => import('app/views/pages/roster/roster.module').then(m => m.RosterModule)
			},
			{
				path: 'team-settings',
				loadChildren: () => import('app/views/pages/team-settings/team-settings.module').then(m => m.TeamSettingsModule)
			},
			{
				path: 'reports',
				loadChildren: () => import('app/views/pages/reports/reports.module').then(m => m.ReportsModule)
			},
			{
				path: 'statistics',
				loadChildren: () => import('app/views/pages/statistics/statistics.module').then(m => m.StatisticsModule)
			},
			{
				path: 'builder',
				loadChildren: () => import('app/views/themes/demo1/content/builder/builder.module').then(m => m.BuilderModule)
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'metrics', pathMatch: 'full'},
			{path: '**', redirectTo: 'metrics', pathMatch: 'full'}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
