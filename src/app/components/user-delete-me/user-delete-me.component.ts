import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { NbDialogRef } from '@nebular/theme';
import { User } from 'src/app/models/login/user.model';
import { DeleteMe } from 'src/app/_actions/user.actions';

@Component({
  selector: 'app-user-delete-me',
  templateUrl: './user-delete-me.component.html',
  styleUrls: ['./user-delete-me.component.scss']
})
export class UserDeleteMeComponent {

  user: User;

  constructor(
    private dialogRef: NbDialogRef<UserDeleteMeComponent>,
    private store: Store,

  ) { }

  close() {
    this.dialogRef.close();
  }

  deleteUser() {
    this.store.dispatch(new DeleteMe()).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
