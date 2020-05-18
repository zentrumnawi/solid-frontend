import { InjectionToken } from '@angular/core';

export const SOLID_PROFILE_TITLE_FORMATTER = new InjectionToken<
  (title: string) => string
>('solid-profile-title-formatter');
