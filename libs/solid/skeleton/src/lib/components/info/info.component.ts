import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import {
  InternalSolidSkeletonConfig,
  SOLID_SKELETON_CONFIG,
} from '../../solid-skeleton-config';
import { ActivatedRoute } from '@angular/router';
import { MessageModel, MessageType } from '../../models/message.model';
import { Subject, takeUntil } from 'rxjs';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'solid-skeleton-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit, OnDestroy {
  public destroy$: Subject<void> = new Subject();

  public tourLandingChecked = false;
  public tourProfileChecked = false;
  public landingChecked = false;
  public messagesLoading = true;

  public route: ActivatedRoute;
  public profileTitle = '';

  public changeLogMsg: MessageModel[] = [];
  public newsMsg: MessageModel[] = [];
  public messages: MessageModel[] = [];

  public prevTab = -1;

  public InfoPageContentComponent: Type<unknown>;
  public PrivacyContentComponent: Type<unknown>;

  tabIndex = 0;
  @ViewChild('info_container') public info_container?: ElementRef;

  constructor(
    @Inject(SOLID_SKELETON_CONFIG) cfg: InternalSolidSkeletonConfig,
    route: ActivatedRoute,
    private msgService: MessagesService,
  ) {
    this.InfoPageContentComponent = cfg.infoPageContent;
    this.PrivacyContentComponent = cfg.privacyContent;
    this.profileTitle = cfg.routingConfig.profile.title;
    this.landingChecked =
      localStorage.getItem('hide_landing_banner') === 'false';
    this.tourLandingChecked =
      localStorage.getItem('hide_landing_tour') === 'false';
    this.tourProfileChecked =
      localStorage.getItem('hide_profile_tour') === 'false';
    this.route = route;
  }

  ngOnInit(): void {
    this.getMessages();
    this.navigateTab();

    if (this.tabIndex === 2) {
      this.prevTab = 2;
      this.updateMessages(MessageType.Notice);
    } else if (this.tabIndex === 3) {
      this.prevTab = 3;
      this.updateMessages(MessageType.Changelog);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.msgService.updateMessageState(this.messages);
  }

  moveTabToPrivacy(event: MouseEvent) {
    event.preventDefault();
    this.tabIndex = 1;
  }

  public scrollToTop() {
    const info_container = this.info_container;
    if (!info_container || info_container.nativeElement.scrollTop === 0) {
      return;
    }
    info_container.nativeElement.scrollTop = 0;
  }

  public toggleChange() {
    if (this.tourLandingChecked)
      localStorage.setItem('hide_landing_tour', 'false');
    else localStorage.setItem('hide_landing_tour', 'true');
    if (this.tourProfileChecked)
      localStorage.setItem('hide_profile_tour', 'false');
    else localStorage.setItem('hide_profile_tour', 'true');
    if (this.landingChecked)
      localStorage.setItem('hide_landing_banner', 'false');
    else localStorage.setItem('hide_landing_banner', 'true');
  }

  public onSelectedIndexChange(index: number) {
    if (this.prevTab === 2 || this.prevTab === 3) {
      this.msgService.updateMessageState(this.messages);
    }

    if (index === 2) {
      this.updateMessages(MessageType.Notice);
    } else if (index === 3) {
      this.updateMessages(MessageType.Changelog);
    }
    this.prevTab = index;
  }

  public getMessages() {
    this.messagesLoading = true;
    this.msgService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((msgs) => {
        this.newsMsg = msgs.filter((msg: MessageModel) => {
          return msg.type !== MessageType.Changelog;
        });
        this.changeLogMsg = msgs.filter((msg: MessageModel) => {
          return msg.type === MessageType.Changelog;
        });
        this.messages = msgs;
        this.messagesLoading = false;
      });
  }

  public navigateTab() {
    const directTo = this.route.snapshot.queryParams.directTo;
    switch (directTo) {
      case 'privacy':
        this.tabIndex = 1;
        break;

      case 'news':
        this.tabIndex = 2;
        break;

      default:
        this.tabIndex = 0;
        break;
    }
  }

  public updateMessages(type: MessageType) {
    switch (type) {
      case MessageType.Changelog:
        this.messages = this.messages.map((msg: MessageModel) => {
          if (msg.type === MessageType.Changelog) {
            return { ...msg, unread: false };
          } else {
            return msg;
          }
        });
        break;
      case MessageType.Notice:
      case MessageType.Series:
        this.messages = this.messages.map((msg: MessageModel) => {
          if (msg.type !== MessageType.Changelog) {
            return { ...msg, unread: false };
          } else {
            return msg;
          }
        });
        break;
      default:
        return;
    }
  }
}
