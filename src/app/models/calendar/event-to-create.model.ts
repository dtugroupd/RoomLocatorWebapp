import { DateTime } from './date-time.model';

export interface EventToCreate {
    title: string;
    description: string;
    date: DateTime;
    durationInHours: number;
    durationApproximated: boolean;
    speakers: string;
}