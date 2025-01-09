import { OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { QuizMetadata } from '../../state/quiz.model';
import { Navigate } from '@ngxs/router-plugin';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatChipListboxChange } from '@angular/material/chips';
import * as i0 from '@angular/core';
export declare class StartComponent implements OnDestroy, OnInit {
  private _store;
  metaData$: Observable<QuizMetadata> | null;
  expertMode: boolean | false;
  private $destroyed;
  expertModeStatus: boolean;
  questionCount: number;
  chosenTags: never[];
  chosenDifficulty: number[];
  isValid: boolean;
  tags: string[];
  difficulties: number[];
  constructor(_store: Store);
  onStartClick(): void;
  ngOnInit(): void;
  ngOnDestroy(): void;
  navigateTo(url: string): Promise<Navigate>;
  expertModeToggle(): void;
  onBackBtnClick(): void;
  onSliderChange(change: Event): void;
  onButtonToggleChange(change: MatButtonToggleChange): void;
  onTagSelectionChange(change: MatChipListboxChange): void;
  onDeselectAllTagClick(): void;
  onDeselectAllDifficultyClick(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<StartComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    StartComponent,
    'solid-quiz-start',
    never,
    {},
    {},
    never,
    never,
    false,
    never
  >;
}
