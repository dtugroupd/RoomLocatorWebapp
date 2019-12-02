/**
 * @author Thomas Lien Christensen, s165242
 * @author Andreas Gøricke, s153804
 */

import { EventToCreate } from '../models/calendar/event-to-create.model';
import { EventToUpdate } from '../models/calendar/event-to-update.model';

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
