/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit, TemplateRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetUsers, UpdateRole, DeleteUser } from 'src/app/_actions/admin.actions';
import { MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { User, Role } from 'src/app/models/login/user.model';
import { TokenState } from 'src/app/_states/token.state';
import { Observable } from 'rxjs';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { NbDialogService } from '@nebular/theme';
import { AdminState } from 'src/app/_states/admin.state';


@Component( {
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: [ './admin-page.component.scss' ]
} )
export class AdminPageComponent implements OnInit
{

  @Select(TokenState.getUser) user$: Observable<User>;


  users: any;
  stateUsers: any;
  user: any;

  selectedRow: number;
  setClickedRow: Function;
  selectedRole: string;
  selectedUserId: string;
  searchText;
  dataSource: MatTableDataSource<User>;
  isShow = false;
  currentUser: User;

  roles: Role[] = [
    { name: 'admin', locationName: null, locationId: null },
    { name: 'researcher', locationName: null, locationId: null },
    { name: 'student', locationName: null, locationId: null }
  ];

  displayedColumns: string[] = [ 'image', 'userID', 'fullName', 'userRole', 'action' ];


  @Select(AdminState.getUsers) users$: Observable<User[]>;

  constructor ( private store: Store, private dialogService: NbDialogService ) { }

  ngOnInit ()
  {
    this.store.dispatch( new GetUsers() ).subscribe( x =>
    {
      this.users = x.users.users;
      this.dataSource = new MatTableDataSource( this.users );

      this.dataSource.filterPredicate = ( item, filter: string ) => {
        let exists = false;
        item.roles.forEach(x => {
          if (x.name.toLowerCase().includes(filter.toLowerCase())) { 
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
    this.store.dispatch( new UpdateRole( this.selectedUserId, this.selectedRole ) ).subscribe(x => {
      this.dataSource.data = x.users.users;
    });
    this.isShow = !this.isShow;
  }

  getUserRoles(user: User) {
    return user.roles.map(x => x.locationName ? [x.name + ':' + x.locationName] : x.name);
  }

  confirmDeletion(u: User) {

    this.users$.subscribe(x => {
      this.stateUsers = x;
    });

    if (this.isShow) {
      this.toggleDisplay();
    }

    const userContext = {user: u};
    const settings = { autoFocus: false, closeOnBackdropClick: true, closeOnEsc: true, context: userContext };

    this.dialogService.open(UserDeleteComponent, settings).onClose.subscribe(() => {
      this.dataSource.data = this.stateUsers;
    });
  }
}
