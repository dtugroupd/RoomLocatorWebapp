/**
 * @author Thomas Lien Christensen, s165242
 * @author Hadi Horani, s165242
 */

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

  fetchCoordinates() {
    return this.http.get<Mazemap[]>(`${this.backendBaseUrl}/api/v1/mazemap`);
  }

  fetchLibrarySections() {
    return this.http.get<LibrarySection[]>(`${this.backendBaseUrl}/api/v1/mazemap/librarysections`);
  }
}
