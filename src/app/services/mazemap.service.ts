import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mazemap, LibrarySection } from '../models/mazemap.model';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MazemapService {

  backendBaseUrl: string;
  frontendBaseUrl: string;

  constructor(private http: HttpClient) {
    this.backendBaseUrl = environment.backendUrl;
    this.frontendBaseUrl = environment.frontendUrl;
  }

  fetchCoordinates() {
    return this.http.get<Mazemap[]>(`${this.backendBaseUrl}/api/v1/mazemap`);
}

  fetchLibrarySections() {
    return this.http.get<LibrarySection[]>(`${this.backendBaseUrl}/api/v1/mazemap/librarysections`);
  }
}
