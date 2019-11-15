
/** * 
 @author Hamed Kadkhodaie, s083485
*/

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Feedback} from '../models/feedback/feedback.model';
import { BaseService } from './base.service';
import {Observable} from "rxjs/index";
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends BaseService {

  constructor(http: HttpClient) {super(http); }

  postSurveyAnswer(feedback: Feedback) {
    const options = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
        })
    };

    return this.http.post<Feedback>(`${this.backendBaseUrl}/api/v1/feedback`, feedback, options);
  }

  }

