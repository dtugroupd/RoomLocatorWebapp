import { State, Action, Selector, StateContext } from '@ngxs/store';
import { LoginToken } from '../models/login.model';
import { AddToken } from '../actions/login.action';

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

