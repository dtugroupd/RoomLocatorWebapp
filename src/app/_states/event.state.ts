/**
 * @author Andreas Gøricke, s153804
 */


import { State, Action, StateContext, Selector, Select } from '@ngxs/store';
import { patch, append, updateItem } from '@ngxs/store/operators';
import { tap } from 'rxjs/operators';
import { EventService } from '../_services/event.service';
import { Event } from '../models/calendar/event.model';
import {
    GetEvents, AddEvent, AddEventSuccess, AddEventError, UpdateEvent, UpdateEventSuccess,
    UpdateEventError,
    ClearNewEvent
} from '../_actions/event.actions';

export class EventStateModel {
    events: Event[];
    newEvent: Event;
}

@State<EventStateModel>({
    name: 'Event',
    defaults: {
        events: [],
        newEvent: null
    }
})

export class EventState {

    constructor(private eventService: EventService) {}

    @Selector()
    static getEvents(state: EventStateModel) {
        return state.events;
    }

    @Selector()
    static getNewEvent(state: EventStateModel) {
        return state.newEvent;
    }

    @Action(GetEvents)
    getEvents({ patchState }: StateContext<EventStateModel>) {
        return this.eventService.getAll().pipe(tap((result) => {
            patchState({
                events : result
            });
        }));
    }

    @Action(AddEvent)
    addEvent({ setState, dispatch }: StateContext<EventStateModel>, { payload }: AddEvent) {
        return this.eventService.createEvent(payload).subscribe(
            result => {
                setState(
                    patch({
                        events: append([result])
                    })
                );
                setState(
                    patch({
                        newEvent: result
                    })
                );
                dispatch(new AddEventSuccess());
            },
            () => dispatch(new AddEventError())
        );
    }

    @Action(UpdateEvent)
    updateEvent({ setState, dispatch }: StateContext<EventStateModel>, { payload }: UpdateEvent) {
        return this.eventService.updateEvent(payload).subscribe(
            result => {
                setState(
                    patch({
                        events: updateItem(
                            x => x.id === payload.id,
                            result
                        )
                    })
                );
                dispatch(new UpdateEventSuccess());
            },
            () => dispatch(new UpdateEventError())
        );
    }

    @Action(ClearNewEvent)
    clearNewEvent({ patchState }: StateContext<EventStateModel>) {
        patchState({
            newEvent: null
        });
    }

}
