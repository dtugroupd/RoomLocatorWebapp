/**
 * @author Thomas Lien Christensen, s165242
 * @author Hadi Horani, s144885
 */

import { State, Action, StateContext, Selector } from '@ngxs/store';
import { LibrarySection } from '../models/mazemap/library-section.model';
import {
    GetLibrarySections, SetActiveSection, SetActivateFeedbackAndStatus,
    GetSurveys, AddSurveyAnswer, AddSurvey, AddSurveySuccess, AddSurveyError, AddSurveyAnswerError, AddSurveyAnswerSuccess
} from '../_actions/mazemap.actions';
import { MazemapService } from '../_services/mazemap.service';
import { tap } from 'rxjs/operators';
import { SurveyService } from '../_services/survey.service';
import { Survey } from '../models/survey/survey.model';
import { patch, updateItem, append } from '@ngxs/store/operators';
import { dispatch } from 'rxjs/internal/observable/range';

export class MazemapStateModel {
    librarySections: LibrarySection[];
    activeSection: LibrarySection;
    activateFeedbackAndStatus: boolean;
    surveys: Survey[];
}

@State<MazemapStateModel>({
    name: 'MazeMap',
    defaults: {
        librarySections: null,
        activeSection: null,
        activateFeedbackAndStatus: false,
        surveys: []
    }
})

export class MazemapState {

    constructor(private mazemapService: MazemapService, private surveyService: SurveyService) {}

    @Selector()
    static getLibrarySections(state: MazemapStateModel) {
        return state.librarySections;
    }

    @Selector()
    static getActiveSection(state: MazemapStateModel) {
        return state.activeSection;
    }

    @Selector()
    static getActivateFeedbackAndStatus(state: MazemapStateModel) {
        return state.activateFeedbackAndStatus;
    }

    @Selector()
    static getSurveys(state: MazemapStateModel) {
        return state.surveys;
    }

    @Action(GetLibrarySections)
    getLibrarySections({getState, setState}: StateContext<MazemapStateModel>) {
        return this.mazemapService.fetchLibrarySections().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                librarySections: result,
            });
        }));
    }

    @Action(SetActiveSection)
    setActiveSection({patchState}: StateContext<MazemapStateModel>, payload: SetActiveSection) {
        patchState({
            activeSection: payload.section
        });
    }

    @Action(SetActivateFeedbackAndStatus)
    setActivateFeedbackAndStatus({patchState}: StateContext<MazemapStateModel>, payload: SetActivateFeedbackAndStatus) {
        patchState({
            activateFeedbackAndStatus: payload.activate
        });
    }

    @Action(GetSurveys)
    getSurveys({ patchState }: StateContext<MazemapStateModel>) {
        return this.surveyService.getSurveys().pipe(tap((result) => {
            patchState({
                surveys: result
            });
        }));
    }

    @Action(AddSurvey)
    addSurvey({ setState, patchState, dispatch, getState }: StateContext<MazemapStateModel>, { payload }: AddSurvey) {
        const state = getState();
        return this.surveyService.createSurvey(payload).subscribe(
            res => {
                    setState(
                        patch({
                            surveys: append([res])
                        }),
                        );
                    setState(
                        patch({
                            librarySections: updateItem(
                                x => x.id === payload.sectionId,
                                patch({
                                    survey: res
                                })
                            )
                        }),
                    );

                    const newActiveSection = state.activeSection;
                    newActiveSection.survey = res;
                    patchState({
                        activeSection: newActiveSection
                    });
                    dispatch(new AddSurveySuccess());
            },
            () => dispatch(new AddSurveyError())
        );
    }

    @Action(AddSurveyAnswer)
    addSurveyAnswer({ setState, dispatch }: StateContext<MazemapStateModel>, { payload }: AddSurveyAnswer) {
        return this.surveyService.createSurveyAnswer(payload).subscribe(
            res => {
                if (res) {
                    setState(
                        patch({
                            surveys: updateItem(
                                x => x.id === res.surveyId,
                                patch({
                                    surveyAnswers: append([res])
                                }))
                        })
                    );
                }
                dispatch(new AddSurveyAnswerSuccess());
            },
            () => {
                dispatch(new AddSurveyAnswerError());
            }
        );
    }
}
