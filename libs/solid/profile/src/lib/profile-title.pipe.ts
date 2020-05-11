import {
  Inject,
  InjectionToken,
  Optional,
  Pipe,
  PipeTransform
} from '@angular/core';

export const SOLID_PROFILE_TITLE_FORMATTER = new InjectionToken<
  (title: string) => string
>('solid-profile-title-formatter');

@Pipe({ name: 'profileTitle' })
export class ProfileTitlePipe implements PipeTransform {
  constructor(
    @Optional()
    @Inject(SOLID_PROFILE_TITLE_FORMATTER)
    private fn?: (title: string) => string
  ) {}

  transform(value: string, ...args: any[]): any {
    return this.fn ? this.fn(value) : value;
  }
}
