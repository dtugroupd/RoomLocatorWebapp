/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { User, Token } from 'src/app/models/login/user.model';
import { Observable, Subscription } from 'rxjs';
import { TokenState } from 'src/app/_states/token.state';

@Component({
  selector: 'app-roles-view',
  templateUrl: './roles-view.component.html',
})

export class RolesViewComponent {
  
  subscriptions: Subscription;
  
  @Select(TokenState.getUser) user$: Observable<User>;
  constructor(private store: Store) { }
}
