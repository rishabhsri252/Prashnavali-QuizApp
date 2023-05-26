import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuestion } from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  public attemptedQuestions!: IQuestion[];

  fetchQuestions(subject: string) {
    return this.http.get('../../assets/subjects/' + subject + '.json');
  }
}
