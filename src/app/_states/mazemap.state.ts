/**
 * @author Thomas Lien Christensen, s165242
 * @author Hadi Horani, s144885
 */

import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import {
  SetActiveSection,
  SetActivateFeedbackAndStatus,
  GetSurveys,
  AddSurveyAnswer,
  AddSurvey,
  AddSurveySuccess,
  AddSurveyError,
  AddSurveyAnswerError,
  AddSurveyAnswerSuccess,
  GetLocations,
  SetActiveLocation,
  ResetActiveLocation,
  AddEventToLocation
} from "../_actions/mazemap.actions";
import { MazemapService } from "../_services/mazemap.service";
import { tap } from "rxjs/operators";
import { SurveyService } from "../_services/survey.service";
import { Survey } from "../models/survey/survey.model";
import { patch, updateItem, append } from "@ngxs/store/operators";
import { Section } from "../models/mazemap/section.model";
import { MapLocation } from "../models/mazemap/map-location.model";
import { Router } from "@angular/router";
import { TokenStateModel, TokenState } from "./token.state";

export class MazemapStateModel {
  locations: MapLocation[];
  activeLocation: MapLocation;
  activeSurveys: Survey[];
  activeSection: Section;
  activateFeedbackAndStatus: boolean;
  surveys: Survey[];
}

@State<MazemapStateModel>({
  name: "MazeMap",
  defaults: {
    locations: undefined,
    activeLocation: null,
    activeSurveys: null,
    activeSection: null,
    activateFeedbackAndStatus: false,
    surveys: []
  }
})
export class MazemapState {
  constructor(
    private mazemapService: MazemapService,
    private store: Store,
    private surveyService: SurveyService,
    private router: Router
  ) {}

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
  static getActiveSurveys(state: MazemapStateModel) {
    return state.activeSurveys;
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
    return this.mazemapService.getLocations().pipe(
      tap(res => {
        let locations = res;
        if (this.router.url === "/survey-management") {
          const user = this.store.selectSnapshot(TokenState.getUser);
          const researcherUserLocations = this.store.selectSnapshot(
            TokenState.getUserResearcherLocations
          );
          const adminUserLocations = this.store.selectSnapshot(
            TokenState.getUserAdminLocations
          );

          let isGeneralAdmin = false;
          let isGeneralResearcher = false;
          let researcherLocations = [];
          let adminLocations = [];

          if (user) {
            isGeneralAdmin = user.isGeneralAdmin;
            isGeneralResearcher = user.isGeneralResearcher;
          }

          if (!isGeneralAdmin && !isGeneralResearcher) {
            if (researcherUserLocations) {
              const researcherLocationIds = researcherUserLocations.map(
                r => r.locationId
              );
              researcherLocations = locations.filter(l =>
                researcherLocationIds.includes(l.id)
              );
            }

            if (adminUserLocations) {
              const adminLocationIds = adminUserLocations.map(
                r => r.locationId
              );
              adminLocations = locations.filter(l =>
                adminLocationIds.includes(l.id)
              );
            }
            locations = researcherLocations.concat(adminLocations);
          }
        }
        patchState({
          locations
        });
      })
    );
  }

  @Action(SetActiveLocation)
  getLocation(
    { patchState }: StateContext<MazemapStateModel>,
    { payload }: SetActiveLocation
  ) {
    return this.mazemapService.getLocation(payload).pipe(
      tap(res => {
        patchState({
          activeLocation: res
        });

        if (res) {
          function removeDuplicates(myArr, prop) {
            return myArr.filter((obj, pos, arr) => {
              return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
            });
          }
          const activeSurveysAll = res.sections.map(s => s.survey);
          const activeSurveys = removeDuplicates(activeSurveysAll, "id");
          patchState({
            activeSurveys
          });
        } else {
          patchState({
            activeSurveys: null
          });
        }
      })
    );
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
  setActiveSection(
    { patchState }: StateContext<MazemapStateModel>,
    payload: SetActiveSection
  ) {
    patchState({
      activeSection: payload.section
    });
  }

  @Action(SetActivateFeedbackAndStatus)
  setActivateFeedbackAndStatus(
    { patchState }: StateContext<MazemapStateModel>,
    payload: SetActivateFeedbackAndStatus
  ) {
    patchState({
      activateFeedbackAndStatus: payload.activate
    });
  }

  @Action(GetSurveys)
  getSurveys({ patchState }: StateContext<MazemapStateModel>) {
    return this.surveyService.getSurveys().pipe(
      tap(result => {
        patchState({
          surveys: result
        });
      })
    );
  }

  @Action(AddSurvey)
  addSurvey(
    {
      setState,
      patchState,
      dispatch,
      getState
    }: StateContext<MazemapStateModel>,
    { payload }: AddSurvey
  ) {
    const state = getState();
    return this.surveyService.createSurvey(payload).subscribe(
      res => {
        setState(
          patch({
            surveys: append([res])
          })
        );
        const newActiveLocation = state.activeLocation;
        newActiveLocation.sections.find(
          x => x.id === payload.sectionId
        ).survey = res;
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
  addSurveyAnswer(
    { setState, dispatch }: StateContext<MazemapStateModel>,
    { payload }: AddSurveyAnswer
  ) {
    return this.surveyService.createSurveyAnswer(payload).subscribe(
      res => {
        if (res) {
          setState(
            patch({
              surveys: updateItem(
                x => x.id === res.surveyId,
                patch({
                  surveyAnswers: append([res])
                })
              )
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

  @Action(AddEventToLocation)
  addEventToLocation(
    { setState, getState }: StateContext<MazemapStateModel>,
    { payload }: AddEventToLocation
  ) {
    const state = getState();
    if (state.activeLocation.id === payload.locationId) {
      setState(
        patch({
          activeLocation: patch({
            events: append([payload])
          })
        })
      );
    }
  }
}
