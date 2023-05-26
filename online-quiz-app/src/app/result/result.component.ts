import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestion } from '../interfaces/question';
import { QuestionsService } from '../services/questions.service';
import { Utils } from '../services/utils.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private questionService: QuestionsService, private utils: Utils, private router: Router) { }
  attemptedQuestions!: IQuestion[];
  scoreObtained!: number;
  status!: string[];

  ngOnInit(): void {
    this.attemptedQuestions = this.questionService.attemptedQuestions;
    this.scoreObtained = this.utils.getScore(this.attemptedQuestions);
  }

  restartQuiz() {
    this.router.navigate(['/home']);
  }

}
