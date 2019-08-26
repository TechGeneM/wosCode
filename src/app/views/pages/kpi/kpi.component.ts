// Angular
import { Component } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();
@Component({
	selector: 'kt-kpi',
	templateUrl: './kpi.component.html',
	styleUrls: ['kpi.component.scss'],
})
export class KPIComponent {
	model: NgbDateStruct;
	date: {year: number, month: number};

	selectToday() {
		this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
	}
}
