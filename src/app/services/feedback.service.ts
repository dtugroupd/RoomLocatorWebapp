import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback} from '../models/feedback.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  fetchUpvoted() {
    return this.http.get<Feedback[]>(`${this.backendBaseUrl}/api/v1/mazemap`);
  }
  
  fetchDownvoted() {
    return this.http.get<Feedback[]>(`${this.backendBaseUrl}/api/v1/mazemap`);
  }
  // DET SKAL VÆRE HTTPClient.Post ISTEDET

  }

