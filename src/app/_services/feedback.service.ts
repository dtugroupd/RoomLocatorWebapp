

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Feedback} from '../models/feedback/feedback.model';
import { BaseService } from './base.service';

/**
 * @author Hamed kadkhodaie, s083485
 */

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService {

 addUpvote(upVotedFeedback: boolean) {
    return this.http.post<Feedback>(`${this.backendBaseUrl}/api/v1/feedback/create`, upVotedFeedback);
}

 addDownvote(downVotedFeedback: boolean) {
  return this.http.post<Feedback>(`${this.backendBaseUrl}/api/v1/feedback/create`, downVotedFeedback);
}

  }

