/**
 * @author Hadi Horani, s165242
 */

import { State, Action, Selector, StateContext } from '@ngxs/store';
import { SetUser } from '../_actions/login.actions';
import { User } from '../models/login/user.model';

export class UserStateModel {
    user: User;
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        user: null
    }
})

export class UserState {

    @Selector()
    static getUser(state: UserStateModel) {
        return state.user;
    }

    @Action(SetUser)
    set( {getState, patchState}: StateContext<UserStateModel>, { payload }: SetUser) {
        patchState({
            user: payload
        });
    }
}

