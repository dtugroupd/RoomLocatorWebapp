import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { LoginToken } from './../models/login.model';
import { LoginState } from './../states/login.state';
import { Observable } from 'rxjs';
import { AddToken } from './../actions/login.action';


@Component({
  selector: 'app-login-button',
  template: `
  <div>
    <a nbButton href="https://auth.dtu.dk/dtu/?service=http://localhost:4200/" >Login</a>
    <div>
      TicketValues:
        <span *ngFor="let token of tokens$ | async">
          {{ token.tokenValue }}
        </span>
    </div>
  </div>
`,
  styles: ['span { color: green;' ]
})
export class LoginButtonComponent {

  @Select(LoginState.getTokens) tokens$: Observable<LoginToken>;

  constructor(private store: Store) {}

  ngOnInit() {
    const ticket = this.getToken();

    if (ticket) {
      this.store.dispatch(new AddToken({tokenValue: ticket}));
    }
  }

  getToken() {
    let ticketVal: string = null;
    if (location.search) {
      ticketVal = location.href.split('=').pop();
    }

    return ticketVal;
  }

}
