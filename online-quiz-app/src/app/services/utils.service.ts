import { Observable } from "rxjs/internal/Observable";
import { IQuestion } from "../interfaces/question";

export class Utils {
  getTimer(limit: number) {
    let customCountObservable = Observable.create((observer: { next: (arg0: number) => void; error: (arg0: string) => void; complete: () => void; }) => {
      let count = limit;
      setInterval(() => {
        observer.next(count);
        if (count == 0) {
          observer.complete();
        }
        count--;
      }, 1000);
    });
    return customCountObservable;
  }

  getAttemptedQuestions(questions: IQuestion[]) {
    questions.forEach((question) => {
      if (question['selectedOption'] === '') {
        question['status'] = 'unattempted';
      }
      else if (question['answer'] === question['selectedOption']) {
        question['status'] = 'correct';
      } else {
        question['status'] = 'incorrect';
      }
    });

    return questions;
  }

  getScore(questions: IQuestion[]) {
    let score = 0;
    questions.forEach(question => {
      if (question['status'] === 'correct') {
        score++;
      }
    });
    return score;
  }
}