import {Route, RouterModule} from "@angular/router";
import {QuizMainComponent} from "./components/quiz-main/quiz-main.component";

const routes: Route[] = [
  {path: '', component: QuizMainComponent, data: {title: 'Selbsttest'}},
];

export const QuizRoutingModule = RouterModule.forChild(routes);
