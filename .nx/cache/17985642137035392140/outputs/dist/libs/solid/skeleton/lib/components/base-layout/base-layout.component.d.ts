import { OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UpdateService } from '../../services/update.service';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { FeedbackService } from '../../services/feedback.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import * as i0 from '@angular/core';
export declare class BaseLayoutComponent implements OnInit {
  feedback: FeedbackService;
  config: SolidCoreConfig;
  private _breakpointObserver;
  private _router;
  FixedLayout: boolean;
  subscription: Subscription;
  title: string;
  MainMenu?: MatDrawer;
  Glossary?: MatDrawer;
  constructor(
    feedback: FeedbackService,
    config: SolidCoreConfig,
    update: UpdateService,
    _breakpointObserver: BreakpointObserver,
    _router: Router
  );
  ngOnInit(): void;
  onMenuSelectionChanged(): Promise<void>;
  onMenuGlossaryClick(): void;
  closeMenu(): void;
  reportError(): void;
  onLandingGlossaryClick(ref: any): void;
  unsubscribe(): void;
  navigateTo(url: string): Promise<Navigate>;
  profileTitle(ref: any): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<BaseLayoutComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    BaseLayoutComponent,
    'solid-skeleton-base-layout',
    never,
    {},
    {},
    never,
    never,
    false,
    never
  >;
}
