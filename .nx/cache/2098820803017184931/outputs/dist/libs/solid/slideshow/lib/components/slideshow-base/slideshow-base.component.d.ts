import { OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Slideshow } from '../../state/slideshow.model';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { ActivatedRoute } from '@angular/router';
import * as i0 from '@angular/core';
export declare function __internal__selectRouterParam(s: any): any;
export declare class SlideshowBaseComponent implements OnInit, OnDestroy {
  routingConfig: any;
  private store;
  private route;
  private $destroyed;
  params: Observable<any>;
  SlideshowS?: Slideshow | null;
  Slideshow?: Observable<Slideshow>;
  SelectedSlideshow: boolean;
  DeepLinkFirstLoad: boolean;
  slideshowId: string;
  constructor(routingConfig: any, store: Store, route: ActivatedRoute);
  ngOnInit(): void;
  getSlideshow(slideshowId: string): void;
  selectSlideshow(data: any): void;
  goBack(): Navigate;
  ngOnDestroy(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<SlideshowBaseComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    SlideshowBaseComponent,
    'solid-slideshow-slideshow-base',
    never,
    {},
    {},
    never,
    never,
    false,
    never
  >;
}
