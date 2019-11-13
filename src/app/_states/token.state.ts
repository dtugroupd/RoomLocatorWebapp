/**
 * @author Hadi Horani, s144885
 */

import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SetToken } from '../_actions/token.actions';
import { Token, User } from '../models/login/user.model';
import { UserService } from '../_services/user.service';
import { tap } from 'rxjs/operators';

export class TokenStateModel {
    token: Token;
}

@State<TokenStateModel>({
    name: 'token',
    defaults: {
        token: null,
    }
})

export class TokenState {

    @Selector()
    static getToken(state: TokenStateModel) {
        return state.token;
    }

    @Action(SetToken)
    set( {getState, patchState}: StateContext<TokenStateModel>, { payload }: SetToken) {
        patchState({
            token: payload
        });
    }
}


