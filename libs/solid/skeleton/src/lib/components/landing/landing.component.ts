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
import { Observable } from 'rxjs';
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

  private landingBannerKey = 'hide_landing_banner';
  private landingTourKey = 'hide_landing_tour';
  private messageKey = 'solid_skeleton_messages';

  public showLanding =
    localStorage.getItem(this.landingBannerKey) == 'false' ? true : false;
  public showTour =
    localStorage.getItem(this.landingTourKey) == 'false' || this.showLanding
      ? true
      : false;
  public messages = localStorage.getItem(this.messageKey);
  public msgNumber = 0;

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
    private menuState: MenuState
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

  public ngOnInit(): void {
    const itemsNum = this.menuState.getItemsNum();
    this.gridColumns = { xs: 2, sm: 3, md: 3, lg: 3, xl: itemsNum + 2 };

    this.landingInfo = this.coreConfig.landingBannerContent;

    const msgObj = this.messages ? JSON.parse(this.messages) : null;
    msgObj?.forEach((msg: any) => {
      if (msg.unread && msg.type != 'CL') this.msgNumber++;
    });
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
  }
}
