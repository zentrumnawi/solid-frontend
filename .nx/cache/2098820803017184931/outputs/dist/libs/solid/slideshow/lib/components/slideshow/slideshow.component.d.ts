import {
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
  OnDestroy,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Slideshow } from '../../state/slideshow.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import * as i0 from '@angular/core';
export declare enum KEY {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
}
export declare class SlideshowComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private _breakpointObserver;
  routingConfig: any;
  private cdr;
  private route;
  private router;
  private $destroyed;
  Stepper?: MatStepper;
  Toolbar?: ElementRef;
  Navigation?: ElementRef;
  slideshow_container?: ElementRef;
  backButtonClick: EventEmitter<any>;
  slideshow: Slideshow | null;
  page_index: number;
  isMobile: boolean;
  lastScrollTop: number;
  toolbar_up: boolean;
  toolbar_down: boolean;
  slideshowCount: number;
  slideshowid: string;
  slideshowPageid: string;
  set selectSlideshow(slideshow: Slideshow | null);
  constructor(
    _breakpointObserver: BreakpointObserver,
    routingConfig: any,
    cdr: ChangeDetectorRef,
    route: ActivatedRoute,
    router: Router
  );
  ngOnInit(): void;
  ngAfterViewInit(): void;
  goBack(): void;
  keyEvent(event: KeyboardEvent): void;
  onPrevStepClick(): void;
  onNextStepClick(): void;
  onPanEnd($event: any): void;
  hideAndShowToolbar(): void;
  scrollToTop(): void;
  ngOnDestroy(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<SlideshowComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    SlideshowComponent,
    'solid-slideshow',
    never,
    { selectSlideshow: { alias: 'selectSlideshow'; required: false } },
    { backButtonClick: 'backButtonClick' },
    never,
    never,
    false,
    never
  >;
}
