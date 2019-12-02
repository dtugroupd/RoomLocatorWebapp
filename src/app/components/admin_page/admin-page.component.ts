/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetUsers, UpdateRole, DeleteUser } from 'src/app/_actions/admin.actions';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { User } from 'src/app/models/login/user.model';
import { TokenState } from 'src/app/_states/token.state';
import { Observable } from 'rxjs';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

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
  user: any;
  selectedRow: number;
  setClickedRow: Function;
  selectedRole: string;
  selectedUserId: string;
  searchText;
  dataSource: MatTableDataSource<User>;
  isShow = false;
  currentUser: User;
  dialogRef: any;

  roles: Role[] = [
    { name: 'admin', viewName: 'Admin' },
    { name: 'researcher', viewName: 'Researcher' },
    { name: 'student', viewName: 'Student' }
  ];

  displayedColumns: string[] = [ 'userID', 'fullName', 'userRole', 'action' ];

  constructor ( private store: Store, private dialogService: MatDialog ) { }

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

    this.user$.subscribe(x => {
      this.currentUser = x;
    });

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

  confirmDeletion() {

    if (this.isShow) {
    this.toggleDisplay();
    }

    setTimeout( () => {
      this.dialogService.open(UserDeleteComponent, {
        autoFocus: false,
        closeOnNavigation: true,
        data: {user: this.users[ this.selectedRow ]}
      }); }, 200);
  }

}
