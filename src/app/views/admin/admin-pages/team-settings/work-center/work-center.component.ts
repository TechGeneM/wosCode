import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { WorkcenterService } from 'src/app/core/admin/team-settings/work-center/_services/workcenter.service';
import { Getworkcenter } from 'src/app/core/admin/team-settings/work-center/_models/getworkcenter';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DialogData } from '../agent-role/agent-role.component';
import { Router } from '@angular/router';
import { Getta } from 'src/app/core/admin/team-settings/therapeutic-area/_models/getta';
import { Addworkcenterresponse } from 'src/app/core/admin/team-settings/work-center/_models/addworkcenterresponse';
import { TaService } from 'src/app/core/admin/team-settings/therapeutic-area/_services/ta.service';
import { AgentroleService } from 'src/app/core/admin/team-settings/agent-role/_services/agentrole.service';
import { Getagentrole } from 'src/app/core/admin/team-settings/agent-role/_models/getagentrole';
import { Addworkcenter } from 'src/app/core/admin/team-settings/work-center/_models/addworkcenter';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-work-center',
  templateUrl: './work-center.component.html',
  styleUrls: ['./work-center.component.css']
})
export class WorkCenterComponent implements OnInit {

  workcenterViewDataArray: Getworkcenter[];
  animal: string;
  name: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['workcenter', 'AgentRole', 'UnitOfWork', 'tagetUtilization',
    'targetAttendance', 'shiftLength', 'pods', 'thresholdOT', 'Settings'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  constructor(
    private workcenterService: WorkcenterService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.viewWorkCenter();
  }

  viewWorkCenter(): void {
    console.log('In viewWorkCenter method in component');
    this.workcenterService.callGetWorkcenterConfig().subscribe(resp => {
      console.log('response status is ' + resp.body.status + ' ' + resp.body.statusCode);
      if (resp.body.status.localeCompare('Success') === 0) {
        console.log('fetch workcenterdata success');
        this.workcenterViewDataArray = resp.body.data;
        this.dataSource = new MatTableDataSource(this.workcenterViewDataArray);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(filterValue: string) {
    // console.log('Received value is ::: ' + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  refresh() {
    this.dataSource = new MatTableDataSource<Getworkcenter>(this.workcenterViewDataArray);
    this.dataSource.paginator = this.paginator;
    this.changeDetectorRefs.detectChanges();
  }

  // addWorkCenter(workcenterViewDataArray): void {
  //   console.log('In addWorkCenter method in component');
  //   const dialogRef = this.dialog.open(AddWorkCenter, {
  //     width: '350px',
  //     data: workcenterViewDataArray
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('You are in Closing Add Agent Role');
  //     this.animal = result;
  //     this.refresh();
  //   });
  // }

  // editWorkCenter(item): void {
  //   console.log('You are in Edit WC');
  //   const dialogRef = this.dialog.open(EditWorkCenter, {
  //     data: item
  //   });

  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   console.log('You are in Closing Add Agent Role');
  //   //   this.animal = result;
  //   // });

  // }

  // deleteWorkCenter(item): void {
  //   console.log('You are in Delete WC');
  //   const dialogRef = this.dialog.open(DeleteWorkCenter, {
  //     data: item
  //   });

  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   console.log('You are in Closing Add Agent Role');
  //   //   this.animal = result;
  //   // });

  // }

}

// @Component({
//   selector: 'app-add-work-center',
//   templateUrl: './add-work-center.html',
// })
// // tslint:disable-next-line: component-class-suffix
// export class AddWorkCenter implements OnInit {

//   userAddressValidations: FormGroup;
//   // agentRole = 'Reimbursement Specialist';
//   // selected1 = 'all';

//   taData: Getta;
//   taNames: string[];
//   taDataArray: Getta[];

//   agentRoleViewData: Getagentrole;
//   agentRoleViewDataArray: Getagentrole[];

//   addWorkcenterData: Addworkcenter;
//   addWorkcenterDataPush: Addworkcenter;
//   addWorkcenterDataArray: Addworkcenter[];
//   addWorkcenterResponse: Addworkcenterresponse;
//   localData: any;

//   unitOfWork: string;
//   utilization: string;
//   attendance: string;
//   shiftlength: string;
//   threshold: string;
//   agentRoleId: number;
//   errormessage: string;

//   constructor(
//     private workcenterService: WorkcenterService,
//     private taService: TaService,
//     private agentRoleService: AgentroleService,
//     private formBuilder: FormBuilder,
//     private router: Router,
//     public dialogRef: MatDialogRef<WorkCenterComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {
//       this.localData = data;
//      }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   ngOnInit() {
//     this.getTaData();
//     this.getAgentRoleData();
//     this.userAddressValidations = this.formBuilder.group({
//       taname: [''],
//       agentrole: [''],
//       unitofwork: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
//       // lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
//     });
//   }

//   getTaData(): void {
//     console.log('In getTaData method in workcenter component');
//     this.taService.callGetTaConfig().subscribe(resp => {
//       console.log('fetching data from ta service');
//       console.log('response is ' + resp.body.status);
//       if (resp.body.status.localeCompare('Success') === 0) {
//         console.log('fetch ta data success');
//         this.taDataArray = resp.body.data;
//       }
//     });
//   }

//   getAgentRoleData(): void {
//     console.log('In viewAgentRole of agentRole component');
//     this.agentRoleService.callGetAgentRoleConfig().subscribe(resp => {
//       console.log('response status is ' + resp.body.status + resp.body.statusCode);
//       if (resp.body.status.localeCompare('Success') === 0) {
//         console.log('Fetch data success');
//         this.agentRoleViewDataArray = resp.body.data;
//       }
//     });
//   }

//   onSubmit(input) {
//     if (this.userAddressValidations.valid) {
//       console.log('I am in addNewWorkcenter method in component');
//       console.log('Entered values are ' + input.value.unitofwork + ' ' + input.value.taname.taId + input.value.taname.taName 
//       + ' ' + input.value.agentrole.agentRole);
//       this.addWorkcenterData = new Addworkcenter(
//         null,
//         input.value.taname.taId,
//         input.value.agentrole.agentRoleId,
//         null,
//         input.value.unitofwork,
//         input.value.taname.taName,
//         input.value.agentrole.agentRole,
//         null, null
//         );
//       this.addWorkcenterDataArray = new Array(1);
//       this.addWorkcenterDataArray[0] = this.addWorkcenterData;
//       this.workcenterService.callPostWorkcenterConfig(this.addWorkcenterDataArray).subscribe(resp => {
//         console.log('response status is ' + resp.status + ' ' + resp.statusCode);
//         if (resp.status.localeCompare('Success') === 0) {
//           console.log('added new Ta');
//           if (resp.data.length > 0) {
//            const workcenterID: number = resp.data[0];
//            this.addWorkcenterDataPush = new Addworkcenter(
//             workcenterID,
//             input.value.taname.taId,
//             input.value.agentrole.agentRoleId,
//             input.value.taname.taName + input.value.agentrole.agentRole,
//             input.value.unitofwork,
//             input.value.taname.taName,
//             input.value.agentrole.agentRole,
//             null, null);
//            this.localData.push(this.addWorkcenterDataPush);
//            this.dialogRef.close();
//           } else {
//             console.log('already existing');
//             this.errormessage = 'Already existing record';
//           }
//         }
//       });
//     } else {
//       console.log('Please Enter Valid Data');
//       // tslint:disable-next-line: no-unused-expression
//       this.dialogRef.disableClose;
//     }
//   }
// }

// export interface tableData {
//   PODID: number;
//   targetProductionRate: string;
// }

// const editData: tableData[] = [
//   {
//     PODID: 1,
//     targetProductionRate: '9:00 (ACT/Hr)'
//   },
//   {
//     PODID: 2,
//     targetProductionRate: '9:00 (ACT/Hr)'
//   },
//   {
//     PODID: 3,
//     targetProductionRate: '9:00 (ACT/Hr)'
//   }
// ];

// @Component({
//   selector: 'app-edit-work-center',
//   templateUrl: './edit-work-center.html',
//   styleUrls: ['./edit-work-center.component.scss']
// })
// export class EditWorkCenter implements OnInit {

//   userAddressValidations: FormGroup;
//   selected = "Reimbursement Specialist";
//   selected1 = "all";

//   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
//   displayedColumns: string[] = ['select', 'POD ID', 'Target production Rate', 'Actions'];
//   dataset = Object.assign(editData);
//   dataSource = new MatTableDataSource<tableData>(editData);
//   selection = new SelectionModel<tableData>(true, []);

//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     public dialogRef: MatDialogRef<WorkCenterComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   ngOnInit() {
//     this.userAddressValidations = this.formBuilder.group({
//       unitofwork: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
//       // lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
//     });
//     this.dataSource.paginator = this.paginator;
//   }

//   onSubmit(userAddressValidations) {
//     if (this.userAddressValidations.valid) {
//       this.dialogRef.close();
//     } else {
//       console.log('Please Enter Valid Data');
//       this.dialogRef.disableClose;
//     }
//   }

//   addElement() {
//     const length = editData.length;
//     let newPODID = editData[length - 1].PODID;
//     newPODID = newPODID + 1;
//     console.log('newPodid is ' + newPODID);
//     editData.push({ PODID: newPODID, targetProductionRate: '9:00 (ACT/Hr)' });
//     this.dataSource = new MatTableDataSource(editData);
//   }

//   deleteElement(item) {
//     console.log('You are in Delete POD ' + item);
//     this.selection.selected.forEach(element => {
//       let index: number = this.dataset.findIndex(d => d === element);
//       console.log(this.dataset.findIndex(d => d === element));
//       this.dataset.splice(index, 1);
//       this.dataSource = new MatTableDataSource<tableData>(editData);
//     });
//     this.selection = new SelectionModel<tableData>(true, []);
//   }

//   isAllSelected() {
//     const numSelected = this.selection.selected.length;
//     const numRows = this.dataSource.data.length;
//     return numSelected === numRows;
//   }


//   /** Selects all rows if they are not all selected; otherwise clear selection. */
//   masterToggle() {
//     this.isAllSelected() ?
//       this.selection.clear() :
//       this.dataSource.data.forEach(row => this.selection.select(row));
//   }

//   /** The label for the checkbox on the passed row */
//   checkboxLabel(row?: tableData): string {
//     if (!row) {
//       return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
//     }
//     return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.PODID + 1}`;
//   }

//   applyFilter(filterValue: string) {
//   console.log('Received value is ::: ' + filterValue);
//       this.dataSource.filter = filterValue.trim().toLowerCase();
//   }
// }

// @Component({
//   selector: 'app-delete-work-center',
//   templateUrl: './delete-work-center.html',
// })
// export class DeleteWorkCenter implements OnInit {

//   userAddressValidations: FormGroup;
//   localData: any;
//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     public dialogRef: MatDialogRef<WorkCenterComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {
//       this.localData = data;
//     }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   ngOnInit() {

//   }

// }
