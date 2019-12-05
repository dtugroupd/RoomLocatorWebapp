/**
 * @author Hamed kadkhodaie, s083485
 */

import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import {User} from 'src/app/models/login/user.model';
import {DeleteUser} from 'src/app/_actions/user.actions'
import { Observable } from 'rxjs';
import { Store,Select} from '@ngxs/store';
import {TokenState} from 'src/app/_states/token.state'
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { Logout } from 'src/app/_actions/token.actions';
import { UserDeleteMeComponent } from '../user-delete-me/user-delete-me.component';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})

export class UserprofileComponent  {
  user: User;

  @Select( TokenState.getUser ) user$: Observable<User>;
 
 constructor(private store: Store, private dialogService: NbDialogService) {
   this.user$.subscribe(x => { 
     this.user = x;
   });
 }

 confirmDeletion(u: User) {

 
  const userContext = {user: u};
  const settings = { autoFocus: false, closeOnBackdropClick: true, closeOnEsc: true, context: userContext };

  this.dialogService.open(UserDeleteMeComponent, settings).onClose.subscribe(() => {
    this.store.dispatch( new Logout() );
  });

}
}
