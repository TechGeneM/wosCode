import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
const now = new Date();

declare var $;

function statusRender(data) {
  let html = '';
  if (data.status === 'good') {
    html = '<i class="material-icons status ' + data.status + '">arrow_drop_up</i>' + data.value;
  } else {
    html = '<i class="material-icons status ' + data.status + '">arrow_drop_down</i>' + data.value;
  }

  return html;
}


function formatInnerTable(tableId) {
  return `
  <div class="inner-table-wrapper">
    <div class="row">
      <div class="col-9">
        <div class="tabs-selector" id="tabs_${tableId}">
          <div class="tab" data-target="#tableTab_week_${tableId}">By Week</div>
          <div class="tab" data-target="#tableTab_team_${tableId}">By Team</div>
          <div class="tab" data-target="#tableTab_location_${tableId}">By Location</div>
          <div class="tab" data-target="#tableTab_pod_${tableId}">By Pod</div>
          <div class="tab" data-target="#tableTab_time_${tableId}">Time Allocation (Hrs)</div>
        </div>
      </div>
      <div class="col-3">
        <div class="date-control">
          <div class="date-prev">
            <i class="material-icons">chevron_left</i>
          </div>
          <div class="date-next">
            <i class="material-icons">chevron_right</i>
          </div>

          <div class="date-today">
            today
          </div>

          <div class="current-date">
            AUG 12 - 17, 2019
          </div>
        </div>
      </div>
    </div>

    <div class="tables" id="innerTables_${tableId}">
      <div class="table-tab" id="tableTab_week_${tableId}" style="display: none;">
        <table class="inner-table table table-striped" id = "innerTable_week_${tableId}" ></table>
      </div>
      <div class="table-tab" id="tableTab_team_${tableId}" style="display: none;">
        <table class="inner-table table table-striped" id = "innerTable_team_${tableId}" ></table>
      </div>
      <div class="table-tab" id="tableTab_location_${tableId}" style="display: none;">
        <table class="inner-table table table-striped" id = "innerTable_location_${tableId}" ></table>
      </div>
      <div class="table-tab" id="tableTab_pod_${tableId}" style="display: none;">
        <table class="inner-table table table-striped" id = "innerTable_pod_${tableId}" ></table>
      </div>
      <div class="table-tab" id="tableTab_time_${tableId}" style="display: none;">
        <table class="inner-table table table-striped" id = "innerTable_time_${tableId}" ></table>
      </div>
    </div>
  </div>`;
}


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  // styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  @ViewChild('dataTable', { static: true }) table;
  @ViewChild('ngbDatepicker', { static: true }) ngbDatepicker;

  model: NgbDateStruct;
  date: {year: number, month: number};
  dataTable: any;
  dtOptions: any = {};
  data = [
    {
      id: 0,
      workCenter: 'Influenza CM',
      rosterHC: '10',
      capacityUsed: {
        value: '100%',
        status: 'good'
      },
      capacity: {
        value: '90',
        status: 'good'
      },
      throughputPlan: {
        value: '60 ACT',
        status: 'good'
      },
      utilization: {
        value: '100%',
        status: 'good'
      },
      attendance: {
        value: '100%',
        status: 'good'
      },
      uptime: {
        value: '50',
        status: 'good'
      },
      overtime: {
        value: '4',
        status: 'bad'
      },
      innerData: {
        weekly: [{
          date: 'Monday, August 12, 2019',
          rosterHC: '10',
          capacityUsed: {
            value: '100%',
            status: 'good'
          },
          throughputPlan: {
            value: '60 ACT',
            status: 'good'
          },
          utilization: {
            value: '100%',
            status: 'good'
          },
          attendance: {
            value: '100%',
            status: 'good'
          },
          uptime: {
            value: '50',
            status: 'good'
          },
          overtime: {
            value: '4',
            status: 'bad'
          }
        }],
        team: [{
          team: 'PDX_Sup_01',
          supervisor: 'Michael Scott',
          rosterHC: '10',
          capacityUsed: {
            value: '100%',
            status: 'good'
          },
          capacity: {
            value: '90',
            status: 'good'
          },
          throughputPlan: {
            value: '60 ACT',
            status: 'good'
          },
          utilization: {
            value: '100%',
            status: 'good'
          },
          attendance: {
            value: '100%',
            status: 'good'
          },
          uptime: {
            value: '50',
            status: 'good'
          },
          overtime: {
            value: '4',
            status: 'bad'
          }
        }],
        location: [{
          location: 'PDX',
          rosterHC: '10',
          capacityUsed: {
            value: '100%',
            status: 'good'
          },
          capacity: {
            value: '90',
            status: 'good'
          },
          throughputPlan: {
            value: '60 ACT',
            status: 'good'
          },
          utilization: {
            value: '100%',
            status: 'good'
          },
          attendance: {
            value: '100%',
            status: 'good'
          },
          uptime: {
            value: '50',
            status: 'good'
          },
          overtime: {
            value: '4',
            status: 'bad'
          }
        }],
        pod: [{
          pod: 'Pod 01',
          rosterHC: '10',
          capacityUsed: {
            value: '100%',
            status: 'good'
          },
          capacity: {
            value: '90',
            status: 'good'
          },
          throughputPlan: {
            value: '60 ACT',
            status: 'good'
          },
          utilization: {
            value: '100%',
            status: 'good'
          },
          attendance: {
            value: '100%',
            status: 'good'
          },
          uptime: {
            value: '50',
            status: 'good'
          },
          overtime: {
            value: '4',
            status: 'bad'
          }
        }],
        time: [{
          team: 'PDX_Sup_01',
          supervisor: 'Michael Scott',
          uptime: '04',
          break: '04',
          lunch: '04',
          meeting: '04',
          training: '04',
          nonProd: '04',
          engagement: '04',
          absencePlanned: '04',
          absenceUnplanned: '04',
          staffPool: '04',
          rotation: '04'
        }]
      }
    }, {
      id: 2,
      workCenter: 'Influenza IC',
      rosterHC: '10',
      capacityUsed: {
        value: '100%',
        status: 'good'
      },
      capacity: {
        value: '70',
        status: 'bad'
      },
      throughputPlan: {
        value: '60 IFM',
        status: 'good'
      },
      utilization: {
        value: '96%',
        status: 'bad'
      },
      attendance: {
        value: '100%',
        status: 'good'
      },
      uptime: {
        value: '50',
        status: 'good'
      },
      overtime: {
        value: '4',
        status: 'bad'
      },
      innerData: {
        weekly: [{
          date: 'Monday, August 12, 2019',
          rosterHC: '10',
          capacityUsed: {
            value: '100%',
            status: 'good'
          },
          throughputPlan: {
            value: '60 ACT',
            status: 'good'
          },
          utilization: {
            value: '100%',
            status: 'good'
          },
          attendance: {
            value: '100%',
            status: 'good'
          },
          uptime: {
            value: '50',
            status: 'good'
          },
          overtime: {
            value: '4',
            status: 'bad'
          }
        }],
        team: [{
          team: 'PDX_Sup_01',
          supervisor: 'Michael Scott',
          rosterHC: '10',
          capacityUsed: {
            value: '100%',
            status: 'good'
          },
          capacity: {
            value: '90',
            status: 'good'
          },
          throughputPlan: {
            value: '60 ACT',
            status: 'good'
          },
          utilization: {
            value: '100%',
            status: 'good'
          },
          attendance: {
            value: '100%',
            status: 'good'
          },
          uptime: {
            value: '50',
            status: 'good'
          },
          overtime: {
            value: '4',
            status: 'bad'
          }
        }],
        location: [{
          location: 'PDX',
          rosterHC: '10',
          capacityUsed: {
            value: '100%',
            status: 'good'
          },
          capacity: {
            value: '90',
            status: 'good'
          },
          throughputPlan: {
            value: '60 ACT',
            status: 'good'
          },
          utilization: {
            value: '100%',
            status: 'good'
          },
          attendance: {
            value: '100%',
            status: 'good'
          },
          uptime: {
            value: '50',
            status: 'good'
          },
          overtime: {
            value: '4',
            status: 'bad'
          }
        }],
        pod: [{
          pod: 'Pod 01',
          rosterHC: '10',
          capacityUsed: {
            value: '100%',
            status: 'good'
          },
          capacity: {
            value: '90',
            status: 'good'
          },
          throughputPlan: {
            value: '60 ACT',
            status: 'good'
          },
          utilization: {
            value: '100%',
            status: 'good'
          },
          attendance: {
            value: '100%',
            status: 'good'
          },
          uptime: {
            value: '50',
            status: 'good'
          },
          overtime: {
            value: '4',
            status: 'bad'
          }
        }],
        time: [{
          team: 'PDX_Sup_01',
          supervisor: 'Michael Scott',
          uptime: '04',
          break: '04',
          lunch: '04',
          meeting: '04',
          training: '04',
          nonProd: '04',
          engagement: '04',
          absencePlanned: '04',
          absenceUnplanned: '04',
          staffPool: '04',
          rotation: '04'
        }]
      }
    }
  ];


  ngOnInit(): void {
    let innerTableCounter = 1;
    this.dtOptions = {
      data: this.data,
      searching: false,
      lengthChange: false,
      order: [],
      // scrollX: true,
      // autoWidth: true,
      language: {
        paginate: {
          next: '<i class="material-icons">chevron_right</i>',
          previous: '<i class="material-icons">chevron_left</i>'
        }
      },
      columns: [
        {
          className: 'details-control',
          orderable: false,
          data: null,
          defaultContent: '<i class="material-icons">arrow_right</i>'
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
        }],

      responsive: false
    };

    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable(this.dtOptions);

   // Add event listener for opening and closing details
    $(this.table.nativeElement).on('click', 'td.details-control', function (e) {

      const tr = $(this).closest('tr');
      const closestTable = tr.closest('table');
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
            next: '<i class="material-icons">chevron_right</i>',
            previous: '<i class="material-icons">chevron_left</i>'
          }
        },
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
            next: '<i class="material-icons">chevron_right</i>',
            previous: '<i class="material-icons">chevron_left</i>'
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
            next: '<i class="material-icons">chevron_right</i>',
            previous: '<i class="material-icons">chevron_left</i>'
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
            next: '<i class="material-icons">chevron_right</i>',
            previous: '<i class="material-icons">chevron_left</i>'
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
            next: '<i class="material-icons">chevron_right</i>',
            previous: '<i class="material-icons">chevron_left</i>'
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
