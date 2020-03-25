import { InjectionToken } from '@angular/core';

export interface SolidCoreConfig {
  apiUrl: string;
}

export const SOLID_CORE_CONFIG = new InjectionToken<SolidCoreConfig>('solid-core-config');
