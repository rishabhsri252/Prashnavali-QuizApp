import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, filter, map } from 'rxjs';
import { IQuestion } from '../interfaces/question';
import { QuestionsService } from '../services/questions.service';
import { Utils } from '../services/utils.service';


@Component({
  selector: 'app-quiz-board',
  templateUrl: './quiz-board.component.html',
  styleUrls: ['./quiz-board.component.css']
})
export class QuizBoardComponent implements OnInit {

  countTimer!: number;
  timerLimit!: number;
  selectedSubject = ''
  timerSubscription!: Subscription;
  questions!: IQuestion[];
  showReviewBoard = false;
  showQuizBoard = false;
  toggleState = 'quiz-board';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utils: Utils,
    private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.selectedSubject = this.route.snapshot.params['subject'];
    this.questionService.fetchQuestions(this.selectedSubject).subscribe((response) => {
      this.questions = response as IQuestion[];
      this.length = this.questions.length;
      this.timerLimit = this.questions.length * 10;
    },
      (error: string) => {
        console.log(error);
      },
      () => {
        this.showQuizBoard = true;
        this.getTimer();
      });
  }

  getTimer() {
    let timer = this.utils.getTimer(this.timerLimit);
    this.timerSubscription = timer.subscribe((data: number) => {
      this.countTimer = data;
    },
      (error: string) => {
        console.log(error);
      },
      () => {
        this.submitQuiz();
      });
  }

  toggleQuizBoard() {
    this.showReviewBoard = false;
    this.showQuizBoard = true;
  }

  toggleReviewBoard() {
    this.showReviewBoard = true;
    this.showQuizBoard = false;
  }

  toggleQuestion(indexOfSelectedQuestion: number) {
    this.pageIndex = indexOfSelectedQuestion;
    this.toggleState = 'quiz-board';
    this.toggleQuizBoard();
  }

  submitQuiz() {
    this.timerSubscription.unsubscribe();
    this.questionService.attemptedQuestions = this.utils.getAttemptedQuestions(this.questions);
    this.router.navigate(['/result']);
  }


  /*
  Pagination values and method
  */
  length!: number;
  pageSize = 1;
  pageIndex = 0;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

}
