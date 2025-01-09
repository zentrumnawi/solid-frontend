import { ElementRef, OnDestroy, OnInit, Type } from '@angular/core';
import { InternalSolidSkeletonConfig } from '../../solid-skeleton-config';
import { ActivatedRoute } from '@angular/router';
import { MessageModel, MessageType } from '../../models/message.model';
import { Subject } from 'rxjs';
import { MessagesService } from '../../services/messages.service';
import * as i0 from '@angular/core';
export declare class InfoComponent implements OnInit, OnDestroy {
  private msgService;
  destroy$: Subject<void>;
  tourLandingChecked: boolean;
  tourProfileChecked: boolean;
  landingChecked: boolean;
  messagesLoading: boolean;
  route: ActivatedRoute;
  profileTitle: string;
  changeLogMsg: MessageModel[];
  newsMsg: MessageModel[];
  messages: MessageModel[];
  prevTab: number;
  InfoPageContentComponent: Type<any>;
  PrivacyContentComponent: Type<any>;
  tabIndex: number;
  info_container?: ElementRef;
  constructor(
    cfg: InternalSolidSkeletonConfig,
    route: ActivatedRoute,
    msgService: MessagesService
  );
  ngOnInit(): void;
  ngOnDestroy(): void;
  moveTabToPrivacy(event: any): void;
  scrollToTop(): void;
  toggleChange(): void;
  onSelectedIndexChange(index: number): void;
  getMessages(): void;
  navigateTab(): void;
  updateMessages(type: MessageType): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<InfoComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    InfoComponent,
    'solid-skeleton-info',
    never,
    {},
    {},
    never,
    never,
    false,
    never
  >;
}
