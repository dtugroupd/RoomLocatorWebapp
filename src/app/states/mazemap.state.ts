import {State, Action, StateContext, Selector} from '@ngxs/store';
import {Mazemap} from '../models/mazemap.model';
import {GetCoordinates} from '../actions/mazemap.action';
import { MazemapService } from '../services/mazemap.service';
import {tap} from 'rxjs/operators';

export class MazemapStateModel {
    coordinates: Mazemap[];
}

@State<MazemapStateModel>({
    name: 'coordinates',
    defaults: {
        coordinates: []
    }
})

export class MazemapState {

    constructor(private mazemapService: MazemapService) {}

    @Selector()
    static getCoordinatesSet(state: MazemapStateModel) {
        return state.coordinates;
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
}
