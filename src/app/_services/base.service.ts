/**
 * @author Thomas Lien Christensen, s165242
 */

import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

export class BaseService {

  backendBaseUrl: string;
  frontendBaseUrl: string;

  constructor(public http: HttpClient) {
    this.backendBaseUrl = environment.backendUrl;
    this.frontendBaseUrl = environment.frontendUrl;
  }

}
