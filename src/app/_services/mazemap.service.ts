/**
 * @author Thomas Lien Christensen, s165242
 * @author Hadi Horani, s144885
 */

import { Injectable } from '@angular/core';
import { LibrarySection } from '../models/mazemap/library-section.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MazemapService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  fetchLibrarySections() {
    return this.http.get<LibrarySection[]>(`${this.backendBaseUrl}/api/v1/mazemap/librarysections`);
  }
}
