import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SlideshowState } from '../../state/slideshow.state';
import { combineLatest, Observable, Subject } from 'rxjs';
import { Slideshow } from '../../state/slideshow.model';
import { Select } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SlideshowActions } from '../../state/slideshow.actions';
import { Navigate } from '@ngxs/router-plugin';
import { map, takeUntil } from 'rxjs/operators';
import { SOLID_SLIDESHOW_BASE_URL } from '../../base-url';

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
  selector: 'solid-slideshow-slideshow-select',
  templateUrl: './slideshow-select.component.html',
  styleUrls: ['./slideshow-select.component.scss'],
})
export class SlideshowSelectComponent implements OnInit, OnDestroy {
  private $destroyed = new Subject();
  public Slideshows?: Observable<Slideshow[]>;
  @Select(__internal__selectRouterParamCategoriesSlug)
  slug!: Observable<string>;
  @Select(__internal__selectCategories)
  categories!: Observable<SlideshowCategory[]>;
  @Select(SlideshowState.getSlideshowByCategories)
  categoriesSelector!: Observable<(categories: string) => []>;
  public hasNoCategories = false;
  @ViewChild('slideshow_select_container')
  public slideshow_select_container?: ElementRef;
  @ViewChild('toolbar') public Toolbar?: ElementRef;
  public lastScrollTop = 0;
  public toolbar_up = false;
  public toolbar_down = false;
  public category_name?: string;

  constructor(@Inject(SOLID_SLIDESHOW_BASE_URL) public baseUrl: string) {
    this.Slideshows = combineLatest([
      this.slug,
      this.categoriesSelector,
      this.categories,
    ]).pipe(
      map((val) => {
        this.category_name = val[2].find(
          (category: SlideshowCategory) => category.slug === val[0]
        )?.name;
        return val[1](this.category_name as string);
      }),
      takeUntil(this.$destroyed)
    );
  }

  @Dispatch()
  private load() {
    return new SlideshowActions.Load();
  }

  @Dispatch()
  private openSlideshow(id: number) {
    return new Navigate([`${id}`]);
  }

  ngOnInit(): void {
    this.load();

    // this.Slideshows?.pipe(takeUntil(this.$destroyed)).subscribe((slideshows) => {
    //   slideshows.map((slideshow) => {
    //     if (slideshow.categories === undefined) {
    //       this.hasNoCategories = true;
    //     }
    //   });

    //   if (slideshows.length === 1) {
    //     this.openSlideshow(slideshows[0].id);
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }

  public hideAndShowToolbar() {
    const delta = 5;
    const scrollTop = this.slideshow_select_container?.nativeElement.scrollTop;
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
