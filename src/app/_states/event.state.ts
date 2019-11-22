/**
 * @author Andreas Gøricke, s153804
 */


import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
import { patch, updateItem, append } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { EventService } from '../_services/event.service';
import { Event } from '../models/calendar/event.model';
import { GetEvents } from '../_actions/event.actions';
import { state } from '@angular/animations';


export class EventStateModel {
    events: Event[];
}

@State<EventStateModel>({
    name: 'Event',
    defaults: {
        events: [],
    }
})

export class EventState {

    constructor(private eventService: EventService) {}

    @Selector()
    static getEvents(state: EventStateModel) {
        return state.events;
    }


    @Action(GetEvents)
    getEvents({ setState }: StateContext<EventStateModel>) {
        return this.eventService.getAll().pipe(tap((result) => {
            setState({ 
                events : result
            });
        }));
    }

}
