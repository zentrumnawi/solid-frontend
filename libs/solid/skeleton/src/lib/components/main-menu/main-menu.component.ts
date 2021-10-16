import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from '../../services/feedback.service';
import { MenuState } from '../../state/menu.state';
import { MenuItem } from '../../state/menu.model';
import { MenuActions } from '../../state/menu.actions';
import { CategoriesState } from '../../state/slideshow-categories.state';
import { SlideshowCategory } from '../../state/slideshow-categories.model';
import { CategoriesActions } from '../../state/slideshow-categories.actions';
import { map } from 'rxjs/operators';

export function __internal__selectSlideshow(s: any) {
  return s.slideshow;
}
export interface Slideshow {
  id: number;
  title: string;
  categories: string;
}
@Component({
  selector: 'solid-skeleton-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  @Output() public select = new EventEmitter();
  @Select(MenuState.getMenuItems)
  public MenuItems!: Observable<MenuItem[]>;
  @Select(CategoriesState.getSlideshowCategoriesItems)
  public CategoriesItems!: Observable<SlideshowCategory[]>;

  // like in comment in html file, cannot recognise at the first loading, that is not slideshow
  @Select(__internal__selectSlideshow)
  public Slideshows?: Observable<Slideshow[]>;
  public hasNoCategories = false;

  constructor(
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE)
    public feedback: FeedbackService | null,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.GetSlideshowCategories();
    this.Slideshows?.subscribe((slideshows) => {
      slideshows?.forEach((slideshow) => {
        if (slideshow.categories === undefined) {
          this.hasNoCategories = true;
        }
      });
    });
  }

  @Dispatch()
  public async navigateTo(url: string) {
    this.select.emit();
    return new Navigate([url]);
  }

  @Dispatch()
  private GetSlideshowCategories() {
    return new CategoriesActions.GetSlideshowCategories();
  }
}
