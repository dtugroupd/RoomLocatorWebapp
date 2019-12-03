/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngxs/store';
import { DeleteUser } from 'src/app/_actions/admin.actions';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent {
  private users: any;

  constructor(
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    close() {
      this.dialogRef.close();
    }

    deleteUser() {
      this.store.dispatch( new DeleteUser( this.data.user.studentId ) ).subscribe(x => {
        this.users = x.users.users;
      });
      this.dialogRef.close(this.users);
    }

}
