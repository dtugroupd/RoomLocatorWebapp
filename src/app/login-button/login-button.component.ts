import { Component, OnInit, OnChanges } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/login/user.model';
import { UserState, UserStateModel } from '../states/user.state';

@Component({
  selector: 'app-login-button',
  template: `
  <div>
    <a nbButton href="https://auth.dtu.dk/dtu/?service={{serviceUrl}}" >Login</a>
    <div>
    User signed in: {{ studentId.tokenValue.User.StudentId }}

  </div>
`,
  styles: ['span { color: green;' ]
})

export class LoginButtonComponent implements OnInit {
  userrInfo: any;
  serviceUrl: string;
   studentId: any;
  @Select(UserState.getUser) user$: Observable<User>;


  constructor(private store: Store) {
   this.serviceUrl = `${environment.backendUrl}/api/v1/auth/validate`;
  }

  ngOnInit() {
    this.user$.subscribe(result => {
      this.studentId = result;
    });

/*    const ticket = this.getToken();

    if (ticket) {
      this.store.dispatch(new AddToken({tokenValue: ticket}));
    }
*/
  }

  getToken() {
    let ticketVal: string = null;
    if (location.search) {
      ticketVal = location.href.split('=').pop();
    }

    return ticketVal;
  }
}
