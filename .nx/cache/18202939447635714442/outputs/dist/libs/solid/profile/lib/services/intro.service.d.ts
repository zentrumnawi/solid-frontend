import { Navigate } from '@ngxs/router-plugin';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
export declare class IntroService {
  config: SolidCoreConfig;
  introProfile: any;
  location: string;
  constructor(config: SolidCoreConfig);
  static navigateTo(url: string): Promise<Navigate>;
  profileTour(callback: (target: any) => void): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<IntroService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<IntroService>;
}
