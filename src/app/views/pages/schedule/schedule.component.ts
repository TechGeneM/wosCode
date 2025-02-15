import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

declare var $;
const now = new Date();
@Component({
  selector: 'kt-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
	@ViewChild('calendar', { static: true }) calendarComponent: FullCalendarComponent;
	weekPickerModel: NgbDateStruct;
	date: {year: number, month: number};

	selectToday() {
		this.weekPickerModel = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
	}
  reportsTableOptions: DataTables.Settings = {};
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  todayDate = moment().startOf('day');
  YM = this.todayDate.format('YYYY-MM');
  YESTERDAY = this.todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
  TODAY = this.todayDate.format('YYYY-MM-DD');
  TOMORROW = this.todayDate.clone().add(1, 'day').format('YYYY-MM-DD');
	events: any = [
		{ title: 'Preparation', start: '2019-09-09T05:50:00', end: '2019-09-09T06:00:00', className: 'event-prep' },
		{ title: 'Production', start: '2019-09-09T06:00:00', end: '2019-09-09T07:00:00', className: 'event-production' },
		{ title: 'Production', start: '2019-09-09T07:00:00', end: '2019-09-09T08:00:00', className: 'event-production' },
		{ title: 'Break', start: '2019-09-09T08:00:00', end: '2019-09-09T08:10:00', className: 'event-break' },
		{ title: 'Production', start: '2019-09-09T08:10:00', end: '2019-09-09T09:10:00', className: 'event-production' },
		{ title: 'Production', start: '2019-09-09T09:10:00', end: '2019-09-09T10:10:00', className: 'event-production' },
		{ title: 'Break', start: '2019-09-09T10:10:00', end: '2019-09-09T10:20:00', className: 'event-break' },
		{ title: 'Production', start: '2019-09-09T10:20:00', end: '2019-09-09T11:20:00', className: 'event-production' },
		{ title: 'Lunch', start: '2019-09-09T11:20:00', end: '2019-09-09T12:20:00', className: 'event-break' },
		{ title: 'Meeting', start: '2019-09-09T12:20:00', end: '2019-09-09T12:40:00', className: 'event-meeting' },
		{ title: 'Production', start: '2019-09-09T12:40:00', end: '2019-09-09T13:40:00', className: 'event-production' },
		{ title: 'Meeting', start: '2019-09-09T13:40:00', end: '2019-09-09T14:00:00', className: 'event-meeting' },
		{ title: 'Packup', start: '2019-09-09T14:00:00', end: '2019-09-09T14:10:00', className: 'event-prep' },

		{ title: 'Preparation', start: '2019-09-10T05:50:00', end: '2019-09-10T06:00:00', className: 'event-prep' },
		{ title: 'Production', start: '2019-09-10T06:00:00', end: '2019-09-10T07:00:00', className: 'event-production' },
		{ title: 'Production', start: '2019-09-10T07:00:00', end: '2019-09-10T08:00:00', className: 'event-production' },
		{ title: 'Break', start: '2019-09-10T08:00:00', end: '2019-09-10T08:10:00', className: 'event-break' },
		{ title: 'Production', start: '2019-09-10T08:10:00', end: '2019-09-10T09:10:00', className: 'event-production' },
		{ title: 'Production', start: '2019-09-10T09:10:00', end: '2019-09-10T10:10:00', className: 'event-production' },
		{ title: 'Break', start: '2019-09-10T10:10:00', end: '2019-09-10T10:20:00', className: 'event-break' },
		{ title: 'Production', start: '2019-09-10T10:20:00', end: '2019-09-10T11:20:00', className: 'event-production' },
		{ title: 'Lunch', start: '2019-09-10T11:20:00', end: '2019-09-10T12:20:00', className: 'event-break' },
		{ title: 'Meeting', start: '2019-09-10T12:20:00', end: '2019-09-10T12:40:00', className: 'event-meeting' },
		{ title: 'Production', start: '2019-09-10T12:40:00', end: '2019-09-10T13:40:00', className: 'event-production' },
		{ title: 'Meeting', start: '2019-09-10T13:40:00', end: '2019-09-10T14:00:00', className: 'event-meeting' },
		{ title: 'Packup', start: '2019-09-10T14:00:00', end: '2019-09-10T14:10:00', className: 'event-prep' },

		{ title: 'Preparation', start: '2019-09-11T05:50:00', end: '2019-09-11T06:00:00', className: 'event-prep' },
		{ title: 'Production', start: '2019-09-11T06:00:00', end: '2019-09-11T07:00:00', className: 'event-production' },
		{ title: 'Production', start: '2019-09-11T07:00:00', end: '2019-09-11T08:00:00', className: 'event-production' },
		{ title: 'Break', start: '2019-09-11T08:00:00', end: '2019-09-11T08:10:00', className: 'event-break' },
		{ title: 'Production', start: '2019-09-11T08:10:00', end: '2019-09-11T09:10:00', className: 'event-production' },
		{ title: 'Production', start: '2019-09-11T09:10:00', end: '2019-09-11T10:10:00', className: 'event-production' },
		{ title: 'Break', start: '2019-09-11T10:10:00', end: '2019-09-11T10:20:00', className: 'event-break' },
		{ title: 'Production', start: '2019-09-11T10:20:00', end: '2019-09-11T11:20:00', className: 'event-production' },
		{ title: 'Lunch', start: '2019-09-11T11:20:00', end: '2019-09-11T12:20:00', className: 'event-break' },
		{ title: 'Meeting', start: '2019-09-11T12:20:00', end: '2019-09-11T12:40:00', className: 'event-meeting' },
		{ title: 'Production', start: '2019-09-11T12:40:00', end: '2019-09-11T13:40:00', className: 'event-production' },
		{ title: 'Meeting', start: '2019-09-11T13:40:00', end: '2019-09-11T14:00:00', className: 'event-meeting' },
		{ title: 'Packup', start: '2019-09-11T14:00:00', end: '2019-09-11T14:10:00', className: 'event-prep' },

		{ title: 'Preparation', start: '2019-09-12T05:50:00', end: '2019-09-12T06:00:00', className: 'event-prep' },
		{ title: 'Production', start: '2019-09-12T06:00:00', end: '2019-09-12T07:00:00', className: 'event-production' },
		{ title: 'Production', start: '2019-09-12T07:00:00', end: '2019-09-12T08:00:00', className: 'event-production' },
		{ title: 'Break', start: '2019-09-12T08:00:00', end: '2019-09-12T08:10:00', className: 'event-break' },
		{ title: 'Production', start: '2019-09-12T08:10:00', end: '2019-09-12T09:10:00', className: 'event-production' },
		{ title: 'Production', start: '2019-09-12T09:10:00', end: '2019-09-12T10:10:00', className: 'event-production' },
		{ title: 'Break', start: '2019-09-12T10:10:00', end: '2019-09-12T10:20:00', className: 'event-break' },
		{ title: 'Production', start: '2019-09-12T10:20:00', end: '2019-09-12T11:20:00', className: 'event-production' },
		{ title: 'Lunch', start: '2019-09-12T11:20:00', end: '2019-09-12T12:20:00', className: 'event-break' },
		{ title: 'Meeting', start: '2019-09-12T12:20:00', end: '2019-09-12T12:35:00', className: 'event-meeting' },
		{ title: 'Production', start: '2019-09-12T12:35:00', end: '2019-09-12T13:35:00', className: 'event-production' },
		{ title: 'Production', start: '2019-09-12T13:35:00', end: '2019-09-12T14:00:00', className: 'event-production' },
		{ title: 'Production', start: '2019-09-12T14:00:00', end: '2019-09-12T15:00:00', className: 'event-production' },
		{ title: 'Break', start: '2019-09-12T15:00:00', end: '2019-09-12T15:20:00', className: 'event-break' },
		{ title: 'Production', start: '2019-09-12T15:20:00', end: '2019-09-12T16:00:00', className: 'event-production' },
		{ title: 'Packup', start: '2019-09-12T16:00:00', end: '2019-09-12T16:10:00', className: 'event-prep' },

		{ title: 'Preparation', start: '2019-09-13T05:50:00', end: '2019-09-13T06:00:00', className: 'event-prep' },
		{ title: 'Production', start: '2019-09-13T06:00:00', end: '2019-09-13T07:00:00', className: 'event-production' },
		{ title: 'Production', start: '2019-09-13T07:00:00', end: '2019-09-13T08:00:00', className: 'event-production' },
		{ title: 'Break', start: '2019-09-13T08:00:00', end: '2019-09-13T08:10:00', className: 'event-break' },
		{ title: 'Production', start: '2019-09-13T08:10:00', end: '2019-09-13T09:10:00', className: 'event-production' },
		{ title: 'Production', start: '2019-09-13T09:10:00', end: '2019-09-13T10:10:00', className: 'event-production' },
		{ title: 'Break', start: '2019-09-13T10:10:00', end: '2019-09-13T10:20:00', className: 'event-break' },
		{ title: 'Production', start: '2019-09-13T10:20:00', end: '2019-09-13T11:20:00', className: 'event-production' },
		{ title: 'Lunch', start: '2019-09-13T11:20:00', end: '2019-09-13T11:50:00', className: 'event-break' },
		{ title: 'Meeting', start: '2019-09-13T11:50:00', end: '2019-09-13T12:05:00', className: 'event-meeting' },
		{ title: 'Staff Pool', start: '2019-09-13T12:05:00', end: '2019-09-13T13:05:00', className: 'event-staff' },
		{ title: 'Staff Pool', start: '2019-09-13T13:05:00', end: '2019-09-13T14:05:00', className: 'event-staff' },
		{ title: 'Break', start: '2019-09-13T14:05:00', end: '2019-09-13T14:15:00', className: 'event-break' },
		{ title: 'Production', start: '2019-09-13T14:15:00', end: '2019-09-13T15:05:00', className: 'event-production' },
		{ title: 'Packup', start: '2019-09-13T15:05:00', end: '2019-09-13T15:15:00', className: 'event-prep' },
	];


   panelOpenState: false;

  handleEventResize(e) {
    const start = moment(e.event.start);
    const end = moment(e.event.end);
    const duration = moment.duration(end.diff(start)).asMinutes();
    if (duration < 10) {
      const moveBy = 10 - duration;
      e.event.moveEnd('00:' + ((moveBy < 10) ? '0' + moveBy : moveBy) + ':00');
    } else if ((duration > 15) && (duration < 30)) {
      const moveBy = duration - 15;
      e.event.moveEnd('-00:' + ((moveBy < 10) ? '0' + moveBy : moveBy) + ':00');
    } else if ((duration > 30) && (duration < 60)) {
      const moveBy = duration - 30;
      e.event.moveEnd('-00:' + ((moveBy < 10) ? '0' + moveBy : moveBy) + ':00');
    } else if (duration > 60) {
      const moveBy = duration - 60;
      e.event.moveEnd('-00:' + ((moveBy < 10) ? '0' + moveBy : moveBy) + ':00');
    }
  }

  handleSkeletonRender(e) {
	const calendarApi = this.calendarComponent.getApi();
	const mondayDate = $('.fc-bg .fc-day.fc-mon').data('date');
	const tuesdayDate = $('.fc-bg .fc-day.fc-tue').data('date');
	const wednesdayDate = $('.fc-bg .fc-day.fc-wed').data('date');
	const thursdayDate = $('.fc-bg .fc-day.fc-thu').data('date');
	const fridayDate = $('.fc-bg .fc-day.fc-fri').data('date');
	const saturdayDate = $('.fc-bg .fc-day.fc-sat').data('date');
	const sundayDate = $('.fc-bg .fc-day.fc-sun').data('date');

 $('.fc-slats tr[data-time*="0:00"] .fc-widget-content:not(".fc-time")').each(function() {
      const time = $(this).parent('tr').data('time');
      $(this).append(`
        <div class="add-event-buttons">
          <div class="add-event" data-date="${mondayDate}T${time}"></div>
          <div class="add-event" data-date="${tuesdayDate}T${time}"></div>
          <div class="add-event" data-date="${wednesdayDate}T${time}"></div>
          <div class="add-event" data-date="${thursdayDate}T${time}"></div>
          <div class="add-event" data-date="${fridayDate}T${time}"></div>
          <div class="add-event" data-date="${saturdayDate}T${time}"></div>
          <div class="add-event" data-date="${sundayDate}T${time}"></div>
        </div>
      `);
 });
	$('.fc-day-header').append('<div class="day-menu material-icons mat-icon">more_vert</div>');

	function addEvent(key, opt, name, className) {
		const date = opt.$trigger.data('date');
		calendarApi.addEvent({ title: name, start: date, className});
	   }

	function changeEvent(key, opt, name, className) {
		const eventId = opt.$trigger.data('event-id');
		const event = calendarApi.getEventById(eventId);
		event.setProp('title', name);
		event.setProp('classNames', className)
	}

		function deleteEvent(key, opt) {
			const eventId = opt.$trigger.data('event-id');
			const event = calendarApi.getEventById(eventId);
			event.remove();
		}

	$.contextMenu({
		selector: '.add-event',
		trigger: 'left',
		autoHide: true,
		items: {
			production: {
				name: 'Production',
				callback(key, opt) {
					addEvent(key, opt, 'Production', 'event-production');
				}
			},
			break: {
				name: 'Break',
				callback(key, opt) {
					addEvent(key, opt, 'Break', 'event-break');
				}
			},
			meeting: {
				name: 'Meeting',
				callback(key, opt) {
					addEvent(key, opt, 'Meeting', 'event-meeting');
				}
			},
			training: {
				name: 'Training & Development',
				callback(key, opt) {
					addEvent(key, opt, 'Training & Development', 'event-training');
				}
			},
			nonProd: {
				name: 'Non Production Work',
				callback(key, opt) {
					addEvent(key, opt, 'Non Production Work', 'event-non-prod');
				}
			},
			engagement: {
				name: 'Team Engagement Event',
				callback(key, opt) {
					addEvent(key, opt, 'Team Engagement Event', 'event-team-engagement');
				}
			},
			absencePlanned: {
				name: 'Absence: Planned',
				callback(key, opt) {
					addEvent(key, opt, 'Absence: Planned', 'event-absence-planned');
				}
			},
			absenceUnplanned: {
				name: 'Absence: Unplanned',
				callback(key, opt) {
					addEvent(key, opt, 'Absence: Unplanned', 'event-absence-unplanned');
				}
			},
			staffPool: {
				name: 'Staff Pool',
				callback(key, opt) {
					addEvent(key, opt, 'Staff Pool', 'event-staff');
				}
			},
			rotation: {
				name: 'Rotation',
				callback(key, opt) {
					addEvent(key, opt, 'Rotation', 'event-rotation');
				}
			},
			lunch: {
				name: 'Lunch',
				callback(key, opt) {
					addEvent(key, opt, 'Lunch', 'event-break');
				}
			}
		},
		events: {
			show() {
				this.addClass('open');
			},
			hide() {
				this.removeClass('open');
			}
		}
	   })

	$.contextMenu({
		selector: '.fc-event',
		trigger: 'left',
		autoHide: true,
		items: {
			delete: {
				name: 'Delete',
				callback(key, opt) {
					deleteEvent(key, opt);
				}
			},
			separator2: { "type": "cm_separator" },
			production: {
				name: 'Production',
				callback(key, opt) {
					changeEvent(key, opt, 'Production', 'event-production');
				}
			},
			break: {
				name: 'Break',
				callback(key, opt) {
					changeEvent(key, opt, 'Break', 'event-break');
				}
			},
			meeting: {
				name: 'Meeting',
				callback(key, opt) {
					changeEvent(key, opt, 'Meeting', 'event-meeting');
				}
			},
			training: {
				name: 'Training & Development',
				callback(key, opt) {
					changeEvent(key, opt, 'Training & Development', 'event-training');
				}
			},
			nonProd: {
				name: 'Non Production Work',
				callback(key, opt) {
					changeEvent(key, opt, 'Non Production Work', 'event-non-prod');
				}
			},
			engagement: {
				name: 'Team Engagement Event',
				callback(key, opt) {
					changeEvent(key, opt, 'Team Engagement Event', 'event-team-engagement');
				}
			},
			absencePlanned: {
				name: 'Absence: Planned',
				callback(key, opt) {
					changeEvent(key, opt, 'Absence: Planned', 'event-absence-planned');
				}
			},
			absenceUnplanned: {
				name: 'Absence: Unplanned',
				callback(key, opt) {
					changeEvent(key, opt, 'Absence: Unplanned', 'event-absence-unplanned');
				}
			},
			staffPool: {
				name: 'Staff Pool',
				callback(key, opt) {
					changeEvent(key, opt, 'Staff Pool', 'event-staff');
				}
			},
			rotation: {
				name: 'Rotation',
				callback(key, opt) {
					changeEvent(key, opt, 'Rotation', 'event-rotation');
				}
			},
			lunch: {
				name: 'Lunch',
				callback(key, opt) {
					changeEvent(key, opt, 'Lunch', 'event-break');
				}
			}
		},
		events: {
			show() {
				this.addClass('change-menu-open');
			},
			hide() {
				this.removeClass('change-menu-open');
			}
		}
	})


	$.contextMenu({
		selector: '.day-menu',
		trigger: 'left',
		autoHide: true,
		items: {
			copy_day: {
				name: 'Copy to next day',
			},
			copy_week: {
				name: 'Copy to entire week'
			}
		},
		events: {
			show() {
				this.addClass('open');
			},
			hide() {
				this.removeClass('open');
			}
		}
	})
  }


  handleEventClick(e) {

  }


	handleEventRender(e) {
		e.el.setAttribute('data-event-id', e.event.id);
		const eventEnd = moment(e.event.end);
		if (eventEnd.valueOf() < moment().valueOf()) {
			e.el.classList.add('past-event');
		}
  }

  constructor() { }

	ngOnInit() {
		// assign ids to included events
		let eventIndex = 1;
		this.events.forEach(event => {
			// tslint:disable-next-line
			event.id = eventIndex;
			eventIndex++;
		})

  this.reportsTableOptions = {
      lengthChange: false,
      searching: false,
      paging: false,
      info: false,
      ordering: false,
      columnDefs: [

      ]
    };

  }

}
