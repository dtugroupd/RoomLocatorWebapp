/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Login, SetTokenAndUser } from '../_actions/token.actions';
import { UserService } from '../_services/user.service';
import { User, LoginModel, AuthenticatedModel } from '../models/login/user.model';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorModel } from '../models/general/error.model';

export class TokenStateModel {
    token?: string;
    user: User;
    loginLoading: boolean = false;
    error: ErrorModel;
}

@State<TokenStateModel>({
    name: 'token'
})
export class TokenState {
    constructor(private userService: UserService) { }

    @Selector()
    static getToken(state: TokenStateModel): string {
        return state.token;
    }

    @Selector()
    static getUser(state: TokenStateModel): User {
        return state.user;
    }

    @Selector()
    static loginIsLoading(state: TokenStateModel): boolean {
        return state.loginLoading;
    }

    @Selector()
    static getError(state: TokenStateModel): ErrorModel {
        return state.error;
    }

    @Selector()
    static isAuthenticated(state: TokenStateModel): boolean {
        const jwtHelper = new JwtHelperService();

        return state.token !== null && !jwtHelper.isTokenExpired(state.token);
    }

    @Action(SetTokenAndUser)
    setTokenAndUser({ patchState, setState }: StateContext<TokenStateModel>) {
        const jwtHelper = new JwtHelperService();
        let token = localStorage.getItem('token');
        patchState({ loginLoading: true });

        if (!token) {
            return;
        }

        if (token && jwtHelper.isTokenExpired(token)) {
            patchState({ user: null, loginLoading: false, error: null });
        } else {
            return this.userService.fetchUser().pipe(tap((user: User) => {
                setState({ user: user, token: token, loginLoading: false, error: null });
            }, x => {
                patchState({ loginLoading: false, error: x.error });
            }));
        }
    }

    @Action(Login)
    login({ setState, patchState }: StateContext<TokenStateModel>, login: LoginModel) {
        patchState({ loginLoading: true });
        return this.userService.login(login).pipe(tap((auth: AuthenticatedModel) => {
            localStorage.setItem('token', auth.token);
            setState({ user: auth.user, token: auth.token, loginLoading: false, error: null });
        }, x => {
            patchState({ loginLoading: false, error: x.error });
        }));
    }
}
