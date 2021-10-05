import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Select } from '@ngxs/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { Slideshow } from '../../state/slideshow.model';
import { SlideshowState } from '../../state/slideshow.state';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SlideshowActions } from '../../state/slideshow.actions';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SOLID_SLIDESHOW_BASE_URL } from '../../base-url';

export enum KEY {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
}

export function __internal__selectRouterParamSlideshowId(s: any) {
  return s.router.state.params['slideshowId'];
}

@Component({
  selector: 'solid-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent implements OnInit, OnDestroy {
  private $destroyed = new Subject();
  @ViewChild('stepper', { static: false }) public Stepper!: MatStepper;
  @ViewChild('toolbar') public Toolbar?: ElementRef;
  public Slideshow: Observable<Slideshow | undefined>;
  @Select(__internal__selectRouterParamSlideshowId)
  slideshowId!: Observable<string>;
  @Select(SlideshowState.getSlideshowById) slideshowSelector!: Observable<
    (id: number) => Slideshow | undefined
  >;
  public page_index = 1;
  public isLargeScreen = false;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    @Inject(SOLID_SLIDESHOW_BASE_URL) public baseUrl: string
  ) {
    this.Slideshow = combineLatest([
      this.slideshowId,
      this.slideshowSelector,
    ]).pipe(
      map((val) => {
        return val[1](Number.parseInt(val[0], 10));
      }),
      takeUntil(this.$destroyed)
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

  public onPrevStepClick() {
    if (this.page_index > 1) {
      this.page_index--;
      this.Stepper.previous();
    }
  }

  public onNextStepClick(maxStep: number) {
    if (this.page_index < maxStep) {
      this.page_index++;
      this.Stepper.next();
    }
  }

  public onPanEnd($event: any, maxStep: number) {
    if ($event.deltaX > 100) {
      this.onPrevStepClick();
    } else if ($event.deltaX < -100) {
      this.onNextStepClick(maxStep);
    }
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }

  ngOnInit(): void {
    this.load();
    this.Slideshow.subscribe((slideshow) => {
      console.log(slideshow);
    });

    this._breakpointObserver
      .observe(['(min-width: 1000px)'])
      .subscribe((isLargeScreen) => {
        if (isLargeScreen.matches) {
          this.isLargeScreen = true;
        } else {
          this.isLargeScreen = false;
        }
      });
  }
}
