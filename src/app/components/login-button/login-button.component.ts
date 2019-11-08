/**
 * @author Hadi Horani, s165242
 * @author Andreas Gøricke, s153804
 * @author Hadi Horani, s144885
 */

import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { User, Token } from 'src/app/models/login/user.model';
import { UserState } from 'src/app/_states/user.state';

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
    <a nbButton href="https://auth.dtu.dk/dtu/?service={{serviceUrl}}" >Login</a>
    <div>
    User signed in: {{ token.user.studentId }}

  </div>
`,
  styles: ['span { color: green;' ]
})
export class LoginButtonComponent implements OnInit {
  serviceUrl: string;
  faSignInAlt = faSignInAlt;
   token: Token;

  @Select(UserState.getToken) token$: Observable<Token>;


  constructor(private store: Store) {
   this.serviceUrl = `${environment.backendUrl}/api/v1/auth/validate`;
  }

  ngOnInit() {
    this.token$.subscribe(result => {
      this.token = result;
    });
  }
}
