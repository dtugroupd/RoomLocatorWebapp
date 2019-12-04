import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select, Actions, ofActionDispatched } from '@ngxs/store';
import { Login, LoginSuccess, SetIsLoading, LoginError } from 'src/app/_actions/token.actions';
import { LoginModel, UserDisclaimer } from 'src/app/models/login/user.model';
import { SetAcceptedDisclaimer } from 'src/app/_actions/user.actions';
import { UserDisclaimerState } from 'src/app/_states/user.state';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenState } from 'src/app/_states/token.state';
import { ErrorModel } from 'src/app/models/general/error.model';
import { NbToastrService } from '@nebular/theme';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

/**
 * @author Anders Wiberg Olsen, s165241
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Select(UserDisclaimerState.hasAcceptedDisclaimer) hasAcceptedDisclaimer$: Observable<boolean>;
  @Select(UserDisclaimerState.disclaimerIsLoading) disclaimerLoading$: Observable<boolean>;
  @Select(TokenState.loginIsLoading) loginLoading$: Observable<boolean>;
  @Select(TokenState.getError) loginError$: Observable<ErrorModel>;

  username: string;
  password: string;
  acceptedDisclaimer?: boolean = null;

  disclaimerLoading = false;
  loginLoading = false;

  constructor(private store: Store, private toastrService: NbToastrService, private action$: Actions) { }

  ngOnInit() {
    this.action$.pipe(untilComponentDestroyed(this), ofActionDispatched(LoginError)).subscribe(({payload}) => {
      this.toastrService.danger(payload.message, payload.title);
    });

    this.hasAcceptedDisclaimer$.subscribe(disclaimer => {
      this.acceptedDisclaimer = disclaimer;
    });

  }

  ngOnDestroy() { }

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
