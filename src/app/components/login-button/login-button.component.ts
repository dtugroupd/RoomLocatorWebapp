/**
 * @author Hadi Horani, s165242
 * @author Andreas Gøricke, s153804
 */

import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { LoginToken } from '../../models/login/login.model';
import { LoginState } from '../../_states/login.state';
import { Observable } from 'rxjs';
import { AddToken } from '../../_actions/login.actions';
import { environment } from 'src/environments/environment';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-button',
  template: `
  <div>
    <a nbButton href="https://auth.dtu.dk/dtu/?service={{serviceUrl}}" style="background:none;border:none;font-size:2em;">
      <fa-icon [icon]="faSignInAlt" style="color:#0B8BED"></fa-icon>
    </a>
   <!-- <div>
      TicketValues:
        <span *ngFor="let token of tokens$ | async">
          {{ token.tokenValue }}
        </span>
    </div> -->
  </div>
`,
  styles: ['span { color: green;' ]
})
export class LoginButtonComponent implements OnInit {
  serviceUrl: string;
  faSignInAlt = faSignInAlt;

@Select(LoginState.getTokens) tokens$: Observable<LoginToken>;

  constructor(private store: Store) {
    this.serviceUrl = `${environment.backendUrl}/api/v1/auth/validate`;
  }

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
