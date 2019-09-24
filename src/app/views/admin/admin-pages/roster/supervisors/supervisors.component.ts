import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Getsupervisor } from './../../../../../core/admin/roster/supervisor/_models/getsupervisor';
import { SupervisorrosterService } from './../../../../../core/admin/roster/supervisor/_services/supervisorroster.service';

@Component({
  selector: 'app-supervisors',
  templateUrl: './supervisors.component.html',
  styleUrls: ['./supervisors.component.css']
})
export class SupervisorsComponent implements OnInit {

  supervisorViewDataArray: Getsupervisor[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['select', 'Name', 'Unix ID', 'Team', 'Therapeutic Area', 'Location',
    'Rotation', 'Role', 'Settings'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  constructor(private supervisorRosterService: SupervisorrosterService) { }

  ngOnInit() {
    this.viewSupervisorRoster();
  }

  viewSupervisorRoster(): void {
    console.log('In viewSupervisorRoster method in the component');
    this.supervisorRosterService.callGetSupervisorRoster().subscribe(resp => {
      console.log('Fetch data success');
      this.supervisorViewDataArray = resp.body.data;
      // console.log('data has ' + JSON.stringify(this.supervisorViewDataArray));
      this.dataSource = new MatTableDataSource(this.supervisorViewDataArray);
      this.dataSource.paginator = this.paginator;
    });
  }

  addSupervisor() {
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
  checkboxLabel(row?: Getsupervisor): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.sup_first_name + 1}`;
  }

  applyFilter(filterValue: string) {
    console.log('Received value is ::: ' + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
