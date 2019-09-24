// Angular
import { NgModule } from '@angular/core';
import { NgbModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgentRoleComponent, AddAgentRole, EditAgentRole, DeleteAgentRole } from './agent-role/agent-role.component';
import { AgentTypeComponent, AddAgentType, EditAgentType, DeleteAgentType } from './agent-type/agent-type.component';
import { AssignmentsComponent, AddAssignment, DeleteAssignment } from './assignments/assignments.component';
import {
    TherapeuticAreaComponent,
    AddTherapeuticArea,
    EditTherapeuticArea,
    DeleteTherapeuticArea,
    EditWorkCenter,
    AddWorkCenter,
    DeleteWorkCenter
} from './therapeutic-area/therapeutic-area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTooltipModule,
    MatSliderModule
} from '@angular/material';
import { MyDatePickerModule } from 'mydatepicker';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AgentSettingsComponent } from './agent-settings/agent-settings.component';
import { WorkCenterComponent } from './work-center/work-center.component';


@NgModule({
    imports: [
        NgbModule,
        NgbTabsetModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatTooltipModule,
        MatButtonModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatMenuModule,
        MatDialogModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MyDatePickerModule,
        MatTabsModule,
        MatSliderModule
    ],
    providers: [],
    declarations: [
        AgentRoleComponent,
        AgentTypeComponent,
        AssignmentsComponent,
        TherapeuticAreaComponent,
        WorkCenterComponent,
        AgentSettingsComponent,
        AddAgentRole,
        AddAgentType,
        AddTherapeuticArea,
        EditAgentRole,
        EditAgentType,
        EditTherapeuticArea,
        AddAssignment,
        DeleteTherapeuticArea,
        DeleteAgentRole,
        DeleteAgentType,
        DeleteAssignment,
        EditWorkCenter,
        AddWorkCenter,
        DeleteWorkCenter
    ],
    exports: [
        RouterModule,
        AgentRoleComponent,
        AgentTypeComponent,
        AssignmentsComponent,
        AgentSettingsComponent,
        TherapeuticAreaComponent,
        WorkCenterComponent,
        AddAgentRole,
        AddAgentType,
        AddTherapeuticArea,
        EditAgentRole,
        EditAgentType,
        EditTherapeuticArea,
        AddAssignment,
        DeleteTherapeuticArea,
        DeleteAgentRole,
        DeleteAgentType,
        DeleteAssignment,
        EditWorkCenter,
        AddWorkCenter,
        DeleteWorkCenter
    ],
    entryComponents: [
        AddAgentRole,
        AddAgentType,
        AddTherapeuticArea,
        EditAgentRole,
        EditAgentType,
        EditTherapeuticArea,
        AddAssignment,
        DeleteTherapeuticArea,
        DeleteAgentRole,
        DeleteAgentType,
        DeleteAssignment,
        EditWorkCenter,
        AddWorkCenter,
        DeleteWorkCenter
    ]
})
export class TeamSettingsModule {
}
