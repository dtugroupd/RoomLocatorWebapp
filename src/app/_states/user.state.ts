/**
 * @author Hadi Horani, s144885
 */

import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SetToken, GetUser } from '../_actions/user.actions';
import { Token, User } from '../models/login/user.model';
import { UserService } from '../_services/login.service';
import { tap } from 'rxjs/operators';


export class UserStateModel {
    token: Token;
    user: User;
}

@State<UserStateModel>({
    name: 'token',
    defaults: {
        token: null,
        user: null
    }
})

export class UserState {

    constructor(private userService: UserService) {}


    @Selector()
    static getToken(state: UserStateModel) {
        return state.token;
    }

    @Selector()
    static getUser(state: UserStateModel) {
        return state.user;
    }

    @Action(SetToken)
    set( {getState, patchState}: StateContext<UserStateModel>, { payload }: SetToken) {
        patchState({
            token: payload
        });
    }

    @Action(GetUser)
    getUser({getState, setState}: StateContext<UserStateModel>) {
        return this.userService.fetchUser().pipe(tap((result) => {
            setState({
                user: result,
                token: null
            });
        }));
    }
}


