// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgentsComponent } from './agents/agents.component';
import { SupervisorsComponent } from './supervisors/supervisors.component';
import { AdminsComponent } from './admins/admins.component';
import {
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        MatTabsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatCheckboxModule,
        MatMenuModule,
        MatIconModule,
        MatPaginatorModule,
        MatSelectModule
    ],
    providers: [],
    declarations: [
        AgentsComponent,
        SupervisorsComponent,
        AdminsComponent,
    ],
    exports: [
        RouterModule,
        AgentsComponent,
        SupervisorsComponent,
        AdminsComponent,
    ],
    entryComponents: [
    ]
})
export class RosterModule {
}
