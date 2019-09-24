import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Getagentrole } from 'src/app/core/admin/team-settings/agent-role/_models/getagentrole';
import { AgentroleService } from 'src/app/core/admin/team-settings/agent-role/_services/agentrole.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Addagentrole } from 'src/app/core/admin/team-settings/agent-role/_models/addagentrole';
import { delay } from 'rxjs/operators';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-agent-role',
  templateUrl: './agent-role.component.html',
  styleUrls: ['./agent-role.component.css']
})
export class AgentRoleComponent implements OnInit {

  name: string;
  animal: string;
  agentRoleViewDataArray: Getagentrole[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [ 'select', 'Agent Role', 'Description', 'Settings'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  constructor(
    private agentRoleService: AgentroleService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log('In ngOnInit of AgentRoleComponent');
    this.viewAgentRole();
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
  checkboxLabel(row?: Getagentrole): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.agentRole + 1}`;
  }

  viewAgentRole(): void {
    console.log('In viewAgentRole of agentRole component');
    this.agentRoleService.callGetAgentRoleConfig().subscribe(resp => {
      console.log('response status is ' + resp.body.status + resp.body.statusCode);
      if (resp.body.status.localeCompare('Success') === 0) {
        console.log('Fetch data success');
        this.agentRoleViewDataArray = resp.body.data;
        this.dataSource = new MatTableDataSource(this.agentRoleViewDataArray);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  refresh() {
    this.dataSource = new MatTableDataSource<Getagentrole>(this.agentRoleViewDataArray);
    this.dataSource.paginator = this.paginator;
    this.changeDetectorRefs.detectChanges();
  }

  applyFilter(filterValue: string) {
    console.log('Received value is ::: ' + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addAgentRole(agentRoleViewDataArray): void {
    console.log('In addAgentRole method in component');
    const dialogRef = this.dialog.open(AddAgentRole, {
      data: agentRoleViewDataArray
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('You are in Closing Add Agent Role');
      // this.refresh();
      this.viewAgentRole();
    });
  }

  editRole(item): void {
    console.log('You are in Edit Agent Role ');
    const dialogRef = this.dialog.open(EditAgentRole, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('You are in Closing Add Agent Role');
      this.animal = result;
      this.viewAgentRole();
    });
  }

  deleteRole(item): void {
    console.log('You are in Delete Agent Role');
    const dialogRef = this.dialog.open(DeleteAgentRole, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('You are in Closing Add Agent Role');
      this.animal = result;
      this.viewAgentRole();
    });
  }

}

@Component({
  selector: 'app-add-agent-role',
  templateUrl: './add-agent-role.html',
})
export class AddAgentRole implements OnInit {

  userAddressValidations: FormGroup;

  addAgentRoleData: Addagentrole;
  addAgentRoleDataPush: Addagentrole;
  addAgentRoleDataArray: Addagentrole[];
  localData: any;
  errormessage: string;

  constructor(
    private agentRoleService: AgentroleService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AgentRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.localData = data;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.userAddressValidations = this.formBuilder.group({
      Role: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      Description: ['', [Validators.required]],
    });
  }

  onSubmit(inputs) {
    if (this.userAddressValidations.valid) {
      console.log('In addNewAgentRole method in component');
      console.log('entered values are ' + inputs.value.Role + inputs.value.Description);
      this.addAgentRoleData = new Addagentrole(null, inputs.value.Role, inputs.value.Description);
      this.addAgentRoleDataArray = new Array(1);
      this.addAgentRoleDataArray[0] = this.addAgentRoleData;
      this.agentRoleService.callPostAgentRoleConfig(this.addAgentRoleDataArray).subscribe(resp => {
        console.log('response status is ' + resp.status + ' ' + resp.statusCode);
        if (resp.status.localeCompare('Success') === 0) {
         console.log('added new AgentRole');
         if (resp.data.length > 0) {
          const agentRoleId: number = resp.data[0];
          this.addAgentRoleDataPush = new Addagentrole(agentRoleId, inputs.value.Role, inputs.value.Description);
          this.localData.push(this.addAgentRoleDataPush);
          this.dialogRef.close();
        } else {
          console.log('already existing');
          this.errormessage = 'Already existing record';
        }
      }
      });
    } else {
      console.log('Please Enter Valid Data');
      this.dialogRef.disableClose;
    }
  }

}

@Component({
  selector: 'app-edit-agent-role',
  templateUrl: './edit-agent-role.html',
})
export class EditAgentRole implements OnInit {

  userAddressValidations: FormGroup;

  editAgentRoleData: Addagentrole;
  editAgentRoleDataArray: Addagentrole[];
  localData: any;
  localEdit: any;
  errormessage: string;

  constructor(
    private agentRoleService: AgentroleService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AgentRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.localData = data;
      this.localEdit = this.localData;
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.userAddressValidations = this.formBuilder.group({
      Role: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      Description: ['', [Validators.required]],
    });
  }

  onSubmit(inputs) {
    if (this.userAddressValidations.valid) {
      console.log('In addNewAgentRole method in component');
      console.log('entered values are ' + this.localData.agentRoleId + this.localData.agentRole + this.localData.description);
      this.editAgentRoleData = new Addagentrole(this.localData.agentRoleId, this.localData.agentRole, this.localData.description);
      this.editAgentRoleDataArray = new Array(1);
      this.editAgentRoleDataArray[0] = this.editAgentRoleData;
      this.agentRoleService.callPostAgentRoleConfig(this.editAgentRoleDataArray).subscribe(resp => {
        console.log('response status is ' + resp.status + ' ' + resp.statusCode);
        if (resp.status.localeCompare('Success') === 0) {
         console.log('added new AgentRole');
         if (resp.data.length > 0) {
          const agentRoleId: number = resp.data[0];
          console.log('updated ' + agentRoleId);
          this.errormessage = 'successfully edited';
          delay(10000);
          console.log('dialog closed');
          this.dialogRef.close();
        } else {
          console.log('already existing');
          this.errormessage = 'Something went wrong, Try again';
        }
      }
      });
    } else {
      console.log('Please Enter Valid Data');
      this.dialogRef.disableClose;
    }
  }
}

@Component({
  selector: 'app-delete-agent-role',
  templateUrl: './delete-agent-role.html',
})
export class DeleteAgentRole implements OnInit {

  userAddressValidations: FormGroup;
  localData: any;
  referenceMessage: string;
  message: string;

  constructor(
    private agentRoleService: AgentroleService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AgentRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.localData = data;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  deleteAgentRole(): void {
    console.log('In deleteAgentRole method');
    console.log('values being deleted are ' + this.localData.agentRoleId + ' ' + this.localData.agentRole + ' '
    + this.localData.description);
    this.agentRoleService.callDeleteAgentRoleConfig(this.localData.agentRoleId).subscribe(resp => {
      console.log('response is ' + resp.status + resp.statusCode + JSON.stringify(resp.data));
      if (resp.status.localeCompare('Success') === 0) {
        console.log('isDeleted ' + resp.isDeleted);
        if (!resp.isDeleted) {
          if (resp.data != null) {
            this.referenceMessage = 'Cannot be deleted because it has ';
            for (let i = 0; i < resp.data.length; i++) {
              console.log('references are ' + i + ' ' + resp.data[i].modelName + ' ' + resp.data[i].count);
              if (resp.data[i].count > 0) {
                this.message = resp.data[i].count + ' references in ' + resp.data[i].modelName;
              }
            }
            this.referenceMessage = this.referenceMessage + this.message;
          } else {
            console.log('deletedStatus is ' + resp.deletedStatus);
            this.referenceMessage = resp.deletedStatus;
          }
        } else {
          console.log('deleted ID is ' + resp.deletedStatus);
          // this.referenceMessage = resp.deletedStatus;
          this.dialogRef.close();
        }
      }
    });
  }

}
