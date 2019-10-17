import {State, Action, StateContext, Selector, Select} from '@ngxs/store';
import {Mazemap, LibrarySection} from '../models/mazemap.model';
import {GetCoordinates, GetLibrarySections} from '../actions/mazemap.action';
import { MazemapService } from '../services/mazemap.service';
import {tap} from 'rxjs/operators';

export class MazemapStateModel {
    coordinates: Mazemap[];
    librarySections: LibrarySection[];
}

@State<MazemapStateModel>({
    name: 'MazeMap',
    defaults: {
        coordinates: null,
        librarySections: null
    }
})

export class MazemapState {

    constructor(private mazemapService: MazemapService) {}

    @Selector()
    static getCoordinatesSet(state: MazemapStateModel) {
        return state.coordinates;
    }

    @Selector()
    static getLibrarySections(state: MazemapStateModel) {
        return state.librarySections;
    }

    @Action(GetCoordinates)
    getCoordinates({getState, setState}: StateContext<MazemapStateModel>) {
        return this.mazemapService.fetchCoordinates().pipe(tap((result) => {
            const state = getState();
            setState({
                ...state,
                coordinates: result,
            });
        }));
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
}
