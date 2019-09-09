import {Route, RouterModule} from "@angular/router";
import {QuizStartComponent} from "./components/quiz-start/quiz-start.component";
import {QuizMainComponent} from "./components/quiz-main/quiz-main.component";

const routes: Route[] = [
  {path: '', component: QuizStartComponent, data: {title: 'Quiz'}},
  {path: ':count', component: QuizMainComponent, data: {title: 'Quiz'}},
];

export const QuizRoutingModule = RouterModule.forChild(routes);
