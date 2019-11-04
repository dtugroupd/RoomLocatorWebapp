/**
 * @author Thomas Lien Christensen, s165242
 * @author Hadi Horani, s165242
 */

import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
import { LibrarySection } from '../models/mazemap/library-section.model';
import { GetLibrarySections, SetActiveSection, SetActivateFeedbackAndStatus } from '../_actions/mazemap.actions';
import { MazemapService } from '../_services/mazemap.service';
import { tap } from 'rxjs/operators';

export class MazemapStateModel {
    librarySections: LibrarySection[];
    activeSection: LibrarySection;
    activateFeedbackAndStatus: boolean;
}

@State<MazemapStateModel>({
    name: 'MazeMap',
    defaults: {
        librarySections: null,
        activeSection: null,
        activateFeedbackAndStatus: false,
    }
})

export class MazemapState {

    constructor(private mazemapService: MazemapService) {}

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
}
