import { State, Action, Selector, StateContext } from '@ngxs/store';
import { User } from '../models/login/user.model';
import { UserService } from '../_services/user.service';
import { SetUser } from '../actions/login.action';

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

    constructor() {}

    @Selector()
    static getUser(state: UserStateModel) {
        return state.user;
    }

    @Action(SetUser)
    set({getState, patchState }: StateContext<UserStateModel>, { payload }: SetUser) {
        patchState({
            user: payload
        });
    }
}


