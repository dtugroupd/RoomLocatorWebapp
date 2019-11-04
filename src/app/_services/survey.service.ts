/**
 * @author Thomas Lien Christensen, s165242
 */

import { Injectable } from '@angular/core';
import { Survey } from '../models/survey/survey.model';
import { SurveyAnswerSubmition } from '../models/survey/survey-answer-submition.model';
import { SurveyToCreate } from '../models/survey/survey-to-create.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class SurveyService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  postSurveyAnswer(answer: SurveyAnswerSubmition) {
    const options = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
        })
    };

    return this.http.post<SurveyAnswerSubmition>(`${this.backendBaseUrl}/api/v1/survey/submitanswer`, answer, options);
  }

  createSurvey(survey: SurveyToCreate) {
    const options = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
      })
    };

    return this.http.post<SurveyToCreate>(`${this.backendBaseUrl}/api/v1/survey/create`, survey, options);
  }

  getSurveys() {
    return this.http.get<Survey[]>(`${this.backendBaseUrl}/api/v1/survey`);
  }
}
