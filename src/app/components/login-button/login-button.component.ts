/**
 * @author Hadi Horani, s144885
 */

import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, Token } from 'src/app/models/login/user.model';
import { UserState } from 'src/app/_states/user.state';

@Component({
  selector: 'app-login-button',
  template: `    User signed in: {{ token.user.studentId }}
  `,
  styles: ['span { color: green;' ]
})
export class LoginButtonComponent implements OnInit {
  serviceUrl: string;
   token: Token;
   user: User;

  @Select(UserState.getToken) token$: Observable<Token>;
  @Select(UserState.getUser) user$: Observable<User>;


  constructor(private store: Store) {
   this.serviceUrl = `${environment.backendUrl}/api/v1/auth/validate`;
  }

  ngOnInit() {
    this.token$.subscribe(result => {
      this.token = result;
    });

    this.user$.subscribe(result => {
      this.user = result;
    })
  }
}
