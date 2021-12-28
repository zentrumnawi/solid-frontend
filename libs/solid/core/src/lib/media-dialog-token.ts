import { ComponentType } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';
import type { MediaDialogComponent } from './components/index';

export const MEDIA_DIALOG_TOKEN: InjectionToken<MediaDialogComponent> =
  new InjectionToken<ComponentType<MediaDialogComponent>>('media_dialog_token');
