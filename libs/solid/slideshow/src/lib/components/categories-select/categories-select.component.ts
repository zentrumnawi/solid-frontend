import { Component, OnDestroy, OnInit } from '@angular/core';
import { SlideshowState } from '../../state/slideshow.state';
import { Observable, Subject } from 'rxjs';
import { Slideshow } from '../../state/slideshow.model';
import { Select } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SlideshowActions } from '../../state/slideshow.actions';
import { takeUntil } from 'rxjs/operators';

export function __internal__selectRouterParamCategories(s: any) {
  return s.categories;
}
export interface SlideshowCategory {
  id: number;
  name: string;
  slug: string;
}

@Component({
  selector: 'solid-slideshow-categories-select',
  templateUrl: './categories-select.component.html',
  styleUrls: ['./categories-select.component.scss'],
})
export class CategoriesSelectComponent implements OnInit, OnDestroy {
  private $destroyed = new Subject();
  @Select(SlideshowState.getSlideshows)
  public Slideshows?: Observable<Slideshow[]>;
  @Select(__internal__selectRouterParamCategories)
  Categories!: Observable<SlideshowCategory[]>;
  @Select(SlideshowState.getSlideshowByCategories)
  categoriesSelector!: Observable<(categories: string) => []>;
  public hasNoCategories = false;

  constructor() {}

  @Dispatch()
  private load() {
    return new SlideshowActions.Load();
  }

  ngOnInit(): void {
    this.load();
    this.Slideshows?.pipe(takeUntil(this.$destroyed)).subscribe(
      (slideshows) => {
        slideshows.forEach((slideshow) => {
          if (slideshow.categories === undefined) {
            this.hasNoCategories = true;
          }
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }
}
