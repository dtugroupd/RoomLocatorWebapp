import { State, Selector, Action, StateContext } from '@ngxs/store';
import { UserService } from '../_services/user.service';
import { SetAcceptedDisclaimer } from '../_actions/user.actions';
import { UserDisclaimer } from '../models/login/user.model';
import { tap } from 'rxjs/operators';

export class UserDisclaimerStateModel {
    hasAccepted: boolean;
    disclaimerLoading: boolean;
}

/**
 * @author Anders Wiberg Olsen, s165241
 */
@State<UserDisclaimerStateModel>({
    name: 'userDisclaimer'
})
export class UserDisclaimerState {
    constructor(private userService: UserService) { }

    @Selector()
    static hasAcceptedDisclaimer(state: UserDisclaimerStateModel): boolean {
        return state.hasAccepted;
    }

    @Action(SetAcceptedDisclaimer)
    setAcceptedDisclaimer({ setState, patchState }: StateContext<UserDisclaimerStateModel>, { studentId }) {
        patchState({ disclaimerLoading: true });
        return this.userService.hasAcceptedDisclaimer(studentId).pipe(tap((userDisclaimer: UserDisclaimer) => {
            setState({ hasAccepted: userDisclaimer.hasAcceptedDisclaimer, disclaimerLoading: false })
        }, _ => patchState({disclaimerLoading: false })));
    }
}
