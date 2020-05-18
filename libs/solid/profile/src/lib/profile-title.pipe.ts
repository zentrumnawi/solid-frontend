import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';
import { SOLID_PROFILE_TITLE_FORMATTER } from '@zentrumnawi/solid-profile/di';

@Pipe({ name: 'profileTitle' })
export class ProfileTitlePipe implements PipeTransform {
  constructor(
    @Optional()
    @Inject(SOLID_PROFILE_TITLE_FORMATTER)
    private // yeah, any is ugly, but the compilation does not work with ng-packagr with function injection parameters
    // real type is (title: string) => string;
    fn?: any
  ) {}

  transform(value: string, ...args: any[]): any {
    return this.fn ? this.fn(value) : value;
  }
}
