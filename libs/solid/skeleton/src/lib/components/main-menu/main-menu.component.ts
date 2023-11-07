import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from '../../services/feedback.service';
import { MenuState } from '../../state/menu.state';
import { MenuItem } from '../../state/menu.model';

@Component({
  selector: 'solid-skeleton-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  @Output() public selectMenuEntry = new EventEmitter();
  @Select(MenuState.getMenuItems)
  public MenuItems!: Observable<MenuItem[]>;
  @Output() public openGlossaryClick = new EventEmitter();
  private messages: any;
  public msgNumber: number;

  constructor(
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE)
    public feedback: FeedbackService,
  ) {
    this.messages = localStorage.getItem('solid_skeleton_messages');
    this.msgNumber = 0;
  }

  public ngOnInit(): void {
    const msgObj = JSON.parse(this.messages);
    msgObj?.forEach((msg: any) => {
      if (msg.unread && msg.type != 'CL') this.msgNumber++;
    });
  }

  public onMenuItemSelected(item: string) {
    if (item === 'info') this.msgNumber = 0;
  }
}
