// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
// import { CoreModule } from '../../../core/core.module';
// import { PartialsModule } from '../../partials/partials.module';
import { KpiComponent } from './kpi.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkCenterComponent } from './work-center/work-center.component';
import { TeamComponent } from './team/team.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: KpiComponent,
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
	}
];


@NgModule({
	imports: [
		CommonModule,
		// PartialsModule,
		// CoreModule,
		NgbModule,
		FormsModule,
		RouterModule.forChild(routes),
	],
	providers: [],
	declarations: [
		KpiComponent,
		WorkCenterComponent,
		TeamComponent
	]
})
export class KpiModule {
}
