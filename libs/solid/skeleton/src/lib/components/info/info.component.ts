import { Component, Inject, Type } from '@angular/core';
import {
  InternalSolidSkeletonConfig,
  SOLID_SKELETON_CONFIG,
} from '../../solid-skeleton-config';
import { MessageState } from '../../state/message.state';
import { Select } from '@ngxs/store';
import { MessageModel } from '../../state/message.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'solid-skeleton-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  public InfoPageContentComponent: Type<any>;
  public PrivacyContentComponent: Type<any>;
  @Select(MessageState.getChangelog)
  public Changelog!: Observable<MessageModel[]>;

  @Select(MessageState.getNoticesAndSeries)
  public Notices!: Observable<MessageModel[]>;

  constructor(@Inject(SOLID_SKELETON_CONFIG) cfg: InternalSolidSkeletonConfig) {
    this.InfoPageContentComponent = cfg.infoPageContent;
    this.PrivacyContentComponent = cfg.privacyContent;
  }
}
