import { Moment } from 'moment';

export interface Event {
    id: string;
    date: Moment;
    title: string;
    locationId: string;
    description: string;
    longitude: number;
    latitude: number;
    zLevel: number;
    durationInHours: number;
    durationApproximated: boolean;
    speakers: string;
}
