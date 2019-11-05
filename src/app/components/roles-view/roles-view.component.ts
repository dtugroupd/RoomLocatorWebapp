/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { User, Token } from 'src/app/models/login/user.model';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/_states/user.state';

@Component({
  selector: 'app-roles-view',
  template: `
  <div>
  <div>
  Available User Roles: Admin, Researcher, Student
      </div>
    <div>
        Granted User Roles:
        <span *ngFor = "let roles of token.user.roles">
       {{ roles }}
       </span>
    </div>
  </div>
  `
})

export class RolesViewComponent implements OnInit {

  @Select(UserState.getToken) token$: Observable<Token>;
  token: Token;

  constructor(private store: Store) {
   }

  ngOnInit() {
    this.token$.subscribe(result => {
      this.token = result;
    });
  }

}
