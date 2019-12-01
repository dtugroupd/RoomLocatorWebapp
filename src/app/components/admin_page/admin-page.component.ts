/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetUsers, UpdateRole, DeleteUser } from 'src/app/_actions/admin.actions';
import { MatTableDataSource } from '@angular/material';
import { User } from 'src/app/models/login/user.model';
import { Popup } from 'ng2-opd-popup';
import { NbDialogService } from '@nebular/theme';
import { TokenState } from 'src/app/_states/token.state';
import { Observable } from 'rxjs';

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

  @Select(TokenState.getUser) user$: Observable<User>;

  users: any;
  selectedRow: number;
  setClickedRow: Function;
  selectedRole: string;
  selectedUserId: string;
  searchText;
  dataSource: MatTableDataSource<User>;
  isShow = false;

  roles: Role[] = [
    { name: 'admin', viewName: 'Admin' },
    { name: 'researcher', viewName: 'Researcher' },
    { name: 'student', viewName: 'Student' }
  ];

  displayedColumns: string[] = [ 'userID', 'fullName', 'userRole', 'action' ];

  constructor ( private store: Store, public popup: Popup ) { }

  ngOnInit ()
  {
    this.store.dispatch( new GetUsers() ).subscribe( x =>
    {
      this.users = x.users.users;
      this.dataSource = new MatTableDataSource( this.users );

      this.dataSource.data.forEach(u => {
        if (!u.fullName ) {
          const index = this.dataSource.data.indexOf(u);
          this.dataSource.data.splice(index, 1);
        }
      });

      this.dataSource.filterPredicate = ( item, filter: string ) => {
        let exists = false;
        item.roles.forEach(x => {
          if (x.toLowerCase().includes(filter.toLowerCase())) { 
            exists = true;
          }
        });
        if ( item.studentId.toLowerCase().includes(filter.toLowerCase()) || item.fullName.toLowerCase().includes(filter.toLowerCase()) ) {
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
    this.dataSource.filter = filterValue.toLowerCase();
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  saveNewRole() {
    this.selectedUserId = this.users[ this.selectedRow ].studentId;
    this.store.dispatch( new UpdateRole( this.selectedUserId, this.selectedRole ) ).subscribe( () => { } );
  }

  deleteUser() {
    this.selectedUserId = this.users[ this.selectedRow ].studentId;
    this.store.dispatch( new DeleteUser( this.selectedUserId ) ).subscribe( () => { } );
    this.popup.hide();
  }

  confirmDeletion() {

    if (this.isShow) {
    this.toggleDisplay();
    }

    setTimeout(() => {
      this.popup.options = {
        header: 'Deletion of ' + this.users[ this.selectedRow ].studentId + ' (' + this.users[ this.selectedRow ].fullName + ')',
        confirmBtnContent: 'Yes',
        cancleBtnContent: 'No',
        confirmBtnClass: 'btn btn-default',
        cancleBtnClass: 'btn btn-default',
        animation: 'fadeInDown'
    };
      this.popup.show(this.popup.options);
    }, 100);
  }

}
