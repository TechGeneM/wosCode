// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { ScheduleComponent } from './schedule.component';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
	imports: [
		CommonModule,
		PartialsModule,
		CoreModule,
		FullCalendarModule,
		RouterModule.forChild([
			{
				path: '',
				component: ScheduleComponent
			},
		]),
	],
	providers: [],
	declarations: [
		ScheduleComponent,
	]
})
export class ScheduleModule {
}
