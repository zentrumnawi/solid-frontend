import { RouterModule, Routes } from '@angular/router';
import { SlideshowSelectComponent } from './components/slideshow-select/slideshow-select.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';

const routes: Routes = [
  {
    path: '',
    component: SlideshowSelectComponent,
    data: { title: 'Bestimmungshelfer' }
  },
  {
    path: ':slideshowId',
    component: SlideshowComponent,
    data: { title: 'Bestimmungshelfer' }
  }
];

export const SolidSlideshowRoutingModule = RouterModule.forChild(routes);
