export interface EventToCreate {
    locationId: string;
    latitude: number;
    longitude: number;
    zLevel: number;
    title: string;
    description: string;
    date: string;
    durationInHours: number;
    durationApproximated: boolean;
    speakers: string;
}