/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/login/user.model';
import { Observable } from 'rxjs';
import { Select, Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { AdminState } from 'src/app/_states/admin.state';
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
    console.log('Tjeeek')
    this.selectedUserId = this.users[this.selectedRow].studentId;
    console.log(this.selectedUserId);
    console.log(this.selectedRole);
    this.store.dispatch(new UpdateRole(this.selectedUserId, this.selectedRole)).subscribe(() => {
      console.log('Tjeeek2')
    });


  }

}
