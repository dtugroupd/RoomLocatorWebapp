import { Moment } from 'moment';

export interface Event {
    id: string;
    date: Moment;
    title: string;
    description: string;
    durationInHours: number;
    durationApproximated: boolean;
    speakers: string;
}
