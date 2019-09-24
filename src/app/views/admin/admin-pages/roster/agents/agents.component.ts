import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Getagents } from './../../../../../core/admin/roster/agents/_models/getagents';
import { AgentrosterService } from './../../../../../core/admin/roster/agents/_services/agentroster.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {

  agentsRosterViewDataArray: Getagents[];
  animal: string;
  name: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'Name', 'Unix ID', 'Role', 'Supervisor', 'Team',
    'Home Pod', 'Proficiency', 'Payroll Type', 'Shift', 'Location',
    'Work Center', 'Therapeutic Area', 'Settings'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  constructor(
    private agentsRosterService: AgentrosterService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.viewAgentRoster();
  }

  viewAgentRoster(): void {
    console.log('In viewAgentRoster method in component');
    this.agentsRosterService.callGetAgentsRoster().subscribe(resp => {
      console.log('response status is ' + resp.body.status + resp.body.statusCode);
      if (resp.body.status.localeCompare('Success') === 0) {
        console.log('Fetch data success');
        this.agentsRosterViewDataArray = resp.body.data;
        console.log('data has ' + JSON.stringify(this.agentsRosterViewDataArray));
        this.dataSource = new MatTableDataSource(this.agentsRosterViewDataArray);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  addAgent() {
    console.log('You are in Add Agent Screen');
    // const dialogRef = this.dialog.open(AddAgent, {
    //   width: '60%',
    //   data: {name: this.name}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('You are in Closing Add Agent Role');
    //   this.animal = result;
    // });
  }

  editAgent(item) {

  }

  onDelete(item) {

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
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

}

// @Component({
//   selector: 'add-agent',
//   templateUrl: 'add-agents.html',
//   styleUrls: ['add-agents.component.scss']
// })

// export class AddAgent implements OnInit {

//   agentValidations: FormGroup;
//   selected = 'all';
//   errormessage: string;

//   constructor(
//     public dialogRef: MatDialogRef<AgentsComponent>,
//     private formBuilder: FormBuilder,
//     private router: Router,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }


//   ngOnInit() {
//     this.agentValidations = this.formBuilder.group({
//       firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
//       lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
//       unixId: ['',[Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]]
//     });
//   }

//   onAddAgent() {
//     console.log('You are in closing of adding an agent');
//   }

//   onSubmit(inputs) {
//     if (this.agentValidations.valid) {
//       console.log('Valid Details:::');
//     } else {
//       console.log('Enter Valid Details:::');
//       this.dialogRef.disableClose;
//     }
//   }

// }
