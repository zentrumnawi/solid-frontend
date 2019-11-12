import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {SlideshowComponent} from './components/slideshow/slideshow.component';

import {SlideshowRoutingModule} from './slideshow-routing.module';
import {NgxsModule} from "@ngxs/store";
import {SlideshowState} from "./state/slideshow.state";

@NgModule({
  declarations: [SlideshowComponent],
  imports: [
    SharedModule,
    SlideshowRoutingModule,
    NgxsModule.forFeature([SlideshowState]),
  ],
})
export class SlideshowModule {
}
