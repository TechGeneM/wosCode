import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Getadmin } from './../../../../../core/admin/roster/admins/_models/getadmin';
import { AdminrosterService } from './../../../../../core/admin/roster/admins/_services/adminroster.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  adminViewDataArray: Getadmin[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'Name', 'Unix ID', 'Email Address', 'Settings'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  constructor(private adminRosterService: AdminrosterService) { }

  ngOnInit() {
    this.viewAdminRoster();
  }

  viewAdminRoster(): void {
    console.log('In viewAdminRoster method in service');
    this.adminRosterService.callGetAdminRoster().subscribe(resp => {
      console.log('response status is ' + resp.body.status + resp.body.statusCode);
      if (resp.body.status.localeCompare('Success') === 0) {
        console.log('Fetch data success');
        this.adminViewDataArray = resp.body.data;
        this.dataSource = new MatTableDataSource(this.adminViewDataArray);
        this.dataSource.paginator = this.paginator;
      }
    });

  }

  addAdmin() {

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
  checkboxLabel(row?: Getadmin): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.firstName + 1}`;
  }

  applyFilter(filterValue: string) {
    console.log('Received value is ::: ' + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
