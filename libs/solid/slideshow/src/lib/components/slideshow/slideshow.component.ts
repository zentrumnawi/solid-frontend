import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Select } from '@ngxs/store';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { Slideshow } from '../../state/slideshow.model';
import { SlideshowState } from '../../state/slideshow.state';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SlideshowActions } from '../../state/slideshow.actions';

export enum KEY {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft'
}

@Component({
  selector: 'solid-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit, OnDestroy {
  private $destroyed = new Subject();
  public MaxStep = 0;
  @ViewChild('stepper', { static: false }) public Stepper!: MatStepper;
  public Slideshow: Observable<Slideshow | undefined>;
  @Select((s: any) => s.router.state.params['slideshowId'])
  slideshowId!: Observable<string>;
  @Select(SlideshowState.getSlideshowById) slideshowSelector!: Observable<
    (id: number) => Slideshow | undefined
  >;

  constructor() {
    this.Slideshow = combineLatest([
      this.slideshowId,
      this.slideshowSelector
    ]).pipe(
      map(val => {
        return val[1](Number.parseInt(val[0], 10));
      }),
      tap(() => this.MaxStep = 0),
      takeUntil(this.$destroyed),
    );
  }

  @Dispatch()
  private load() {
    return new SlideshowActions.Load();
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

  ngOnDestroy(): void {
    this.$destroyed.next();
  }

  ngOnInit(): void {
    this.load();
  }
}
