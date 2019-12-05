/**
 * @author Thomas Lien Christensen, s165242
 * @author Andreas Gøricke, s153804
 */

import { EventToCreate } from '../models/calendar/event-to-create.model';
import { EventToUpdate } from '../models/calendar/event-to-update.model';
import { EventToDelete } from '../models/calendar/event.model';

export class GetEvents {
    static readonly type = '[Event] Get';
}

export class AddEvent {
    static readonly type = '[Event] Add';
    constructor(public payload: EventToCreate) {}
}

export class UpdateEvent {
    static readonly type = '[Event] Update';
    constructor(public payload: EventToUpdate) { }
}

export class AddEventSuccess {
    static readonly type = '[AddEvent] Success';
}

export class AddEventError {
    static readonly type = '[AddEvent] Error';
}

export class UpdateEventSuccess {
  static readonly type = '[UpdateEvent] Success';
}

export class UpdateEventError {
  static readonly type = '[UpdateEvent] Error';
}

export class ClearNewEvent {
    static readonly type = '[NewEvent] Clear';
}

export class DeleteEvent {
    static readonly type = '[Event] Delete';
    constructor(public payload: EventToDelete) { }
}

export class DeleteEventSuccess {
    static readonly type = '[EventDelete] Success';
}

export class DeleteEventError {
    static readonly type = '[EventDelete] Error';
}
