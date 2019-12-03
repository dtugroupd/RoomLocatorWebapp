import { Section } from './section.model';
// import { Event } from '../../models/'

export interface MapLocation {
    id: string;
    name: string;
    zoom: number;
    longitude: number;
    latitude: number;
    sections: Section[];
    events: Event[];
}
