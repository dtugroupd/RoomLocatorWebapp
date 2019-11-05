/**
 * @author Thomas Lien Christensen, s165242
 */

import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
import {tap} from 'rxjs/operators';
import { SurveyService } from '../_services/survey.service';
import { GetSurveys } from '../_actions/survey.actions';
import { Survey } from '../models/survey/survey.model';

export class SurveyStateModel {
    surveys: Survey[];
}

@State<SurveyStateModel>({
    name: 'Survey',
    defaults: {
        surveys: [],
    }
})

export class SurveyState {

    constructor(private surveyService: SurveyService) {}

    @Selector()
    static getSurveys(state: SurveyStateModel) {
        return state.surveys;
    }


    @Action(GetSurveys)
    getSurveys({setState}: StateContext<SurveyStateModel>) {
        return this.surveyService.getSurveys().pipe(tap((result) => {
            setState({
                surveys: result
            });
        }));
    }

    // @Action(SetActiveSection)
    // setActiveSection({patchState}: StateContext<SurveyStateModel>, payload: SetActiveSection) {
    //     patchState({
    //         activeSection: payload.section
    //     });
    // }
}
