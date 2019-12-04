/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Login, SetTokenAndUser, SetIsLoading, LoginError, LoginSuccess } from '../_actions/token.actions';
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
    static userIsAdmin(state: TokenStateModel): boolean {
        if (state.user && state.user.roles) {
            return state.user.roles.filter(() => state.user.roles.includes('admin')).length !== 0;
        }
        return false;
    }

    @Selector()
    static getUserAdminLocations(state: TokenStateModel): string[] {
        if (state.user && state.user.roles) {
            return state.user.roles.filter(x => x.includes('admin::'));
        }
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
        const token = localStorage.getItem('token');

        if (!token) {
            return;
        }

        if (token && jwtHelper.isTokenExpired(token)) {
            patchState({ user: null, loginLoading: false, error: null });
        } else {
            patchState({token});
            return this.userService.fetchUser().pipe(tap((user: User) => {

                setState({ user, token, loginLoading: false, error: null });
            }, x => {
                patchState({ loginLoading: false, error: x.error });
            }));
        }
    }

    @Action(Login)
    login({ patchState, dispatch }: StateContext<TokenStateModel>, login: LoginModel) {
        dispatch(new SetIsLoading(true));
        return this.userService.login(login).pipe(tap((auth: AuthenticatedModel) => {
            dispatch(new LoginSuccess());
            localStorage.setItem('token', auth.token);
            patchState({ user: auth.user, token: auth.token, error: null });
        }, x => {
            dispatch(new LoginError(x.error));
        }));
    }

    @Action(SetIsLoading)
    setIsLoading({ patchState }: StateContext<TokenStateModel>, { payload }: SetIsLoading) {
        patchState({
            loginLoading: payload
        });
    }

    @Action(LoginSuccess)
    loginSuccess({ dispatch }: StateContext<TokenStateModel>) {
        dispatch(new SetIsLoading(false));
    }

    @Action(LoginError)
    loginError({ patchState, dispatch }: StateContext<TokenStateModel>, { payload }: LoginError) {
        patchState({
            error: payload
        });
        dispatch(new SetIsLoading(false));
    }
}
