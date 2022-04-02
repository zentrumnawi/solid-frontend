import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Select } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { GetSlideshowSelect } from '../../state/slideshow-select.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesState } from '../../state/categories.state';
import { SlideshowCategory } from '../../state/categories.model';
import { GetCategories } from '../../state/categories.actions';
import { SlideshowSelectState } from '../../state/slideshow-select.state';
import { SOLID_SLIDESHOW_APP_ROUTING_CONFIG } from '../../app-config';
import { SlideshowSelectApi } from '../../state/slideshow-select.model';

@Component({
  selector: 'solid-slideshow-slideshow-select',
  templateUrl: './slideshow-select.component.html',
  styleUrls: ['./slideshow-select.component.scss'],
})
export class SlideshowSelectComponent implements OnInit, OnDestroy {
  private $destroyed = new Subject();

  @ViewChild('slideshow_select_container')
  public slideshow_select_container?: ElementRef;
  @ViewChild('toolbar') public Toolbar?: ElementRef;
  @Select(CategoriesState.getSlideshowCategoriesItems)
  public Categories!: Observable<SlideshowCategory[]>;
  @Select(SlideshowSelectState.getSlideshowSelect)
  public SlideshowSelect!: Observable<SlideshowSelectApi[]>;
  @Output() selectSlideshow = new EventEmitter<any>();

  public lastScrollTop = 0;
  public toolbar_up = false;
  public toolbar_down = false;
  public hasOnlyOneCategory = false;
  public category_name?: string;
  public step?: number;

  constructor(
    @Inject(SOLID_SLIDESHOW_APP_ROUTING_CONFIG) public routingConfig: any,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.GetSlideshowSelect();
    this.GetSlideshowCategories();
  }

  @Dispatch()
  private async GetSlideshowSelect() {
    return new GetSlideshowSelect();
  }

  @Dispatch()
  private GetSlideshowCategories() {
    return new GetCategories();
  }

  public SelectSlideshow(slug: string, slideshowid: number, pageid: number) {
    this.selectSlideshow.emit({ slug, slideshowid, pageid });
    this.router.navigate([slug, slideshowid, pageid], {
      relativeTo: this.route,
    });
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

  ngOnDestroy(): void {
    this.$destroyed.next();
  }
}
