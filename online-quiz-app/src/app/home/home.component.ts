import { Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  subjects = [
    'javascript',
    'english',
  ];

  selectedSubject = '';
  countdownOverlay = false;
  countTimer: number | undefined;
  constructor(
    private router: Router,
  ) { }

  startQuiz() {
    this.countdownOverlay = true;
    setTimeout(() => {
      this.router.navigate(['/quiz-board', this.selectedSubject]);
    }, 3000);
  }
}
