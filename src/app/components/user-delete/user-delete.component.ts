/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store, Select } from '@ngxs/store';
import { DeleteUser } from 'src/app/_actions/admin.actions';
import { NbDialogRef } from '@nebular/theme';
import { User } from 'src/app/models/login/user.model';
import { Observable } from 'rxjs';
import { AdminState } from 'src/app/_states/admin.state';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent {
  users: any;
  user: User;
  dialogClosed: boolean = false;

  @Select(AdminState.getUsers) users$: Observable<User[]>;

  constructor(
    private dialogRef: NbDialogRef<UserDeleteComponent>,
    private store: Store,

  ) { }

  close() {
    this.dialogRef.close();
  }

  deleteUser() {
    this.store.dispatch(new DeleteUser(this.user.studentId));

    this.dialogRef.close();
  }

}
