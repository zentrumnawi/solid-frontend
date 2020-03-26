import { Component, HostListener, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, of } from 'rxjs';
import { Slideshow } from '../../state/slideshow.model';
import { SlideshowState } from '../../state/slideshow.state';
import { map, tap } from 'rxjs/operators';
import { SlideshowLoadContentAction } from '../../state/slideshow.actions';

export enum KEY {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft'
}

@Component({
  selector: 'solid-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent {
  public MaxStep = 0;
  @ViewChild('stepper', { static: false }) public Stepper!: MatStepper;
  public Slideshow: Observable<Slideshow | undefined> = of(undefined);
  @Select((s: any) => s.router.state.params['slideshowId'])
  slideshowId!: Observable<string>;
  @Select(SlideshowState.getSlideshowById) slideshowSelector!: Observable<
    (id: string) => Slideshow | undefined
  >;

  constructor(store: Store) {
    this.Slideshow = combineLatest([
      this.slideshowId,
      this.slideshowSelector
    ]).pipe(
      map(val => {
        return val[1]('determination'); // TODO: make dynamic
      }),
      tap(v => {
        if (v) {
          store.dispatch(new SlideshowLoadContentAction(v.id));
        }
      })
    );
  }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (event.key === KEY.LEFT_ARROW) {
      this.Stepper.previous();
    } else if (event.key === KEY.RIGHT_ARROW) {
      this.Stepper.next();
    }
  }

  public onNextStepClick(stepId: number) {
    if (this.MaxStep < stepId) {
      this.MaxStep = stepId;
    }
  }

  public onPanEnd($event: any) {
    if ($event.deltaX > 100) {
      this.Stepper.previous();
    } else if ($event.deltaX < -100) {
      this.Stepper.next();
    }
  }
}
