/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit } from '@angular/core';
import { Store, Actions } from '@ngxs/store';
import { GetUsers, UpdateRole } from 'src/app/_actions/admin.actions';

export interface Role {
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

  constructor ( private store: Store, private actions: Actions) { }

  roles: Role[] = [
    { name: 'admin' , viewName: 'Admin'},
    { name: 'researcher', viewName: 'Researcher' },
    { name: 'student', viewName: 'Student' }
  ];

  ngOnInit ()
  {
    this.store.dispatch( new GetUsers() ).subscribe( x =>
    {
      this.users = x.users.users;
    } );

    
    this.setClickedRow = function ( index )
    {
      this.selectedRow = index;
    }
  }

  saveNewRole() {
    this.selectedUserId = this.users[this.selectedRow].studentId;
    this.store.dispatch(new UpdateRole(this.selectedUserId, this.selectedRole)).subscribe(() => {});


  }

}
