import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Getagents } from 'src/app/core/admin/roster/agents/_models/getagents';
import { MatPaginator, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AgentrosterService } from 'src/app/core/admin/roster/agents/_services/agentroster.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';
import { Getsupervisor } from 'src/app/core/admin/roster/supervisor/_models/getsupervisor';
import { SupervisorrosterService } from 'src/app/core/admin/roster/supervisor/_services/supervisorroster.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {

  agentsRosterViewDataArray: Getagents[];
  supervisorViewDataArray: Getsupervisor[];
  animal: string;
  name: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'Name', 'Unix ID', 'Role', 'Supervisor', 'Team',
    'Home Pod', 'Proficiency', 'Payroll Type', 'Shift', 'Location',
    'Work Center', 'Therapeutic Area', 'Settings'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  @ViewChild('supervisorpaginator', { static: true }) supervisorpaginator: MatPaginator;
  supervisordisplayedColumns: string[] = ['select', 'Name', 'Unix ID', 'Team', 'Therapeutic Area', 'Location',
    'Rotation', 'Role', 'Settings'];
  supervisordataSource = new MatTableDataSource();
  supervisorselection = new SelectionModel(true, []);

  constructor(
    private agentsRosterService: AgentrosterService,
    private supervisorRosterService: SupervisorrosterService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.viewAgentRoster();
    this.viewSupervisorRoster();
  }

  viewAgentRoster(): void {
    console.log('In viewAgentRoster method in component');
    this.agentsRosterService.callGetAgentsRoster().subscribe(resp => {
      console.log('response status is ' + resp.body.status + resp.body.statusCode);
      if (resp.body.status.localeCompare('Success') === 0) {
        console.log('Fetch data success');
        this.agentsRosterViewDataArray = resp.body.data;
        // console.log('data has ' + JSON.stringify(this.agentsRosterViewDataArray));
        this.dataSource = new MatTableDataSource(this.agentsRosterViewDataArray);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  addAgent() {
    console.log('You are in Add Agent Screen');
    const dialogRef = this.dialog.open(AddAgent, {
      width: '60%',
      data: { name: this.name }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('You are in Closing Add Agent Role');
    //   this.animal = result;
    // });
  }

  editAgent(item) {
    const dialogRef = this.dialog.open(EditAgent,{
        width: '60%',
        data: item
      });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('You are in Closing Edit Agent Roster');
    //   this.animal = result;
    // });
  }

  onDelete(item) {
    console.log('You are in Delete Agent');
    const dialogRef = this.dialog.open(DeleteAgent, {
      data: item
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('You are in Closing Add Agent Role');
    //   this.animal = result;
    // });
  }

  BulkEdit() {
    console.log('You are in Bulk Edit Agent');
    const dialogRef = this.dialog.open(BulkEditAgent, {
      data: { name: this.name }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('You are in Closing Add Agent Role');
    //   this.animal = result;
    // });
  }

  UpdateEvent() {
    console.log('You are in Update event');
    const dialogref = this.dialog.open(UpdateEventAgent, {
      data: { name: this.name }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('You are in Closing Add Agent Role');
    //   this.animal = result;
    // });
  }

  // Agents Data Table Properties Start
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Getagents): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.agentRoleName + 1}`;
  }

  applyFilter(filterValue: string) {
    console.log('Received value is ::: ' + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // Agents Data Table Properties End

  viewSupervisorRoster(): void {
    console.log('In viewSupervisorRoster method in the component');
    this.supervisorRosterService.callGetSupervisorRoster().subscribe(resp => {
      console.log('Fetch data success');
      this.supervisorViewDataArray = resp.body.data;
      // console.log('data has ' + JSON.stringify(this.supervisorViewDataArray));
      this.supervisordataSource = new MatTableDataSource(this.supervisorViewDataArray);
      this.supervisordataSource.paginator = this.supervisorpaginator;
    });
  }

  // Supervisors Properties Start
  isAllSupSelected() {
    const numSelected = this.supervisorselection.selected.length;
    const numRows = this.supervisordataSource.data.length;
    return numSelected === numRows;
  }

  masterToggleSup() {
    this.isAllSupSelected() ?
      this.supervisorselection.clear() :
      this.supervisordataSource.data.forEach(row => this.supervisorselection.select(row));
  }

  applyfilter(filterValue: string) {
    console.log('Received value is ::: ' + filterValue);
    this.supervisordataSource.filter = filterValue.trim().toLowerCase();
  }
  // Supervisors Properties End

  addSupervisor() {
    console.log('You are in Add Supervisor');
    const dialogRef = this.dialog.open(AddSupervisor, {
      width: '60%',
      data: { name: this.name }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('You are in Closing Add Agent Role');
    //   this.animal = result;
    // });
  }
}

@Component({
  selector: 'add-agent',
  templateUrl: 'add-agents.html',
  styleUrls: ['add-agents.component.scss']
})
export class AddAgent implements OnInit {

  agentValidations: FormGroup;
  selected = 'all';
  errormessage: string;

  constructor(
    public dialogRef: MatDialogRef<RosterComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    this.agentValidations = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      unixId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]+')]]
    });
  }

  onAddAgent() {
    console.log('You are in closing of adding an agent');
  }

  onSubmit(inputs) {
    if (this.agentValidations.valid) {
      console.log('Valid Details:::');
    } else {
      console.log('Enter Valid Details:::');
      this.dialogRef.disableClose;
    }
  }

}

@Component({
  selector: 'edit-agent',
  templateUrl: 'edit-agents.html',
  styleUrls: ['add-agents.component.scss']
})

export class EditAgent implements OnInit {

  agentValidations: FormGroup;
  selected = 'all';
  errormessage: string;
  localData: any;

  constructor(
    public dialogRef: MatDialogRef<RosterComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.localData = data;
    console.log('data in local data ' + this.localData);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    this.agentValidations = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      unixId: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]+')]]
    });
  }


  OnSubmit(inputs) {
    if (this.agentValidations.valid) {
      console.log('You are in OnSubmit method of Edit Agent roster ');
    } else {
      console.log('Enter valid details');
      this.dialogRef.disableClose;
    }
  }

}

@Component({
  selector: 'bulk-edit-agents',
  templateUrl: 'bulk-edit-agents.html',
  styleUrls: ['add-agents.component.scss']
})
export class BulkEditAgent implements OnInit {

  agentValidations: FormGroup;
  local_data: any;
  selected = 'all';

  constructor(
    public dialogRef: MatDialogRef<RosterComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.local_data = data;
    console.log(this.local_data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }


  onSubmit(inputs) {
    if (this.agentValidations.valid) {
      console.log('Valid Details:::');
    } else {
      console.log('Enter Valid Details:::');
      this.dialogRef.disableClose;
    }
  }
}

@Component({
  selector: 'update-event-agents',
  templateUrl: 'update-event-agents.html'
})
export class UpdateEventAgent implements OnInit {

  agentValidations: FormGroup;
  local_data: any;
  selected = 'all';
  mytime = new Date();

  constructor(
    public dialogRef: MatDialogRef<RosterComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.local_data = data;
    console.log(this.local_data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }


  onSubmit(inputs) {
    if (this.agentValidations.valid) {
      console.log('Valid Details:::');
    } else {
      console.log('Enter Valid Details:::');
      this.dialogRef.disableClose;
    }
  }

}

@Component({
  selector: 'app-delete-agents',
  templateUrl: './delete-agents.html',
})
export class DeleteAgent implements OnInit {

  userAddressValidations: FormGroup;
  localData: any;
  referenceMessage: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<RosterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.localData = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  deleteAgent() {
    console.log('You are in Delete Agent');
  }

}

@Component({
  selector: 'add-supervisor',
  templateUrl: 'add-supervisor.html',
  styleUrls: ['add-supervisor.component.scss']
})
export class AddSupervisor implements OnInit {

  agentValidations: FormGroup;
  selected = 'all';
  errormessage: string;

  constructor(
    public dialogRef: MatDialogRef<RosterComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
    this.agentValidations = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
      unixId: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]]
    });
  }

  onAddAgent() {
    console.log('You are in closing of adding an agent');
  }

  onSubmit(inputs) {
    if (this.agentValidations.valid) {
      console.log('Valid Details:::');
    } else {
      console.log('Enter Valid Details:::');
      this.dialogRef.disableClose;
    }
  }

}
