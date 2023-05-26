import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizBoardComponent } from './quiz-board/quiz-board.component';
import { ResultComponent } from './result/result.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'home', redirectTo: '', component: HomeComponent
  },
  {
    path: 'quiz-board/:subject', component: QuizBoardComponent,
  },
  {
    path: 'result', component: ResultComponent
  },
  {
    path: '**', component: PageNotFoundComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)],
  ],
  exports:
    [RouterModule],
})
export class AppRoutingModule { }
export const RoutingComponents = [
  QuizBoardComponent,
  HomeComponent,
  ResultComponent,
  PageNotFoundComponent
]