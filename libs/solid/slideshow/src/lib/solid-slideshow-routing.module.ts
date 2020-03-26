import { RouterModule, Routes } from '@angular/router';
import { SlideshowComponent } from './components/slideshow/slideshow.component';

const routes: Routes = [
  { path: '', component: SlideshowComponent, data: { title: 'Bestimmungshelfer' } }
];

export const SolidSlideshowRoutingModule = RouterModule.forChild(routes);
