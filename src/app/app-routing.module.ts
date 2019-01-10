import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InfoComponent} from './components/info/info.component';

const routes: Routes = [
  {path: 'info', component: InfoComponent, data: {title: 'Informationen'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
