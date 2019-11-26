/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetUsers, UpdateRole } from 'src/app/_actions/admin.actions';
import { MatTableDataSource } from '@angular/material';
import { User } from 'src/app/models/login/user.model';

export interface Role
{
  name: string;
  viewName: string;
}


@Component( {
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: [ './admin-page.component.scss' ]
} )
export class AdminPageComponent implements OnInit
{

  users: any;
  selectedRow: number;
  setClickedRow: Function;
  selectedRole: string;
  selectedUserId: string;
  searchText;
  dataSource: MatTableDataSource<User>;

  roles: Role[] = [
    { name: 'admin', viewName: 'Admin' },
    { name: 'researcher', viewName: 'Researcher' },
    { name: 'student', viewName: 'Student' }
  ];

  displayedColumns: string[] = [ 'userID', 'fullName', 'userRole' ];

  constructor ( private store: Store ) { }

  ngOnInit ()
  {
    this.store.dispatch( new GetUsers() ).subscribe( x =>
    {
      this.users = x.users.users;
      this.dataSource = new MatTableDataSource( this.users );

      this.dataSource.filterPredicate = ( item, filter: string ) =>
      {
        let exists = false;
        item.roles.forEach(x => {
          if (x.includes(filter)) {
            exists = true;
          }
        });
        if ( item.studentId.includes( filter) ) {
          return true;
        }
        return exists;

      }


    }
    );

    this.setClickedRow = function ( index )
    {
      this.selectedRow = index;
    }
  }

  applyFilter ( filterValue: string )
  {
    this.dataSource.filter = filterValue;
  }

  saveNewRole ()
  {
    this.selectedUserId = this.users[ this.selectedRow ].studentId;
    this.store.dispatch( new UpdateRole( this.selectedUserId, this.selectedRole ) ).subscribe( () => { } );


  }

}
