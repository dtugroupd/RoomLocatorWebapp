/**
 * @author Thomas Lien Christensen, s165242
 */

import { Injectable } from '@angular/core';
import { Survey } from '../models/survey/survey.model';
import { SurveyAnswerSubmition } from '../models/survey/survey-answer-submition.model';
import { SurveyToCreate } from '../models/survey/survey-to-create.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { saveAs } from 'file-saver';
import { SurveyAnswer } from '../models/survey/survey-answer.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SurveyService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  postSurveyAnswer(answer: SurveyAnswerSubmition): Observable<SurveyAnswer> {
    const options = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
        })
    };

    return this.http.post<SurveyAnswer>(`${this.backendBaseUrl}/api/v1/survey/submitanswer`, answer, options);
  }

  createSurvey(survey: SurveyToCreate) {
    const options = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
      })
    };

    return this.http.post<Survey>(`${this.backendBaseUrl}/api/v1/survey/create`, survey, options);
  }

  downloadSurveyAnswers(id: number) {
    return this.http.get(`${this.backendBaseUrl}/api/v1/survey/downloadsurveyanswers/${id}`, { responseType: 'blob', observe: 'response' })
      .subscribe(res => {
        const filename = res.headers.get('Content-Disposition').split(/[;'=]/).pop();
        const blob = new Blob(['\ufeff', res.body]);
        saveAs(blob, filename);
      });
  }

  getSurveys() {
    return this.http.get<Survey[]>(`${this.backendBaseUrl}/api/v1/survey`);
  }

  downLoadFile(data: any, type: string) {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }
}
