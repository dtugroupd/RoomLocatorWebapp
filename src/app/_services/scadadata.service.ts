/**
 * @author Andreas Gøricke, s153804
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { ScadadataInfo } from '../models/sensors/scadadata-info.model';


@Injectable({
  providedIn: 'root'
})

export class ScadadataService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  getStatus() {
    return this.http.get<ScadadataInfo>(`${this.backendBaseUrl}/api/v1/scadadata/getstatus`);
  }

 
}
