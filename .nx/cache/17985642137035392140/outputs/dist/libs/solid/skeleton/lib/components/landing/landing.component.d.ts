import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  InjectionToken,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MenuState } from '../../state/menu.state';
import { Observable, Subject } from 'rxjs';
import { MenuItem } from '../../state/menu.model';
import { FeedbackService } from '../../services/feedback.service';
import { IntroService } from '../../services/intro.service';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { GridColumns } from '../../directives/grid-cols.directive';
import { MessagesService } from '../../services/messages.service';
import * as i0 from '@angular/core';
export declare const SOLID_SKELETON_HACKY_INJECTION: InjectionToken<() => void>;
export declare class LandingComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  feedback: FeedbackService;
  coreConfig: SolidCoreConfig;
  private introService;
  private landingDialog;
  private menuState;
  private messagesService;
  menuItems$: Observable<MenuItem[]>;
  Landing?: ElementRef;
  onGlossaryClick: EventEmitter<any>;
  destroy$: Subject<void>;
  private landingBannerKey;
  private landingTourKey;
  private messages;
  msgCount: number;
  messagesLoading: boolean;
  showLanding: boolean;
  showTour: boolean;
  innerWidth: number;
  gridColumns: GridColumns;
  landingInfo: any;
  landingRef: any;
  constructor(
    feedback: FeedbackService,
    coreConfig: SolidCoreConfig,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    introService: IntroService,
    landingDialog: MatDialog,
    menuState: MenuState,
    messagesService: MessagesService
  );
  onResize(event: Event): void;
  ngOnInit(): void;
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  private startGuidedTour;
  onNotShowAgainToggle(change: MatSlideToggleChange): void;
  onStartTourToggle(change: MatSlideToggleChange): void;
  onCloseClick(): void;
  getNewMessagesCount(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<LandingComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    LandingComponent,
    'solid-skeleton-landing',
    never,
    {},
    {},
    never,
    never,
    false,
    never
  >;
}
