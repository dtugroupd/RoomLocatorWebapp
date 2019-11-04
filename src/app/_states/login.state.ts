/**
 * @author Hadi Horani, s165242
 */

import { State, Action, Selector, StateContext } from '@ngxs/store';
import { LoginToken } from '../models/login/login.model';
import { AddToken } from '../_actions/login.actions';

export class LoginStateModel {
    tokens: LoginToken[];
}

@State<LoginStateModel>({
    name: 'tokens',
    defaults: {
        tokens: []
    }
})

export class LoginState {

    @Selector()
    static getTokens(state: LoginStateModel) {
        return state.tokens;
    }

    @Action(AddToken)
    login( {getState, patchState}: StateContext<LoginStateModel>, { payload }: AddToken) {
        const state = getState();
        patchState({
            tokens: [...state.tokens, payload]
        });
    }
}


