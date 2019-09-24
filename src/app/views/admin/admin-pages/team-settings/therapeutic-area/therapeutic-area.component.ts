import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { TaService } from 'src/app/core/admin/team-settings/therapeutic-area/_services/ta.service';
import { Getta } from 'src/app/core/admin/team-settings/therapeutic-area/_models/getta';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DialogData, AgentRoleComponent } from '../agent-role/agent-role.component';
import { Router } from '@angular/router';
import { Addta } from 'src/app/core/admin/team-settings/therapeutic-area/_models/addta';
import { delay } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { WorkcenterByTaService } from 'src/app/core/admin/team-settings/ta/_services/workcenter-by-ta.service';
import { WorkcenterByTa } from 'src/app/core/admin/team-settings/ta/_models/workcenter-by-ta';
import { Addworkcenter } from 'src/app/core/admin/team-settings/work-center/_models/addworkcenter';
import { Getagentrole } from 'src/app/core/admin/team-settings/agent-role/_models/getagentrole';
import { Addworkcenterresponse } from 'src/app/core/admin/team-settings/work-center/_models/addworkcenterresponse';
import { AgentroleService } from 'src/app/core/admin/team-settings/agent-role/_services/agentrole.service';
import { WorkcenterService } from 'src/app/core/admin/team-settings/work-center/_services/workcenter.service';
import { Getworkcenter } from 'src/app/core/admin/team-settings/work-center/_models/getworkcenter';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-therapeutic-area',
  templateUrl: './therapeutic-area.component.html',
  styleUrls: ['./therapeutic-area.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TherapeuticAreaComponent implements OnInit {


  name: string;
  animal: string;
  taViewDataArray: Getta[];
  workcenterByTaDataArray: WorkcenterByTa[];
  workcenterDataArray: Getworkcenter[];
  icon: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('workcenterpaginator', { read: MatPaginator, static: true }) workcenterpaginator: MatPaginator;
  columnsToDisplay: string[] = ['Arrow', 'Therapeutic Area', 'Count', 'Settings'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  expandedElement: Getta | null;
  close?: boolean;

  displayedColumns: string[] = ['workcenter', 'AgentRole', 'UnitOfWork', 'tagetUtilization',
    'targetAttendance', 'shiftLength', 'pods', 'thresholdOT', 'Settings'];
  workcenterdataSource = new MatTableDataSource();

  constructor(
    private taService: TaService,
    private workcenterByTaService: WorkcenterByTaService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('In ngOnint method of TAComponent');
    // this.viewTherapeutic();
    this.viewWorkcenterByTa();
    // this.getElement();
  }


  icons() {
    this.icon = !this.icon;
  }

  getElement(element): Getworkcenter[] {
    this.workcenterdataSource = null;
    console.log('datasource has ' + JSON.stringify(this.workcenterdataSource));
    console.log('Received Element is ::: ' + element);
    // console.log('Data is ' + element.taname + element.workcenters[0].workCenterName);
    if (element.workcenters.length > 0) {
      console.log('it has workcenters');
      this.workcenterDataArray = element.workcenters;
      this.workcenterdataSource = new MatTableDataSource(this.workcenterDataArray);
      this.workcenterdataSource.paginator = this.workcenterpaginator;
    }
    return this.workcenterDataArray;
  }

  viewWorkcenterByTa(): void {
    console.log('In viewWorkcenterByTa method in component');
    this.workcenterByTaService.callGetTaWorkcenterCount().subscribe(resp => {
      console.log('response is ' + resp.body.status + resp.body.statusCode);
      if (resp.body.statusCode === 200) {
        console.log('Fetch workcenterByTa is success');
        console.log('data has ' + resp.body.data[0].taname + ' ' + resp.body.data[0].workcenterCount);
        this.workcenterByTaDataArray = resp.body.data;
        this.dataSource = new MatTableDataSource(this.workcenterByTaDataArray);
        this.dataSource.paginator = this.paginator;
      }
    });
  }


  viewTherapeutic(): void {
    console.log('In viewTherapeutic method in component');
    this.taService.callGetTaConfig().subscribe(resp => {
      console.log('response status is ' + resp.body.status + ' ' + resp.body.statusCode);
      if (resp.body.status.localeCompare('Success') === 0) {
        console.log('Fetch TA success');
        this.taViewDataArray = resp.body.data;
        this.dataSource = new MatTableDataSource(this.taViewDataArray);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(filterValue: string) {
    console.log('Received value is ::: ' + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh() {
    this.dataSource = new MatTableDataSource<WorkcenterByTa>(this.workcenterByTaDataArray);
    this.dataSource.paginator = this.paginator;
    this.changeDetectorRefs.detectChanges();
  }

  addTherapeutic(taViewDataArray): void {
    console.log('In Add Therapeutic method');
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(AddTherapeuticArea, {
      data: taViewDataArray
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('You are in Closing Add Agent Role');
      // this.refresh();
      this.viewWorkcenterByTa();
    });
  }

  editTherapeutic(item): void {
    console.log('You are in Edit Therapeutic method');
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(EditTherapeuticArea, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('You are in Closing Add Agent Role');
      this.getElement(item);
      this.viewWorkcenterByTa();
    });
  }

  deleteTherapeutic(item): void {
    console.log('You are in Delete Therapeutic method');
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(DeleteTherapeuticArea, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('You are in Closing Add Agent Role');
      this.animal = result;
      this.viewWorkcenterByTa();
    });
  }

  refreshWC() {
    this.workcenterdataSource = new MatTableDataSource<Getworkcenter>(this.workcenterDataArray);
    this.workcenterdataSource.paginator = this.workcenterpaginator;
    this.changeDetectorRefs.detectChanges();
  }

  addWorkCenter(element): void {
    console.log('In addWorkCenter method in component');
    console.log('element data has ' + JSON.stringify(element));
    const dialogRef = this.dialog.open(AddWorkCenter, {
      width: '350px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('You are in Closing Add Agent Role');
      this.animal = result;
      // this.refreshWC();
      if (result.localeCompare('submit') === 0) {
        this.viewWorkcenterByTa();
      }
    });
  }

  editWorkCenter(item): void {
    console.log('You are in Edit WC' + JSON.stringify(item));
    const dialogRef = this.dialog.open(EditWorkCenter, {
      width: '1000px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('You are in Closing Add Agent Role');
      this.animal = result;
      if (result.localeCompare('submit') === 0) {
        this.viewWorkcenterByTa();
      }
    });
  }

  deleteWorkCenter(item): void {
    console.log('You are in Delete WC');
    const dialogRef = this.dialog.open(DeleteWorkCenter, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('You are in Closing Add Agent Role');
      this.animal = result;
      if (result.localeCompare('submit') === 0) {
        this.viewWorkcenterByTa();
      }
    });
  }
}

@Component({
  selector: 'app-add-therapeutic',
  templateUrl: './add-therapeutic.html',
})
// tslint:disable-next-line: component-class-suffix
export class AddTherapeuticArea implements OnInit {

  userAddressValidations: FormGroup;
  addTaData: Addta;
  addTaDataArray: Addta[];
  addTaDataPush: WorkcenterByTa;
  addWorkcenter: Getworkcenter[];
  localData: any;
  errormessage: string;

  constructor(
    private taService: TaService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<TherapeuticAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.localData = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.userAddressValidations = this.formBuilder.group({
      TA: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      // Description: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
    });
  }

  onSubmit(inputs) {
    if (this.userAddressValidations.valid) {
      console.log('In addNew method in component');
      console.log('entered values are ' + inputs.value.TA + inputs.value.Description);
      this.addTaData = new Addta(null, inputs.value.TA, inputs.value.Description, null, null);
      this.addTaDataArray = new Array(1);
      this.addTaDataArray[0] = this.addTaData;
      this.taService.callPostTaConfig(this.addTaDataArray).subscribe(resp => {
        console.log('response status is ' + resp.status + ' ' + resp.statusCode);
        if (resp.status.localeCompare('Success') === 0) {
          console.log('added new Ta');
          if (resp.data.length > 0) {
            const taID: number = resp.data[0];
            this.addWorkcenter = new Array(0);
            this.addTaDataPush = new WorkcenterByTa(taID, inputs.value.TA, 0, this.addWorkcenter);
            this.localData.push(this.addTaDataPush);
            this.dialogRef.close();
          } else {
            console.log('already existing');
            this.errormessage = 'Already existing record';
          }
        }
      });
    } else {
      console.log('Please Enter Valid Data');
      // tslint:disable-next-line: no-unused-expression
      this.dialogRef.disableClose;
    }
  }
}

@Component({
  selector: 'app-edit-therapeutic',
  templateUrl: './edit-therapeutic.html',
})
// tslint:disable-next-line: component-class-suffix
export class EditTherapeuticArea implements OnInit {

  userAddressValidations: FormGroup;
  editTaData: Addta;
  editTaDataArray: Addta[];
  localData: any;
  errormessage: string;

  constructor(
    private taService: TaService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AgentRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log('In edittherapeutic dialog ' + JSON.stringify(data));
    this.localData = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.userAddressValidations = this.formBuilder.group({
      TA: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      //Description: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
    });
  }

  onSubmit(inputs) {
    if (this.userAddressValidations.valid) {
      console.log('In edit method in component');
      console.log('selected values are ' + this.localData.taid + this.localData.taname + this.localData.description);
      this.editTaData = new Addta(this.localData.taid, this.localData.taname, this.localData.description, null, null);
      this.editTaDataArray = new Array(1);
      this.editTaDataArray[0] = this.editTaData;
      this.taService.callPostTaConfig(this.editTaDataArray).subscribe(resp => {
        console.log('response status is ' + resp.status + ' ' + resp.statusCode);
        if (resp.status.localeCompare('Success') === 0) {
          console.log('updated Ta');
          if (resp.data.length > 0) {
            const taID: number = resp.data[0];
            console.log('updated ' + taID);
            this.errormessage = 'successfully edited';
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
      // tslint:disable-next-line: no-unused-expression
      this.dialogRef.disableClose;
    }
  }
}

@Component({
  selector: 'app-delete-therapeutic',
  templateUrl: './delete-therapeutic.html',
})
// tslint:disable-next-line: component-class-suffix
export class DeleteTherapeuticArea implements OnInit {

  userAddressValidations: FormGroup;
  localData: any;
  referenceMessage: string;
  message: string;

  constructor(
    private taService: TaService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<TherapeuticAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.localData = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  deleteTa(): void {
    console.log('In deleteAgentTa method');
    console.log('values being deleted are ' + this.localData.taid + ' ' + this.localData.taname);
    this.taService.callDeleteAssignmentsConfig(this.localData.taid).subscribe(resp => {
      console.log('response is ' + resp.status + resp.statusCode + JSON.stringify(resp.data));
      if (resp.status.localeCompare('Success') === 0) {
        console.log('isDeleted ' + resp.isDeleted);
        if (!resp.isDeleted) {
          if (resp.data != null) {
            this.referenceMessage = 'Cannot be deleted because it has ';
            for (let i = 0; i < resp.data.length; i++) {
              console.log('references are ' + i + ' ' + resp.data[i].modelName + ' ' + resp.data[i].count);
              if (resp.data[i].count > 0) {
                this.message = resp.data[i].count + ' ' + resp.data[i].modelName + 's';
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

@Component({
  selector: 'app-add-work-center',
  templateUrl: './add-work-center.html',
})
// tslint:disable-next-line: component-class-suffix
export class AddWorkCenter implements OnInit {

  userAddressValidations: FormGroup;
  // agentRole = 'Reimbursement Specialist';
  // selected1 = 'all';

  taData: Getta;
  taNames: string[];
  taDataArray: Getta[];

  agentRoleViewData: Getagentrole;
  agentRoleViewDataArray: Getagentrole[];

  addWorkcenterData: Addworkcenter;
  addWorkcenterDataPush: Addworkcenter;
  addWorkcenterDataArray: Addworkcenter[];
  addWorkcenterResponse: Addworkcenterresponse;
  localData: any;

  unitOfWork: string;
  utilization: string;
  attendance: string;
  shiftlength: string;
  threshold: string;
  agentRoleId: number;
  errormessage: string;

  constructor(
    private workcenterService: WorkcenterService,
    private taService: TaService,
    private agentRoleService: AgentroleService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<TherapeuticAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.localData = data;
    console.log('You are in Add WorkCenter' + this.localData);
    console.log('DAta is :: ' + JSON.stringify(this.localData));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getTaData();
    this.getAgentRoleData();
    this.userAddressValidations = this.formBuilder.group({
      agentrole: [''],
      unitofwork: [''],
      utilization: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{0,1}[%]?$|^100[%]?$')]],
      attendance: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{0,1}[%]?$|^100[%]?$')]],
      shiftlength: [''],
      threshold: ['']
      // lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
    });
  }

  getTaData(): void {
    console.log('In getTaData method in workcenter component');
    this.taService.callGetTaConfig().subscribe(resp => {
      console.log('fetching data from ta service');
      console.log('response is ' + resp.body.status);
      if (resp.body.status.localeCompare('Success') === 0) {
        console.log('fetch ta data success');
        this.taDataArray = resp.body.data;
      }
    });
  }

  getAgentRoleData(): void {
    console.log('In viewAgentRole of agentRole component');
    this.agentRoleService.callGetAgentRoleConfig().subscribe(resp => {
      console.log('response status is ' + resp.body.status + resp.body.statusCode);
      if (resp.body.status.localeCompare('Success') === 0) {
        console.log('Fetch data success');
        this.agentRoleViewDataArray = resp.body.data;
      }
    });
  }

  onSubmit(input) {
    if (this.userAddressValidations.valid) {
      console.log('I am in addNewWorkcenter method in component');
      console.log('Entered values are ' + input.value.unitofwork + ' ' + this.localData.taid + this.localData.taname
        + ' ' + input.value.agentrole.agentRole);
      this.addWorkcenterData = new Addworkcenter(
        null,
        this.localData.taid,
        input.value.agentrole.agentRoleId,
        null,
        input.value.unitofwork,
        this.localData.taname,
        input.value.agentrole.agentRole,
        input.value.utilization,
        input.value.attendance,
        input.value.shiftlength,
        input.value.threshold,
        null, null
      );
      this.addWorkcenterDataArray = new Array(1);
      this.addWorkcenterDataArray[0] = this.addWorkcenterData;
      this.workcenterService.callPostWorkcenterConfig(this.addWorkcenterDataArray).subscribe(resp => {
        console.log('response status is ' + resp.status + ' ' + resp.statusCode);
        if (resp.status.localeCompare('Success') === 0) {
          console.log('added new workcenter');
          if (resp.data.length > 0) {
            const workcenterID: number = resp.data[0];
            this.addWorkcenterDataPush = new Addworkcenter(
              workcenterID,
              this.localData.taid,
              input.value.agentrole.agentRoleId,
              this.localData.taname + '_' + input.value.agentrole.agentRole,
              input.value.unitofwork,
              this.localData.taname,
              input.value.agentrole.agentRole,
              input.value.utilization,
              input.value.attendance,
              input.value.shiftlength,
              input.value.threshold,
              null, null);
            this.localData.workcenters.push(this.addWorkcenterDataPush);
            this.dialogRef.close('submit');
          } else {
            console.log('already existing');
            this.errormessage = 'Already existing record';
          }
        }
      });
    } else {
      console.log('Please Enter Valid Data');
      // tslint:disable-next-line: no-unused-expression
      this.dialogRef.disableClose;
    }
  }
}

export interface tableData {
  PODID: number;
  targetProductionRate: string;
}

const editData: tableData[] = [
  {
    PODID: 1,
    targetProductionRate: '9.00'
  }
];

@Component({
  selector: 'app-edit-work-center',
  templateUrl: './edit-work-center.html',
  styleUrls: ['./edit-work-center.component.scss']
})
export class EditWorkCenter implements OnInit {

  userAddressValidations: FormGroup;
  selected = "Reimbursement Specialist";
  selected1 = "all";

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['POD ID', 'Target production Rate', 'Actions'];
  dataset = Object.assign(editData);
  dataSource = new MatTableDataSource<tableData>(editData);
  selection = new SelectionModel<tableData>(true, []);

  agentRoleViewData: Getagentrole;
  agentRoleViewDataArray: Getagentrole[];

  addWorkcenterData: Addworkcenter;
  addWorkcenterDataPush: Addworkcenter;
  addWorkcenterDataArray: Addworkcenter[];
  addWorkcenterResponse: Addworkcenterresponse;
  localData: any;

  unitOfWork: string;
  utilization: string;
  attendance: string;
  shiftlength: string;
  threshold: string;
  agentRoleId: number;
  errormessage: string;
  bufferValue: 50;
  agentRoleDataArray: any[];
  PODID: string;
  targetProductionRate: number;

  podLength: number;

  constructor(
    private workcenterService: WorkcenterService,
    private taService: TaService,
    private agentRoleService: AgentroleService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<TherapeuticAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.localData = data;
    console.log('Data is ' + this.localData.agentRoleName);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.podLength = 1;
    this.getAgentRoleData();
    this.userAddressValidations = this.formBuilder.group({
      agentrole: new FormControl({ value: '', disabled: true }, Validators.required),
      unitofwork: [''],
      utilization: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{0,1}[%]?$|^100[%]?$')]],
      attendance: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{0,1}[%]?$|^100[%]?$')]],
      // attendance: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      shiftlength: [''],
      threshold: [''],
      targetPR: ['']
    });
  }

  getAgentRoleData(): void {
    console.log('In viewAgentRole of agentRole component');
    this.agentRoleService.callGetAgentRoleConfig().subscribe(resp => {
      console.log('response status is ' + resp.body.status + resp.body.statusCode);
      if (resp.body.status.localeCompare('Success') === 0) {
        console.log('Fetch data success');
        this.agentRoleViewDataArray = resp.body.data;
      }
    });
  }

  onSubmit(input) {
    if (this.userAddressValidations.valid) {
      console.log('Value is ::: ' + this.bufferValue);
      console.log('I am in addNewWorkcenter method in component');
      console.log('Entered values are ' + this.localData.unitofWork + ' ' + this.localData.taId + this.localData.taName
        + ' ' + this.localData.agentRoleName.agentRole);
      this.addWorkcenterData = new Addworkcenter(
        this.localData.workCenterId,
        this.localData.taId,
        this.localData.agentroleId,
        this.localData.workCenterName,
        this.localData.unitofWork,
        this.localData.taName,
        this.localData.agentRoleName.agentRole,
        this.localData.targetUtilization,
        this.localData.targetAttendance,
        this.localData.shiftLength,
        this.localData.thresholdOT,
        null, null
      );
      this.addWorkcenterDataArray = new Array(1);
      this.addWorkcenterDataArray[0] = this.addWorkcenterData;
      this.workcenterService.callPostWorkcenterConfig(this.addWorkcenterDataArray).subscribe(resp => {
        console.log('response status is ' + resp.status + ' ' + resp.statusCode);
        if (resp.status.localeCompare('Success') === 0) {
          console.log('added new workcenter');
          if (resp.data.length > 0) {
            const workcenterID: number = resp.data[0];
            this.dialogRef.close('submit');
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

  addElement() {
    const length = editData.length;
    let newPODID = editData[length - 1].PODID;
    newPODID = newPODID + 1;
    console.log('newPodid is ' + newPODID);
    editData.push({ PODID: newPODID, targetProductionRate: '9.00' });
    this.dataSource = new MatTableDataSource(editData);
    this.dataSource.paginator = this.paginator;
    this.podLength = editData.length;
    console.log('paginator length' + editData.length);
    console.log('new pod added');
    this.dialogRef.disableClose;
    console.log('stopping dialog ref to close');
  }

  deleteElement(item) {
    console.log('You are in Delete POD ' + JSON.stringify(item));
    // this.selection.selected.forEach(element => {
    // console.log('element has ' + JSON.stringify(element));
    // console.log('dataset has ' + JSON.stringify(this.dataset));
    const index: number = this.dataset.findIndex(d => d === item);
    if (index !== 0) {
      console.log(this.dataset.findIndex(d => d === item));
      this.dataset.splice(index, 1);
      this.podLength = editData.length;
      this.dataSource = new MatTableDataSource<tableData>(editData);
      this.dataSource.paginator = this.paginator;
    } else if (index === 0) {
      this.podLength = editData.length + 1;
    }
    // });
    // this.selection = new SelectionModel<tableData>(true, []);
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
  checkboxLabel(row?: tableData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.PODID + 1}`;
  }

  applyFilter(filterValue: string) {
    console.log('Received value is ::: ' + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

@Component({
  selector: 'app-delete-work-center',
  templateUrl: './delete-work-center.html',
})
export class DeleteWorkCenter implements OnInit {

  userAddressValidations: FormGroup;
  localData: any;
  referenceMessage: string;
  message: string;

  constructor(
    private workcenterService: WorkcenterService,
    public dialogRef: MatDialogRef<TherapeuticAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.localData = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  deleteWorkcenter(): void {
    console.log('In delete workcenter method in component');
    console.log('values being deleted are ' + this.localData.workCenterId + ' ' + this.localData.workCenterName + ' '
      + this.localData.agentRoleName);
    this.workcenterService.callDeleteWorkcenterConfig(this.localData.workCenterId).subscribe(resp => {
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
          this.dialogRef.close('submit');
        }
      }
    });
  }

}
