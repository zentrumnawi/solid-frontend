import {RouterModule, Routes} from '@angular/router';
import {SlideshowComponent} from './components/slideshow/slideshow.component';

const routes: Routes = [
  {path: ':slideshowId', component: SlideshowComponent, data: {title: 'Bestimmungshelfer'}},
];

export const SlideshowRoutingModule = RouterModule.forChild(routes);
