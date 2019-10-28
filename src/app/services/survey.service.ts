import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SurveyAnswerSubmition, SurveyToCreate } from '../models/mazemap.model';
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
}
