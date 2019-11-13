/**
 * @author Hadi Horani, s144885
 */

import { State, Action, Selector, StateContext } from '@ngxs/store';
import { User } from '../models/login/user.model';
import { UserService } from '../_services/user.service';
import { tap } from 'rxjs/operators';
import { GetUser } from '../_actions/user.actions';

export class UserStateModel {
    user: User;
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        user: null,
    }
})

export class UserState {

    constructor(private userService: UserService) { }

    @Selector()
    static getUser(state: UserStateModel) {
        return state.user;
    }

    @Action(GetUser)
    get({ setState }: StateContext<UserStateModel>) {
        return this.userService.fetchUser().pipe(tap((result) => {
            console.log(result)
            setState({
                user: result
            });
        }
        ));
    }
}


