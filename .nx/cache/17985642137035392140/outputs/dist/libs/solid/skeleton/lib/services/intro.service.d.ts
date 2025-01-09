import { Navigate } from '@ngxs/router-plugin';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
export declare class IntroService {
  config: SolidCoreConfig;
  introJS: any;
  constructor(config: SolidCoreConfig);
  static navigateTo(url: string): Promise<Navigate>;
  guidedTour(callback: (target: any) => void): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<IntroService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<IntroService>;
}
