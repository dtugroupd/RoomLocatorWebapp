import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SurveyAnswerSubmition } from '../models/mazemap.model';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  backendBaseUrl: string;
  frontendBaseUrl: string;

  constructor(private http: HttpClient) {
    this.backendBaseUrl = environment.backendUrl;
    this.frontendBaseUrl = environment.frontendUrl;
  }

  postAnswer(answer: SurveyAnswerSubmition) {
    const options = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
        })
    };
    console.log("Trying to post..");
    return this.http.post<SurveyAnswerSubmition>(`${this.backendBaseUrl}/api/v1/survey/submitanswer`, answer, options)
        .subscribe(data => {
            console.log(data);
        });
  }

//   fetchCoordinates() {
//     return this.http.get<Mazemap[]>(`${this.backendBaseUrl}/api/v1/mazemap`);
// }

//   fetchLibrarySections() {
//     return this.http.get<LibrarySection[]>(`${this.backendBaseUrl}/api/v1/mazemap/librarysections`);
//   }
}
