/**
 * @author Hamed kadkhodaie, s083485
 * @author Thomas Lien Christensen, s165242
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Feedback, FeedbackToCreate, FeedbackToUpdate, GetFeedbackInputModel } from '../models/feedback/feedback.model';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  addFeedback(feedback: FeedbackToCreate) {
    return this.http.post<Feedback>(`${this.backendBaseUrl}/api/v1/feedback/create`, feedback);
  }

  changeFeedback(feedback: FeedbackToUpdate) {
    return this.http.put<Feedback>(`${this.backendBaseUrl}/api/v1/feedback/update`, feedback);
  }

  getCurrentFeedback(feedbackToGet: GetFeedbackInputModel) {
    return this.http.get<Feedback>(`${this.backendBaseUrl}/api/v1/feedback/getCurrentUserFeedback`,
      { params: { userId: feedbackToGet.userId, locationId: feedbackToGet.locationId } });
  }
}

