import { LibrarySection } from './mazemap.model';

export interface sensor {
    id: number;
    value: number;
}

export interface sensorData {
    sensor: sensor;
    humidty: number;
    co2level: number;
    light: number;
    section: LibrarySection;
}