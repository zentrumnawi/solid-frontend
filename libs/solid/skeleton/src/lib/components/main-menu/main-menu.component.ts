import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { FeedbackService, SOLID_SKELETON_FEEDBACK_SERVICE } from '../../services/feedback.service';

interface MenuItem {
  route: string;
  title: string;
  icon?: string;
  svgIcon?: string;
}

@Component({
  selector: 'solid-skeleton-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  @Output() public select = new EventEmitter();
  public MenuItems: MenuItem[] = [];
  @Select((s: any) => s.router?.state?.url)
  public $activeRoute!: Observable<string>;

  constructor(
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE) public feedback: FeedbackService | null,
    private _router: Router) {
  }

  ngOnInit(): void {
    for (let route of this._router.config.sort((a, b) => a.data?.order - b.data?.order)) {
      if (route.data?.menuItem) {
        this.MenuItems.push({
          route: route.path || '',
          title: route.data?.title,
          icon: route.data?.icon,
          svgIcon: route.data?.svgIcon
        });
      }
    }
  }

  @Dispatch()
  public async navigateTo(url: string) {
    this.select.emit();
    return new Navigate([url]);
  }
}
