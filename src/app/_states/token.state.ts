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

export class TokenStateModel {
    token?: string;
    user: User;
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
    static isAuthenticated(state: TokenStateModel): boolean {
        const jwtHelper = new JwtHelperService();

        return state.token !== null && !jwtHelper.isTokenExpired(state.token);
    }

    @Action(SetTokenAndUser)
    setTokenAndUser({ setState }: StateContext<TokenStateModel>) {
        const jwtHelper = new JwtHelperService();
        let token = localStorage.getItem('token');

        if (!token) {
            return;
        }

        if (token && jwtHelper.isTokenExpired(token)) {
            setState({ user: null });
        } else {
            return this.userService.fetchUser().pipe(tap((user: User) => {
                setState({ user: user, token: token });
            }));
        }
    }

    @Action(Login)
    login({ patchState }: StateContext<TokenStateModel>, login: LoginModel) {
        return this.userService.login(login).pipe(tap((auth: AuthenticatedModel) => {
            patchState({ user: auth.user, token: auth.token });
        }));
    }
}
