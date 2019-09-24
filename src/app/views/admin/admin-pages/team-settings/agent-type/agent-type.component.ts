import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Getagenttype } from 'src/app/core/admin/team-settings/agent-type/_models/getagenttype';
import { AgenttypeService } from 'src/app/core/admin/team-settings/agent-type/_services/agenttype.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogData } from '../agent-role/agent-role.component';
import { Addagenttype } from 'src/app/core/admin/team-settings/agent-type/_models/addagenttype';
import { delay } from 'rxjs/operators';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-agent-type',
  templateUrl: './agent-type.component.html',
  styleUrls: ['./agent-type.component.css']
})
export class AgentTypeComponent implements OnInit {

  agentTypeViewDataArray: Getagenttype[];
  animal: string;
  name: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'Agent Type', 'Description', 'Settings'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  constructor(
    private agentTypeService: AgenttypeService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.viewAgentType();
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
  checkboxLabel(row?: Getagenttype): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.agentType + 1}`;
  }

  viewAgentType(): void {
    console.log('In viewAgentType method in component');
    this.agentTypeService.callGetAgentTypeConfig().subscribe(resp => {
      console.log('response status is ' + resp.body.status + resp.body.statusCode);
      if (resp.body.status.localeCompare('Success') === 0) {
        console.log('Fetch data success');
        this.agentTypeViewDataArray = resp.body.data;
        this.dataSource = new MatTableDataSource(this.agentTypeViewDataArray);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(filterValue: string) {
    console.log('Received value is ::: ' + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh() {
    this.dataSource = new MatTableDataSource<Getagenttype>(this.agentTypeViewDataArray);
    this.dataSource.paginator = this.paginator;
    this.changeDetectorRefs.detectChanges();
  }

  addAgentType(agentTypeViewDataArray): void {
    console.log('In addAgentType method in component');
    const dialogRef = this.dialog.open(AddAgentType, {
      data: agentTypeViewDataArray
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('You are in Closing Add Agent Role');
      // this.refresh();
      this.viewAgentType();
    });
  }

  editAgentType(item): void {
    console.log('You are in Edit Agent Type');
    const dialogRef = this.dialog.open(EditAgentType, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('You are in Closing Add Agent Role');
      this.animal = result;
      this.viewAgentType();
    });
  }

  deletAgentType(item): void {
    console.log('You are in Delete Agent Type');
    const dialogRef = this.dialog.open(DeleteAgentType, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('You are in Closing Add Agent Role');
      this.animal = result;
      this.viewAgentType();
    });
  }

}

@Component({
  selector: 'app-add-agent-type',
  templateUrl: './add-agent-type.html',
})
export class AddAgentType implements OnInit {

  userAddressValidations: FormGroup;

  addAgentTypeData: Addagenttype;
  addAgentTypeDataPush: Addagenttype;
  addAgentTypeDataArray: Addagenttype[];
  localData: any;
  errormessage: string;

  constructor(
    private agentTypeService: AgenttypeService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AgentTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
      this.localData = data;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.userAddressValidations = this.formBuilder.group({
      Type: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      Description: ['', [Validators.required]],
      // Description: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
    });
  }

  onSubmit(inputs) {
    if (this.userAddressValidations.valid) {
      console.log('In addNewAgentRole method in component');
      console.log('entered values are ' + inputs.value.Type + inputs.value.Description);
      this.addAgentTypeData = new Addagenttype(null, inputs.value.Type, inputs.value.Description, null, null);
      this.addAgentTypeDataArray = new Array(1);
      this.addAgentTypeDataArray[0] = this.addAgentTypeData;
      this.agentTypeService.callPostAgentTypeConfig(this.addAgentTypeDataArray).subscribe(resp => {
        console.log('response status is ' + resp.status + ' ' + resp.statusCode);
        if (resp.status.localeCompare('Success') === 0) {
         console.log('added new AgentType');
         if (resp.data.length > 0) {
          const agentTypeId: number = resp.data[0];
          this.addAgentTypeDataPush = new Addagenttype(agentTypeId, inputs.value.Type, inputs.value.Description, null, null);
          this.localData.push(this.addAgentTypeDataPush);
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
  selector: 'app-edit-agent-type',
  templateUrl: './edit-agent-type.html',
})
export class EditAgentType implements OnInit {

  userAddressValidations: FormGroup;

  editAgentTypeData: Addagenttype;
  editAgentTypeDataArray: Addagenttype[];
  localData: any;
  errormessage: string;
  constructor(
    private agentTypeService: AgenttypeService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AgentTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.localData = data;
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.userAddressValidations = this.formBuilder.group({
      Type: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      Description: ['', [Validators.required]],
    });
  }

  onSubmit(userAddressValidations) {
    if (this.userAddressValidations.valid) {
      console.log('In addNewAgentRole method in component');
      console.log('entered values are ' + this.localData.agentTypeId + this.localData.agentType + this.localData.description);
      this.editAgentTypeData = new Addagenttype(this.localData.agentTypeId , this.localData.agentType ,
         this.localData.description, null, null);
      this.editAgentTypeDataArray = new Array(1);
      this.editAgentTypeDataArray[0] = this.editAgentTypeData;
      this.agentTypeService.callPostAgentTypeConfig(this.editAgentTypeDataArray).subscribe(resp => {
        console.log('response status is ' + resp.status + ' ' + resp.statusCode);
        if (resp.status.localeCompare('Success') === 0) {
         console.log('added new AgentType');
         if (resp.data.length > 0) {
          const agentTypeId: number = resp.data[0];
          console.log('updated ' + agentTypeId);
          this.errormessage = 'successfully edited';
          delay(10000);
          console.log('dialog closed');
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
  selector: 'app-delete-agent-type',
  templateUrl: './delete-agent-type.html',
})
export class DeleteAgentType implements OnInit {

  userAddressValidations: FormGroup;
  localData: any;
  referenceMessage: string;
  message: string;
  constructor(
    private agentTypeService: AgenttypeService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AgentTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.localData = data;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  deleteAgentType(): void {
    console.log('In deleteAgentRole method');
    console.log('values being deleted are ' + this.localData.agentTypeId + ' ' + this.localData.agentType + ' '
    + this.localData.description);
    this.agentTypeService.callDeleteAgentTypeConfig(this.localData.agentTypeId).subscribe(resp => {
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
          this.referenceMessage = resp.deletedStatus;
          this.dialogRef.close();
        }
      }
    });
  }

}
