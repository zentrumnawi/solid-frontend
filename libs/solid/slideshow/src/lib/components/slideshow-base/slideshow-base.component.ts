/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SlideshowState } from '../../state/slideshow.state';
import { Observable, Subject } from 'rxjs';
import { Slideshow } from '../../state/slideshow.model';
import { Select, Store } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { AddSlideshow } from '../../state/slideshow.actions';
import { map, takeUntil } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { ActivatedRoute } from '@angular/router';
import { SOLID_SLIDESHOW_APP_ROUTING_CONFIG } from '../../app-config';

export function __internal__selectRouterParam(s: any) {
  return s.router.state.params;
}

@Component({
  selector: 'solid-slideshow-slideshow-base',
  templateUrl: './slideshow-base.component.html',
  styleUrls: ['./slideshow-base.component.scss'],
})
export class SlideshowBaseComponent implements OnInit, OnDestroy {
  private $destroyed = new Subject<void>();

  @Select(__internal__selectRouterParam)
  params!: Observable<any>;

  public SlideshowS?: Slideshow | null = null;
  public Slideshow?: Observable<Slideshow>;
  public SelectedSlideshow = false;
  public DeepLinkFirstLoad = false;
  public slideshowId!: string;

  constructor(
    @Inject(SOLID_SLIDESHOW_APP_ROUTING_CONFIG) public routingConfig: any,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.params.pipe(takeUntil(this.$destroyed)).subscribe((x) => {
      if (Object.keys(x).length === 0) {
        this.SelectedSlideshow = false;
        this.DeepLinkFirstLoad = false;
      }
    });

    this.slideshowId = this.route.firstChild?.snapshot.params['slideshowId'];
    if (this.slideshowId) {
      this.getSlideshow(this.slideshowId);
      this.SelectedSlideshow = true;
      this.DeepLinkFirstLoad = true;
    }
  }

  getSlideshow(slideshowId: string) {
    this.store.dispatch(new AddSlideshow(slideshowId));
    this.Slideshow = this.store
      .select(SlideshowState.getSlideshowById)
      .pipe(map((fn) => fn(slideshowId)));
  }

  selectSlideshow(data: any) {
    this.SelectedSlideshow = true;
    if (data.slideshowid) {
      this.getSlideshow(data.slideshowid);
    }
  }

  @Dispatch()
  goBack() {
    this.SelectedSlideshow = false;
    this.DeepLinkFirstLoad = false;
    return new Navigate([`${this.routingConfig.url}`]);
  }

  ngOnDestroy(): void {
    this.$destroyed.next();
  }
}
