import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mazemap, LibrarySection } from '../models/mazemap.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MazemapService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  fetchSensors() {
    return this.http.get<Mazemap[]>(`${this.backendBaseUrl}/api/v1/sensor`);
  }
}
