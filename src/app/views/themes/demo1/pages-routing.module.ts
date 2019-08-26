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
				path: 'kpi',
				loadChildren: () => import('app/views/pages/kpi/kpi.module').then(m => m.KPIModule)
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
			{path: '', redirectTo: 'kpi', pathMatch: 'full'},
			{path: '**', redirectTo: 'kpi', pathMatch: 'full'}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
