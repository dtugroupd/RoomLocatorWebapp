/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngxs/store';
import { DeleteUser } from 'src/app/_actions/admin.actions';
import { NbDialogRef } from '@nebular/theme';
import { User } from 'src/app/models/login/user.model';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent {
  private users: any;
  user: User;
  dialogClosed: boolean = false;

  constructor(
    private dialogRef: NbDialogRef<UserDeleteComponent>,
    private store: Store,
    
    ) { }

    close() {
      this.dialogClosed = false;
      this.dialogRef.close();
    }

    deleteUser() {
      this.dialogClosed = true;
      this.store.dispatch( new DeleteUser( this.user.studentId ) ).subscribe(x => {
        this.users = x.users.users;
      });
      if (this.dialogClosed) {
        this.dialogRef.close(this.users);
      } else {
        this.dialogRef.close();
      }
    }

}
