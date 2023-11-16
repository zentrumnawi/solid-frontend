import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from '../../services/feedback.service';
import { MenuState } from '../../state/menu.state';
import { MenuItem } from '../../state/menu.model';
import { MessageModel } from '../../models/message.model';

@Component({
  selector: 'solid-skeleton-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  @Output() public selectMenuEntry = new EventEmitter();
  @Output() public openGlossaryClick = new EventEmitter();
  @Select(MenuState.getMenuItems)
  public MenuItems!: Observable<MenuItem[]>;
  private messages = localStorage.getItem('solid_skeleton_messages');
  public msgNumber: number = 0;

  constructor(
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE)
    public feedback: FeedbackService
  ) {}

  public ngOnInit(): void {
    if (this.messages) {
      const msgObj = JSON.parse(this.messages);
      msgObj?.forEach((msg: MessageModel) => {
        if (msg.unread && msg.type != 'CL') this.msgNumber++;
      });
    }
  }

  public onMenuItemSelected(item: string) {
    if (item === 'info') this.msgNumber = 0;
  }
}
