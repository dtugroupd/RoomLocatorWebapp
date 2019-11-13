/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, Token } from 'src/app/models/login/user.model';
import { UserState } from 'src/app/_states/user.state';
import { TokenState } from 'src/app/_states/token.state';

@Component({
  selector: 'app-login-button',
  template: `    User signdded in: {{ user$ | async | json }}
  `,
  styles: ['span { color: green;' ]
})
export class LoginButtonComponent implements OnInit {
  serviceUrl: string;
   token: Token;
   user: User;

  @Select(TokenState.getToken) token$: Observable<Token>;
  @Select(TokenState.getUser) user$: Observable<User>;

  constructor(private store: Store) {
   this.serviceUrl = `${environment.backendUrl}/api/v1/auth/validate`;
  }

  ngOnInit() {
    this.token$.subscribe(result => {
      this.token = result;
    });
  }
}
