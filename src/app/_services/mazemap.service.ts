/**
 * @author Thomas Lien Christensen, s165242
 * @author Hadi Horani, s144885
 */

import { Injectable } from '@angular/core';
import { Section } from '../models/mazemap/section.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { MapLocation } from '../models/mazemap/map-location.model';

@Injectable({
  providedIn: 'root'
})
export class MazemapService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  getLocations() {
    return this.http.get<MapLocation[]>(`${this.backendBaseUrl}/api/v1/location`);
  }

  getLocation(payload: string) {
    return this.http.get<MapLocation>(`${this.backendBaseUrl}/api/v1/location/${payload}`);
  }
}
