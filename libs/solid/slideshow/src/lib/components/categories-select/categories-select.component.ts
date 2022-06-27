import { Component, OnDestroy, OnInit } from '@angular/core';
import { SlideshowState } from '../../state/slideshow.state';
import { Observable, Subject } from 'rxjs';
import { Slideshow } from '../../state/slideshow.model';
import { Select } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { LoadSlideshow } from '../../state/slideshow.actions';
import { takeUntil } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { ActivatedRoute } from '@angular/router';

export function __internal__selectCategories(s: any) {
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
  private $destroyed = new Subject<boolean>();
  @Select(SlideshowState.getSlideshows)
  public Slideshows?: Observable<Slideshow[]>;
  @Select(__internal__selectCategories)
  Categories!: Observable<SlideshowCategory[]>;
  @Select(SlideshowState.getSlideshowByCategories)
  categoriesSelector!: Observable<(categories: string) => []>;

  constructor(private actRoute: ActivatedRoute) {}

  @Dispatch()
  private load() {
    return new LoadSlideshow();
  }

  ngOnInit(): void {
    this.load();
    this.Categories?.pipe(takeUntil(this.$destroyed)).subscribe(
      (categories) => {
        if (categories.length === 1) {
          this.openSlideshowSelect(categories[0].slug);
        }
      }
    );
  }

  @Dispatch()
  private openSlideshowSelect(slug: string) {
    return new Navigate([`${slug}`], undefined, { relativeTo: this.actRoute });
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
  }
}
