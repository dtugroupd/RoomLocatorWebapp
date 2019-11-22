/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit } from '@angular/core';
import { Store, Actions } from '@ngxs/store';
import { GetUsers, UpdateRole } from 'src/app/_actions/admin.actions';
import { MatTableDataSource } from '@angular/material';
import { FormControl } from '@angular/forms';

export interface Role {
  name: string;
  viewName: string;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  users: any;
  selectedRow: number;
  setClickedRow: Function;
  selectedRole: string;
  selectedUserId: string;
  searchText;
  dataSource = new MatTableDataSource();

  roleFilter = new FormControl('');
  idFilter = new FormControl('');

  filterValues = {
    role: '',
    id: '',
  };

  roles: Role[] = [
    { name: 'admin', viewName: 'Admin' },
    { name: 'researcher', viewName: 'Researcher' },
    { name: 'student', viewName: 'Student' }
  ];

  displayedColumns: string[] = ['userID', 'userRole'];

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetUsers()).subscribe(x => {
      this.users = x.users.users;
      this.dataSource.data = this.users;
      this.dataSource.filterPredicate = this.tableFilter();
    }
    );

    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }

    this.roleFilter.valueChanges
      .subscribe(
        role => {
          console.log('role changed');
          this.filterValues.role = role;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.idFilter.valueChanges
      .subscribe(
        id => {
          console.log('id changed');
          this.filterValues.id = id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.role.indexOf(searchTerms.role) !== -1
        && data.id.indexOf(searchTerms.id) !== -1
    }
    return filterFunction;
  } 


  saveNewRole() {
    this.selectedUserId = this.users[this.selectedRow].studentId;
    this.store.dispatch(new UpdateRole(this.selectedUserId, this.selectedRole)).subscribe(() => { });


  }

}
