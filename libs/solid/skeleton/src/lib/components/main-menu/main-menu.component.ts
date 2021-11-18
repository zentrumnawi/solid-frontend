import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
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
export class MainMenuComponent {
  @Output() public selectMenuEntry = new EventEmitter();
  @Select(MenuState.getMenuItems)
  public MenuItems!: Observable<MenuItem[]>;

  constructor(
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE)
    public feedback: FeedbackService | null,
    private _router: Router
  ) {}

  @Dispatch()
  public async navigateTo(url: string) {
    this.selectMenuEntry.emit();
    return new Navigate([url]);
  }
}
