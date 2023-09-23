import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuState } from '../../state/menu.state';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MenuItem } from '../../state/menu.model';
import { Select } from '@ngxs/store';
import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from '../../services/feedback.service';
import { IntroService } from '../../services/intro.service';
import { SolidCoreConfig, SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { LandingBannerDialogComponent } from '../landing-banner-dialog/landing-banner-dialog.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { GridColumns } from '../../directives/grid-cols.directive';
import { MessageModel, MessageType } from '../../models/message.model';
import { MessagesService } from '../../services/messages.service';

export const SOLID_SKELETON_HACKY_INJECTION = new InjectionToken<() => void>(
  'solid-skeleton-hacky-injection'
);

@Component({
  selector: 'solid-skeleton-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  @Select(MenuState.getLandingItems)
  public menuItems$!: Observable<MenuItem[]>;

  @ViewChild('landing') Landing?: ElementRef;
  public onGlossaryClick = new EventEmitter();

  public destroy$ = new Subject<void>();

  private landingBannerKey = 'hide_landing_banner';
  private landingTourKey = 'hide_landing_tour';

  private messages: MessageModel[] = [];
  public msgNumber = 0;
  public isFetching = true;

  public showLanding =
    localStorage.getItem(this.landingBannerKey) == 'false' ? true : false;
  public showTour =
    localStorage.getItem(this.landingTourKey) == 'false' || this.showLanding
      ? true
      : false;

  public innerWidth = window.innerWidth;
  public gridColumns!: GridColumns;

  public landingInfo: any;
  public landingRef: any;

  constructor(
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE) public feedback: FeedbackService,
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private introService: IntroService,
    private landingDialog: MatDialog,
    private menuState: MenuState,
    private messagesService: MessagesService
  ) {
    iconRegistry.addSvgIcon(
      'glossary_custom',
      sanitizer.bypassSecurityTrustResourceUrl(coreConfig.glossaryLogo)
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 700 && this.landingRef) {
      this.landingRef.close();
      this.showTour = false;
    }
  }

  public ngOnInit(): void {
    this.getNewMessagesNumber();
    const itemsNum = this.menuState.getItemsNum();
    this.gridColumns = { xs: 2, sm: 3, md: 3, lg: 3, xl: itemsNum + 2 };
    this.landingInfo = this.coreConfig.landingBannerContent;
  }

  public ngAfterViewInit(): void {
    if (this.innerWidth < 700 && this.showLanding) {
      this.landingRef = this.landingDialog.open(LandingBannerDialogComponent, {
        panelClass: 'landing-banner-dialog',
      });
      this.landingRef.afterClosed().subscribe(() => {
        if (this.showTour) this.startGuidedTour();
      });
    } else if (!this.showLanding && this.showTour) this.startGuidedTour();
  }

  public ngOnDestroy(): void {
    if (this.showTour) localStorage.setItem(this.landingTourKey, 'false');
    this.destroy$.next();
    this.destroy$.complete();
  }

  private startGuidedTour(): void {
    setTimeout(() => {
      this.introService.guidedTour((_targetElement: any) => {
        try {
          const id = _targetElement.id;
          const landing = this.Landing?.nativeElement;
          const menuOffSetTop =
            document.getElementById('menu-grid-list')?.offsetTop;

          if (id.slice(0, 9) == 'menu-tile' || id == 'feedback') {
            if (menuOffSetTop) landing.scrollTop = menuOffSetTop - 50;
          }

          if (id == '') {
            if (menuOffSetTop) landing.scrollTop = 0;
          }
        } catch (error) {
          return;
        }
        return;
      });
    }, 500);
  }

  public onNotShowAgainToggle(change: MatSlideToggleChange) {
    if (change.checked) localStorage.setItem(this.landingBannerKey, 'true');
    else localStorage.setItem(this.landingBannerKey, 'false');
  }

  public onStartTourToggle(change: MatSlideToggleChange) {
    this.showTour = !this.showTour;
    if (change.checked) localStorage.setItem(this.landingTourKey, 'false');
    else localStorage.setItem(this.landingTourKey, 'true');
  }

  public onCloseClick() {
    this.showLanding = false;
    localStorage.setItem(this.landingBannerKey, 'true');
    if (this.showTour) {
      localStorage.setItem(this.landingTourKey, 'false');
      this.startGuidedTour();
    }
  }

  public getNewMessagesNumber() {
    this.messagesService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((msgs: MessageModel[]) => {
        this.messages = msgs.filter((msg: MessageModel) => {
          return msg.unread && msg.type !== MessageType.Changelog;
        });
        this.msgNumber = this.messages.length;
        this.isFetching = false;
      });
  }
}
