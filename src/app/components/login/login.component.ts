import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Login } from 'src/app/_actions/token.actions';
import { LoginModel, UserDisclaimer } from 'src/app/models/login/user.model';
import { SetAcceptedDisclaimer } from 'src/app/_actions/user.actions';
import { UserDisclaimerState } from 'src/app/_states/user.state';
import { Observable } from 'rxjs';

/**
 * @author Anders Wiberg Olsen, s165241
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Select(UserDisclaimerState.hasAcceptedDisclaimer) hasAcceptedDisclaimer$: Observable<boolean>;

  username: string;
  password: string;
  acceptedDisclaimer?: boolean = null;

  constructor(private store: Store) { }

  ngOnInit() {
    this.hasAcceptedDisclaimer$.subscribe(disclaimer => {
      this.acceptedDisclaimer = disclaimer;
    });
  }

  acceptDisclaimer(accepted: boolean) {
    this.acceptedDisclaimer = accepted;
  }

  usernameLostFocus() {
    this.store.dispatch(new SetAcceptedDisclaimer(this.username));
  }

  onSubmit() {

    const login: LoginModel =
    {
      username: this.username,
      password: this.password,
      hasAcceptedDisclaimer: this.acceptedDisclaimer
    };
    this.store.dispatch(new Login(login));
  }

}
