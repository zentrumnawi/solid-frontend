import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SlideshowCategory } from '../../state/categories.model';
import { SlideshowSelectApi } from '../../state/slideshow-select.model';
import * as i0 from '@angular/core';
export declare class SlideshowSelectComponent implements OnInit, OnDestroy {
  routingConfig: any;
  private route;
  private router;
  private $destroyed;
  slideshow_select_container?: ElementRef;
  Toolbar?: ElementRef;
  Categories: Observable<SlideshowCategory[]>;
  SlideshowSelect: Observable<SlideshowSelectApi[]>;
  selectSlideshow: EventEmitter<any>;
  lastScrollTop: number;
  toolbar_up: boolean;
  toolbar_down: boolean;
  hasOnlyOneCategory: boolean;
  category_name?: string;
  step?: number;
  constructor(routingConfig: any, route: ActivatedRoute, router: Router);
  ngOnInit(): void;
  private GetSlideshowSelect;
  private GetSlideshowCategories;
  SelectSlideshow(slug: string, slideshowid: number, pageid: number): void;
  hideAndShowToolbar(): void;
  ngOnDestroy(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<SlideshowSelectComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    SlideshowSelectComponent,
    'solid-slideshow-slideshow-select',
    never,
    {},
    { selectSlideshow: 'selectSlideshow' },
    never,
    never,
    false,
    never
  >;
}
