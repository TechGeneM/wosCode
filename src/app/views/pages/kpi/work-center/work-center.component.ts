import { Component, ViewChild, OnInit } from '@angular/core';


declare var $;

function statusRender(data) {
	return '<div class="status ' + data.status + '"></div>' + data.value;
}


function formatInnerTable(table_id) {
	return `
	<div class="tabs-selector" id="tabs_${table_id}">
		<div class="tab" data-target="#tableTab_week_${table_id}">Weekly Report</div>
		<div class="tab" data-target="#tableTab_team_${table_id}">By Team</div>
		<div class="tab" data-target="#tableTab_location_${table_id}">By Location</div>
		<div class="tab" data-target="#tableTab_pod_${table_id}">By Pod</div>
		<div class="tab" data-target="#tableTab_time_${table_id}">Time Allocation (Hrs)</div>
	</div>
	<div class="inner-table-wrapper">


		<div class="tables" id="innerTables_${table_id}">
			<div class="table-tab" id="tableTab_week_${table_id}" style="display: none;">
				<table class="inner-table table table-striped" id = "innerTable_week_${table_id}" ></table>
			</div>
			<div class="table-tab" id="tableTab_team_${table_id}" style="display: none;">
				<table class="inner-table table table-striped" id = "innerTable_team_${table_id}" ></table>
			</div>
			<div class="table-tab" id="tableTab_location_${table_id}" style="display: none;">
				<table class="inner-table table table-striped" id = "innerTable_location_${table_id}" ></table>
			</div>
			<div class="table-tab" id="tableTab_pod_${table_id}" style="display: none;">
				<table class="inner-table table table-striped" id = "innerTable_pod_${table_id}" ></table>
			</div>
			<div class="table-tab" id="tableTab_time_${table_id}" style="display: none;">
				<table class="inner-table table table-striped" id = "innerTable_time_${table_id}" ></table>
			</div>
		</div>
	</div>`;
}


@Component({
	selector: 'kt-work-center',
	templateUrl: './work-center.component.html',
	// styleUrls: ['./work-center.component.scss'],
})
export class WorkCenterComponent implements OnInit {
	@ViewChild('dataTable', { static: true }) table;
	dataTable: any;
	dtOptions: any = {};

	ngOnInit(): void {
		let innerTableCounter = 1;
		this.dtOptions = {
			ajax: 'assets/data/kpi/kpi-work-center.json',
			searching: false,
			lengthChange: false,
			order: [],
			language: {
				paginate: {
					next: '<i class="la la-angle-right"></i>',
					previous: '<i class="la la-angle-left"></i>'
				}
			},
			columns: [
				{
					className: 'details-control',
					orderable: false,
					data: null,
					defaultContent: '<i class="fa fa-caret-right"></i>'
				},
				{
					title: 'Work Center',
					data: 'workCenter'
				}, {
					title: 'Roster HC',
					data: 'rosterHC'
				}, {
					title: 'Capacity Used',
					data: 'capacityUsed',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Capacity',
					data: 'capacity',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Throughput Plan',
					data: 'throughputPlan',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Utilization',
					data: 'utilization',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Attendance',
					data: 'attendance',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Uptime',
					data: 'uptime',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Overtime',
					data: 'overtime',
					render(data) {
						return statusRender(data);
					}
				}],

			responsive: false
		};

		this.dataTable = $(this.table.nativeElement);
		this.dataTable.DataTable(this.dtOptions);

	 // Add event listener for opening and closing details
		$(this.table.nativeElement).on('click', 'td.details-control', function (e) {

			const tr = $(this).closest('tr');
			const closestTable = tr.closest("table");
			const row = closestTable.DataTable().row(tr);

			if (row.child.isShown()) {
			// This row is already open - close it
				row.child.hide();
				tr.removeClass('shown');
				$(this).removeClass('open')
			} else {

			closestTable.DataTable().row('tr.shown').child.hide();
			$('tr.shown').removeClass('shown');
			$('td.details-control.open').removeClass('open');

			// Open this row
			row.child(formatInnerTable(innerTableCounter), 'child-row').show();
			tr.addClass('shown');
			$(this).addClass('open')

			$('#tabs_' + innerTableCounter + ' .tab').click(function () {
				const target = $(this).attr('data-target');
				$(this).addClass('active');
				$('.tabs-selector .tab').not(this).removeClass('active');
				$(target).show();
				$('.table-tab').not(target).hide();
			})

			$('#tabs_' + innerTableCounter + ' .tab[data-target="#tableTab_week_' + innerTableCounter + '"').addClass('active');
			$('#innerTables_' + innerTableCounter + ' #tableTab_week_' + innerTableCounter).show();

			const oInnerTableWeek = $('#innerTable_week_' + innerTableCounter).dataTable({
				data: row.data().innerData.weekly,
				lengthChange: false,
				searching: false,
				language: {
					paginate: {
						next: '<i class="la la-angle-right"></i>',
						previous: '<i class="la la-angle-left"></i>'
					}
				},
				// dom: 'Bfrtip',
				// buttons: [
				// 	'colvis',
				// 	'copy'
				// ],
				columns: [{
					title: 'Date',
					data: 'date'
				}, {
					title: 'Roster HC',
					data: 'rosterHC'
				}, {
					title: 'Capacity Used',
					data: 'capacityUsed',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Throughput Plan',
					data: 'throughputPlan',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Utilization',
					data: 'utilization',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Attendance',
					data: 'attendance',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Uptime (Hrs)',
					data: 'uptime',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'OT (Hrs)',
					data: 'overtime',
					render(data) {
						return statusRender(data);
					}
				}
				]
			});

			const oInnerTableTeam = $('#innerTable_team_' + innerTableCounter).dataTable({
				data: row.data().innerData.team,
				lengthChange: false,
				searching: false,
				language: {
					paginate: {
						next: '<i class="la la-angle-right"></i>',
						previous: '<i class="la la-angle-left"></i>'
					}
				},
				columns: [{
					title: 'Team',
					data: 'team'
				}, {
					title: 'Supervisor',
					data: 'supervisor'
				}, {
					title: 'Roster HC',
					data: 'rosterHC'
				}, {
					title: 'Capacity Used',
					data: 'capacityUsed',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Capacity',
					data: 'capacity',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Throughput Plan',
					data: 'throughputPlan',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Utilization',
					data: 'utilization',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Attendance',
					data: 'attendance',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Uptime (Hrs)',
					data: 'uptime',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'OT (Hrs)',
					data: 'overtime',
					render(data) {
						return statusRender(data);
					}
				}
				]
			});

			const oInnerTableLocation = $('#innerTable_location_' + innerTableCounter).dataTable({
				data: row.data().innerData.location,
				lengthChange: false,
				searching: false,
				language: {
					paginate: {
						next: '<i class="la la-angle-right"></i>',
						previous: '<i class="la la-angle-left"></i>'
					}
				},
				columns: [{
					title: 'Location',
					data: 'location'
				}, {
					title: 'Roster HC',
					data: 'rosterHC'
				}, {
					title: 'Capacity Used',
					data: 'capacityUsed',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Throughput Plan',
					data: 'throughputPlan',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Utilization',
					data: 'utilization',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Attendance',
					data: 'attendance',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Uptime (Hrs)',
					data: 'uptime',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'OT (Hrs)',
					data: 'overtime',
					render(data) {
						return statusRender(data);
					}
				}
				]
			});

			const oInnerTablePod = $('#innerTable_pod_' + innerTableCounter).dataTable({
				data: row.data().innerData.pod,
				lengthChange: false,
				searching: false,
				language: {
					paginate: {
						next: '<i class="la la-angle-right"></i>',
						previous: '<i class="la la-angle-left"></i>'
					}
				},
				columns: [{
					title: 'Pod',
					data: 'pod'
				}, {
					title: 'Roster HC',
					data: 'rosterHC'
				}, {
					title: 'Capacity Used',
					data: 'capacityUsed',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Throughput Plan',
					data: 'throughputPlan',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Utilization',
					data: 'utilization',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Attendance',
					data: 'attendance',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'Uptime (Hrs)',
					data: 'uptime',
					render(data) {
						return statusRender(data);
					}
				}, {
					title: 'OT (Hrs)',
					data: 'overtime',
					render(data) {
						return statusRender(data);
					}
				}
				]
			});

			const oInnerTableTime = $('#innerTable_time_' + innerTableCounter).dataTable({
				data: row.data().innerData.time,
				lengthChange: false,
				searching: false,
				language: {
					paginate: {
						next: '<i class="la la-angle-right"></i>',
						previous: '<i class="la la-angle-left"></i>'
					}
				},
				columns: [{
					title: 'Team',
					data: 'team'
				}, {
					title: 'Supervisor',
					data: 'supervisor'
				}, {
					title: 'Uptime',
					data: 'uptime'
				}, {
					title: 'Break',
					data: 'break'
				}, {
					title: 'Lunch',
					data: 'lunch'
				}, {
					title: 'Meeting',
					data: 'meeting'
				}, {
					title: 'Training',
					data: 'training'
				}, {
					title: 'Non Production Work',
					data: 'nonProd'
				}, {
					title: 'Team Engagement Event',
					data: 'engagement'
				}, {
					title: 'Absence: Planned',
					data: 'absencePlanned'
				}, {
					title: 'Absence: Unplanned',
					data: 'absenceUnplanned'
				}, {
					title: 'Staff Pool',
					data: 'staffPool'
				}, {
					title: 'Rotation',
					data: 'rotation'
				}
			]});

			innerTableCounter += 1;
			}
	  });
	}
 }
