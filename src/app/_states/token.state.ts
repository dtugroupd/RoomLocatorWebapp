/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Login } from '../_actions/token.actions';
import { UserService } from '../_services/login.service';
import { User } from '../models/login/user.model';
import { tap } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export class TokenStateModel {
    token?: string;
    user: User;
}

@State<TokenStateModel>({
    name: 'token'
})
export class TokenState {
    constructor(private userService: UserService, private authService: AuthService) {}
    
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

    @Action(Login)
    login({ patchState }: StateContext<TokenStateModel>) {
        const token = localStorage.getItem('token');
        if (token !== null) {
            patchState({ token });
            // return this.userService.fetchUser().pipe(tap((user: User) => {
            //     patchState({ user });
            // }));
            return this.userService.login("s123456", "MyAwesomePassword").pipe(tap((user: any) => {
                var userModel: User = {
                    id: user.userId,
                    name: user.fullName,
                    studentId: user.userName,
                    roles: ["student"],
                    profile: user.profileImage
                }
                patchState({ user: userModel });
            }));
        } else {
            this.authService.loginWithSso();
        }
    }
}
