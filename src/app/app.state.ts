import { State, Action, StateContext } from '@ngxs/store';

export interface AppStateModel{
    feedback: boolean;
}

/*  @State<AppStateModel>({
    name:'app',
    defaults:{
        feedback: null
    }
})
 export class AppState {

    @Action(SetFeedback)
    setfeedback({patchState, setState}: StateContext<AppStateModel>, {payload}:SetFeedback){
        const currentFeedback = getState().feedback
        patchState({feedback:payload});
      }

    } 
 */
