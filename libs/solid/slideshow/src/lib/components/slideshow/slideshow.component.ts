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
import { Navigate } from '@ngxs/router-plugin';

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
export function __internal__selectCategories(s: any) {
  return s.categories;
}
export interface SlideshowCategory {
  id: number;
  name: string;
  slug: string;
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
  @Select(__internal__selectCategories)
  categories!: Observable<SlideshowCategory[]>;
  @Select(SlideshowState.getSlideshowByCategoriesAndId)
  slideshowSelector!: Observable<
    (id: number, categories: string | undefined) => Slideshow | undefined
  >;
  @Select(SlideshowState.SlideshowAmountInACategory)
  slideshowAmountCounter!: Observable<
    (categories: string | undefined) => number
  >;
  public page_index = 1;
  public isMobile = false;
  public lastScrollTop = 0;
  public toolbar_up = false;
  public toolbar_down = false;
  public MaxStep = 2;
  public slideshowAmount!: number;
  public slug!: string;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    @Inject(SOLID_SLIDESHOW_BASE_URL) public baseUrl: string
  ) {
    this.Slideshow = combineLatest([
      this.categoriesSlug,
      this.slideshowId,
      this.slideshowSelector,
      this.categories,
      this.slideshowAmountCounter,
    ]).pipe(
      map((val) => {
        const category_name = val[3].find(
          (category: SlideshowCategory) => category.slug === val[0]
        )?.name;
        this.slideshowAmount = val[4](category_name);
        return val[2](Number.parseInt(val[1], 10), category_name);
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
    this.categoriesSlug.subscribe(
      (categoriesSlug) => (this.slug = categoriesSlug)
    );
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

  @Dispatch()
  public goBack() {
    if (this.slideshowAmount === 1) {
      return new Navigate([`${this.baseUrl}`]);
    }
    return new Navigate([`${this.baseUrl}`, this.slug]);
  }
}
