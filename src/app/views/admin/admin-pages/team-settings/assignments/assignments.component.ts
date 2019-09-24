import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Getassignments } from 'src/app/core/admin/team-settings/assignments/_models/getassignments';
import { AssignmentsService } from 'src/app/core/admin/team-settings/assignments/_services/assignments.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogData } from '../agent-role/agent-role.component';
import { IMyOptions, IMyDateModel } from 'mydatepicker';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  assignmentsViewDataArray: Getassignments[];
  animal: string;
  name: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'Assignments', 'Category', 'Settings'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  constructor(
    private assignmentsService: AssignmentsService,
    public dialog: MatDialog) { }

  ngOnInit() {
    console.log('in ngOnInit method of assigments');
    this.viewAssignments();
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
  checkboxLabel(row?: Getassignments): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.assignmentConfigId + 1}`;
  }

  viewAssignments(): void {
    console.log('In viewAssignments method of component');
    this.assignmentsService.callGetAssignmentsConfig().subscribe(resp => {
      console.log('response status is ' + resp.body.status + ' ' + resp.body.statusCode);
      if (resp.body.status.localeCompare('Success') === 0) {
        console.log('Fetch TA success');
        this.assignmentsViewDataArray = resp.body.data;
        this.dataSource = new MatTableDataSource(this.assignmentsViewDataArray);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  applyFilter(filterValue: string) {
    console.log('Received value is ::: ' + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addAssignments(): void {
    console.log('In addAssignments method in component');
    const dialogRef = this.dialog.open(AddAssignment, {
      height: '500px',
      data: { name: this.name }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('You are in Closing Add Agent Role');
    //   this.animal = result;
    // });
  }

  editAssignment(item) {
    console.log('You are in Edit Assignment');
  }

  deleteAssignment(item): void {
    console.log('You are in Delete Assignment');
    const dialogRef = this.dialog.open(DeleteAssignment, {
      data: item
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('You are in Closing Add Agent Role');
    //   this.animal = result;
    // });
  }


}

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignments.html',
})
export class AddAssignment implements OnInit {
  public mytime: Date = new Date();

  userAddressValidations: FormGroup;
  minDate: any;


  onDateSelection(evt: any) {
    //  this.minDate = new Date(evt.date.valueOf());
    // this.minDate = { year: evt.year, month: evt.month, day: evt.day };
    this.minDate = evt;
    console.log('Minimum selected Date is :::' + this.minDate);
  }

constructor(
  private formBuilder: FormBuilder,
  private router: Router,
  public dialogRef: MatDialogRef < AssignmentsComponent >,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

onNoClick(): void {
  this.dialogRef.close();
}

myFilter = (d: Date): boolean => {
  const day = d.getDay();
  return day !== 0 && day !== 2 && day !== 3 && day !== 4 && day !== 5 && day !== 6;
}

myMinFilter = (d: Date): boolean => {
  const day = d.getDay();
  return day !== 1 && day !== 2 && day !== 3 && day !== 4 && day !== 5 && day !== 6;
}

ngOnInit() {
  console.log('new date selected in start date' +this.minDate);
  console.log('tdy date' + this.mytime);
  this.userAddressValidations = this.formBuilder.group({
    assignment: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
    Category: ['', [Validators.required]],
    StartDate: ['', [Validators.required]]
  });
}

onSubmit(userAddressValidations) {
  if (this.userAddressValidations.valid) {
    this.dialogRef.close();
  } else {
    console.log('Please Enter Valid Data');
    this.dialogRef.disableClose;
  }
}
}

@Component({
  selector: 'app-delete-assignment',
  templateUrl: './delete-assignments.html',
})
export class DeleteAssignment implements OnInit {

  userAddressValidations: FormGroup;
  localData: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AssignmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.localData = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

}
