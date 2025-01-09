import { EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackService } from '../../services/feedback.service';
import { MenuItem } from '../../state/menu.model';
import * as i0 from '@angular/core';
export declare class MainMenuComponent implements OnInit {
  feedback: FeedbackService;
  selectMenuEntry: EventEmitter<any>;
  MenuItems: Observable<MenuItem[]>;
  openGlossaryClick: EventEmitter<any>;
  private messages;
  msgNumber: number;
  constructor(feedback: FeedbackService);
  ngOnInit(): void;
  onMenuItemSelected(item: string): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<MainMenuComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    MainMenuComponent,
    'solid-skeleton-main-menu',
    never,
    {},
    {
      selectMenuEntry: 'selectMenuEntry';
      openGlossaryClick: 'openGlossaryClick';
    },
    never,
    never,
    false,
    never
  >;
}
