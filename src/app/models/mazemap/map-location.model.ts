import { Section } from './section.model';
import { Event } from '../../models/calendar/event.model';

export interface MapLocation {
    id: string;
    name: string;
    zoom: number;
    longitude: number;
    latitude: number;
    sections: Section[];
    events: Event[];
}
