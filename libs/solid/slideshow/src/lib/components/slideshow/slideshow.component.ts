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
import { map, takeUntil } from 'rxjs/operators';
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
export function __internal__selectRouterParamCategoriesSlug(s: any) {
  return s.router.state.params['categoriesSlug'];
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
  @ViewChild('navigation') public Navigation?: ElementRef;
  @ViewChild('slideshow_container') public slideshow_container?: ElementRef;
  public Slideshow: Observable<Slideshow | undefined>;
  @Select(__internal__selectRouterParamSlideshowId)
  slideshowId!: Observable<string>;
  @Select(__internal__selectRouterParamCategoriesSlug)
  categoriesSlug!: Observable<string>;
  @Select(SlideshowState.getSlideshowById) slideshowSelector!: Observable<
    (id: number) => Slideshow | undefined
  >;
  public page_index = 1;
  public isMobile = false;
  public lastScrollTop = 0;
  public toolbar_up = false;
  public toolbar_down = false;
  public MaxStep = 2;

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

  ngOnInit(): void {
    this.load();
    this.Slideshow.subscribe((slideshow) => {
      this.MaxStep = slideshow?.pages.length as number;
    });
    this._breakpointObserver
      .observe(['(max-width: 450px)'])
      .subscribe((isMobile) => {
        if (isMobile.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }

  @Dispatch()
  private load() {
    return new SlideshowActions.Load();
  }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (event.key === KEY.LEFT_ARROW) {
      this.onPrevStepClick();
    } else if (event.key === KEY.RIGHT_ARROW) {
      this.onNextStepClick(this.MaxStep);
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

  public hideAndShowToolbar() {
    const delta = 5;
    const scrollTop = this.slideshow_container?.nativeElement.scrollTop;
    const toolbarHeight = this.Toolbar?.nativeElement.offsetHeight;
    if (Math.abs(this.lastScrollTop - scrollTop) <= delta) {
      return;
    }

    if (scrollTop > this.lastScrollTop && scrollTop > toolbarHeight) {
      // Scroll Down
      this.toolbar_down = false;
      this.toolbar_up = true;
    } else {
      // Scroll Up
      this.toolbar_up = false;
      this.toolbar_down = true;
    }
    this.lastScrollTop = scrollTop;
  }
}
