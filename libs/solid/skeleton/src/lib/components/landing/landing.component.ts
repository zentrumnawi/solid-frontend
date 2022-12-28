import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  InjectionToken,
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

export const SOLID_SKELETON_HACKY_INJECTION = new InjectionToken<() => void>(
  'solid-skeleton-hacky-injection'
);

@Component({
  selector: 'solid-skeleton-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, AfterViewInit {
  @Select(MenuState.getLandingItems)
  public MenuItems!: Observable<MenuItem[]>;

  @ViewChild('landing') Landing?: ElementRef;
  public onGlossaryClick = new EventEmitter();

  public landingInfo: any;
  public innerWidth: any;
  public showLanding: boolean;
  public showTour: boolean;
  public landingRef: any;
  private messages: any;
  public msgNumber: number;
  public columns: any;

  constructor(
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE) public feedback: FeedbackService,
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private introService: IntroService,
    private landingDialog: MatDialog
  ) {
    this.landingInfo = coreConfig.landingBannerContent;
    this.innerWidth = window.innerWidth;
    this.showLanding =
      localStorage.getItem('hide_landing_banner') == 'false' ? true : false;
    this.showTour =
      localStorage.getItem('hide_landing_tour') == 'false' ? true : false;
    this.messages = localStorage.getItem('solid_skeleton_messages');
    this.msgNumber = 0;

    iconRegistry.addSvgIcon(
      'glossary',
      sanitizer.bypassSecurityTrustResourceUrl(coreConfig.glossaryLogo)
    );

    iconRegistry.addSvgIcon(
      'feedback',
      sanitizer.bypassSecurityTrustResourceUrl(coreConfig.feedbackLogo)
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 700 && this.landingRef) {
      this.landingRef.close();
      this.showTour = false;
    }
    if (this.innerWidth > 1600) this.columns = 7;
    else if (this.innerWidth > 700 && this.innerWidth < 1600) this.columns = 4;
    else this.columns = 2;
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

  public onCloseClick() {
    this.showLanding = false;
    localStorage.setItem('hide_landing_banner', 'true');
  }

  public ngOnInit(): void {
    if (this.innerWidth > 1600) this.columns = 7;
    else if (this.innerWidth > 700 && this.innerWidth < 1600) this.columns = 4;
    else this.columns = 2;
    const msgObj = JSON.parse(this.messages);
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
}
