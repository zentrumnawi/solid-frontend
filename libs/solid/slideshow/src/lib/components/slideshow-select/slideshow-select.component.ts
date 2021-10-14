import { Component, OnDestroy, OnInit } from '@angular/core';
import { SlideshowState } from '../../state/slideshow.state';
import { combineLatest, Observable, Subject } from 'rxjs';
import { Slideshow } from '../../state/slideshow.model';
import { Select } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SlideshowActions } from '../../state/slideshow.actions';
import { Navigate } from '@ngxs/router-plugin';
import { map, takeUntil } from 'rxjs/operators';

export function __internal__selectRouterParamCategoriesSlug(s: any) {
  return s.router.state.params['categoriesSlug'];
}
export function __internal__selectRouterParamCategories(s: any) {
  console.log(s);

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
  // @Select(CategoryState.getSlideshowCategoriesItems)
  // public Categories!: Observable<SlideshowCategory[]>;
  @Select(__internal__selectRouterParamCategoriesSlug)
  slug!: Observable<string>;
  @Select(__internal__selectRouterParamCategories)
  categories!: Observable<SlideshowCategory[]>;
  @Select(SlideshowState.getSlideshowByCategories)
  categoriesSelector!: Observable<(categories: string) => []>;
  public hasNoCategories = false;

  constructor() {
    this.Slideshows = combineLatest([
      this.slug,
      this.categoriesSelector,
      this.categories,
    ]).pipe(
      map((val) => {
        const name = val[2].find(
          (category: SlideshowCategory) => category.slug === val[0]
        )?.name;
        return val[1](name as string);
      }),
      takeUntil(this.$destroyed)
    );
  }

  @Dispatch()
  private load() {
    return new SlideshowActions.Load();
  }

  // @Dispatch()
  // private GetSlideshowCategories() {
  //   return new CategoriesActions.GetSlideshowCategories();
  // }

  @Dispatch()
  private openSlideshow(id: number) {
    return new Navigate([`${id}`]);
  }

  ngOnInit(): void {
    this.load();
    // this.GetSlideshowCategories();

    // this.categories.subscribe((x) => console.log(x));
    // this.Slideshows?.subscribe((x) => console.log(x));
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
}
