/**
 * @author Thomas Lien Christensen, s165242
 * @author Hadi Horani, s144885
 */

import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
    GetLibrarySections, SetActiveSection, SetActivateFeedbackAndStatus,
    GetSurveys, AddSurveyAnswer, AddSurvey, AddSurveySuccess, AddSurveyError,
    AddSurveyAnswerError, AddSurveyAnswerSuccess, GetLocations, SetActiveLocation, ResetActiveLocation
} from '../_actions/mazemap.actions';
import { MazemapService } from '../_services/mazemap.service';
import { tap } from 'rxjs/operators';
import { SurveyService } from '../_services/survey.service';
import { Survey } from '../models/survey/survey.model';
import { patch, updateItem, append } from '@ngxs/store/operators';
import { Section } from '../models/mazemap/section.model';
import { MapLocation } from '../models/mazemap/map-location.model';

export class MazemapStateModel {
    locations: MapLocation[];
    activeLocation: MapLocation;
    activeSection: Section;
    activateFeedbackAndStatus: boolean;
    surveys: Survey[];
}

@State<MazemapStateModel>({
    name: 'MazeMap',
    defaults: {
        locations: undefined,
        activeLocation: null,
        activeSection: null,
        activateFeedbackAndStatus: false,
        surveys: []
    }
})

export class MazemapState {

    constructor(private mazemapService: MazemapService, private surveyService: SurveyService) {}

    @Selector()
    static getLocations(state: MazemapStateModel) {
        return state.locations;
    }

    @Selector()
    static getActiveLocation(state: MazemapStateModel) {
        return state.activeLocation;
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

    @Action(GetLocations)
    getLocations({ patchState }: StateContext<MazemapStateModel>) {
        return this.mazemapService.getLocations().pipe(tap((res) => {
            patchState({
                locations: res
            });
        }));
    }

    @Action(SetActiveLocation)
    getLocation({ patchState }: StateContext<MazemapStateModel>, { payload }: SetActiveLocation) {
        return this.mazemapService.getLocation(payload).pipe(tap((res) => {
            patchState({
                activeLocation: res
            });
        }));
    }

    @Action(ResetActiveLocation)
    resetActiveLocation({ patchState }: StateContext<MazemapStateModel>) {
        patchState({
            activeLocation: null
        });
        patchState({
            activeSection: null
        });
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
                    const newActiveLocation = state.activeLocation;
                    newActiveLocation.sections.find(x => x.id === payload.sectionId).survey = res;
                    patchState({
                       activeLocation: newActiveLocation
                    });
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
