/**
 * @author Hadi Horani, s144885
 */

import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SetToken } from '../_actions/user.actions';
import { Token } from '../models/login/user.model';

export class UserStateModel {
    token: Token;
}

@State<UserStateModel>({
    name: 'token',
    defaults: {
        token: null
    }
})

export class UserState {

    @Selector()
    static getToken(state: UserStateModel) {
        return state.token;
    }

    @Action(SetToken)
    set( {getState, patchState}: StateContext<UserStateModel>, { payload }: SetToken) {
        patchState({
            token: payload
        });
    }
}


