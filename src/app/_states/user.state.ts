/**
 * @author Hadi Horani, s144885
 * @author Anders Wiberg Olsen, s165241
 */

import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GetUser } from '../_actions/user.actions';
import { Token, User } from '../models/login/user.model';
import { UserService } from '../_services/login.service';
import { tap } from 'rxjs/operators';

export class UserStateModel {
    token?: Token;
    user: User;
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        token: null,
        user: null
    }
})


export class UserState {
    constructor(private userService: UserService) { }

    @Selector()
    static getUser(state: UserStateModel) {
        return state.user;
    }

    @Action(GetUser)
    getUser({ setState }: StateContext<UserStateModel>) {
        return this.userService.fetchUser().pipe(tap((result) => {
            setState({
                user: result
            });
        }));
    }
}
