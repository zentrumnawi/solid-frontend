import { InjectionToken, Type } from '@angular/core';

export interface SolidSkeletonConfig {
  feedbackEnabled?: boolean;
  landingBannerContent?: Type<any>;
}

export const SOLID_SKELETON_CONFIG = new InjectionToken<SolidSkeletonConfig>(
  'solid-skeleton-config'
);
