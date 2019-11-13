/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { User, Token } from 'src/app/models/login/user.model';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/_states/user.state';
import { TokenState } from 'src/app/_states/token.state';

@Component({
  selector: 'app-roles-view',
  template: `
  <div>
    Granted User Roles:
    <span *ngFor = "let role of user$.roles | async">
      {{ role }}
    </span>
    <div>
      <p>token:</p>
      <pre>{{ token$ | async }}</pre>
    </div>
  </div>
  `
})

export class RolesViewComponent implements OnInit {

  @Select(UserState.getUser) user$: Observable<User>;
  @Select(TokenState.getToken) token$: Observable<string>;

  constructor(private store: Store) {
   }

  ngOnInit() {
    // this.token$.subscribe(result => {
    //   this.token = result;
    // });
  }

}
