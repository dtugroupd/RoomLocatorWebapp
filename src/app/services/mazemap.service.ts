import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mazemap } from '../models/mazemap.model';

@Injectable({
  providedIn: 'root'
})
export class MazemapService {

  constructor(private http: HttpClient) {}

  fetchCoordinates() {
    return this.http.get<Mazemap[]>('https://localhost:5001/api/v1/mazemap');
}
}
