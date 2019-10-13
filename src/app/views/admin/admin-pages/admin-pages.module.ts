import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiComponent } from './kpi/kpi.component';
import { WorkCenterComponent } from './kpi/work-center/work-center.component';
import { TeamComponent } from './kpi/team/team.component';
import { RosterComponent, AddAgent, BulkEditAgent, UpdateEventAgent, AddSupervisor, DeleteAgent, EditAgent } from './roster/roster.component';
import { TeamSettingsComponent } from './team-settings/team-settings.component';
import { ReportsComponent } from './reports/reports.component';
import { SystemStatisticsComponent } from './system-statistics/system-statistics.component';
import { TeamSettingsModule } from './team-settings/team-settings.module';
import {
  MatTabsModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatButtonModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatCheckboxModule,
  MatCardModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatPaginator,
  MatPaginatorModule,
  MatProgressBarModule,
} from '@angular/material';
import { RosterModule } from './roster/roster.module';
import { ReportsModule } from './reports/reports.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    KpiComponent,
    WorkCenterComponent,
    TeamComponent,
    RosterComponent,
    TeamSettingsComponent,
    ReportsComponent,
    SystemStatisticsComponent,
    AddAgent,
    EditAgent,
    DeleteAgent,
    BulkEditAgent,
    UpdateEventAgent,
    AddSupervisor
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    TeamSettingsModule,
    RosterModule,
    ReportsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatProgressBarModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    RosterComponent,
    TeamSettingsComponent,
    ReportsComponent,
    SystemStatisticsComponent,
    AddAgent,
    EditAgent,
    DeleteAgent,
    BulkEditAgent,
    UpdateEventAgent,
    AddSupervisor
  ],
  entryComponents: [
    AddAgent,
    EditAgent,
    DeleteAgent,
    BulkEditAgent,
    UpdateEventAgent,
    AddSupervisor
  ]
})
export class AdminPagesModule { }
