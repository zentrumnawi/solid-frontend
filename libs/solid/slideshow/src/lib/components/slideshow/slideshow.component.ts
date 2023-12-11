import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Subject } from 'rxjs';
import { Slideshow } from '../../state/slideshow.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { SOLID_SLIDESHOW_APP_ROUTING_CONFIG } from '../../app-config';

export enum KEY {
  RIGHT_ARROW = 'ArrowRight',
  LEFT_ARROW = 'ArrowLeft',
}

@Component({
  selector: 'solid-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
})
export class SlideshowComponent implements OnInit, OnDestroy, AfterViewInit {
  private $destroyed = new Subject();

  @ViewChild('stepper', { static: false }) public Stepper?: MatStepper;
  @ViewChild('toolbar') public Toolbar?: ElementRef;
  @ViewChild('navigation') public Navigation?: ElementRef;
  @ViewChild('slideshow_container') public slideshow_container?: ElementRef;
  @Output() backButtonClick = new EventEmitter<void>();

  public slideshow!: Slideshow | null;
  public page_index = 0;
  public isMobile = false;
  public lastScrollTop = 0;
  public toolbar_up = false;
  public toolbar_down = false;
  public slideshowCount!: number;
  public slideshowid!: string;
  public slideshowPageid!: string;

  @Input()
  public set selectSlideshow(slideshow: Slideshow | null) {
    this.slideshow = slideshow;
    if (slideshow) {
      setTimeout(() => {
        if (this.Stepper) {
          const pagePosition = this.slideshow?.pages.findIndex(
            (page) => page.id === Number.parseInt(this.slideshowPageid),
          );
          if (pagePosition !== -1) {
            this.Stepper.selectedIndex = pagePosition;
            this.page_index = this.Stepper.selectedIndex;
          }
        }
      }, 0);
    }
  }

  constructor(
    private _breakpointObserver: BreakpointObserver,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Inject(SOLID_SLIDESHOW_APP_ROUTING_CONFIG) public routingConfig: any,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.slideshowPageid =
      this.route.firstChild?.snapshot.params['slideshowPageId'];
    this._breakpointObserver
      .observe(['(max-width: 450px)'])
      .subscribe((isMobile) => {
        if (isMobile.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  public goBack() {
    this.backButtonClick.emit();
  }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (event.key === KEY.LEFT_ARROW) {
      this.onPrevStepClick();
    } else if (event.key === KEY.RIGHT_ARROW) {
      this.onNextStepClick();
    }
  }

  public onPrevStepClick() {
    if (this.Stepper) {
      this.Stepper.previous();
      this.page_index = this.Stepper.selectedIndex;
      this.scrollToTop();
      this.router.navigate(
        [`../${this.slideshow?.pages[this.page_index].id}`],
        { relativeTo: this.route.firstChild },
      );
    }
  }

  public onNextStepClick() {
    if (this.Stepper) {
      this.Stepper.next();
      this.page_index = this.Stepper.selectedIndex;
      this.scrollToTop();
      this.router.navigate(
        [`../${this.slideshow?.pages[this.page_index].id}`],
        { relativeTo: this.route.firstChild },
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onPanEnd($event: any) {
    if ($event.deltaX > 100) {
      this.onPrevStepClick();
    } else if ($event.deltaX < -100) {
      this.onNextStepClick();
    }
  }

  public hideAndShowToolbar() {
    const delta = 5;
    const scrollTop = this.slideshow_container?.nativeElement.scrollTop;
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

  public scrollToTop() {
    const slideshowContainer = this.slideshow_container;
    if (!slideshowContainer) {
      return;
    }
    slideshowContainer.nativeElement.scrollTop = 0;
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
  }
}
