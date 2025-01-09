import { InjectionToken, Type } from '@angular/core';
import { LoadChildren } from '@angular/router';
import { ErrorHandlerOptions } from '@sentry/angular';
export interface RouteConfig {
  enabled: boolean;
  showOnLandingPage: boolean;
  showInMenu: boolean;
  url: string;
  title: string;
  order: number;
  matIcon?: string;
  svgIcon?: string;
  name?: string;
}
export type RouteConfigWithComponent = RouteConfig & {
  component: Type<any>;
};
export type RouteConfigFromModule = RouteConfig & {
  moduleImport: LoadChildren;
};
export interface RoutingConfig {
  landing: RouteConfig;
  info: RouteConfig;
  profile: RouteConfigFromModule;
  quiz: RouteConfigFromModule;
  slideshow: RouteConfigFromModule;
  custom?: (RouteConfigWithComponent | RouteConfigFromModule)[];
}
export interface SentryConfig {
  errorHandlerOptions?: ErrorHandlerOptions;
  dsn: string;
  environment: string;
  version: {
    semver: {
      version: string;
    };
  };
}
export interface InternalSolidSkeletonConfig {
  feedbackEnabled: boolean;
  infoPageContent: Type<any>;
  privacyContent: Type<any>;
  glossary: {
    enabled: boolean;
    svgIcon?: string;
    matIcon?: string;
  };
  routingConfig: RoutingConfig;
  sentry?: SentryConfig;
}
export interface RequiredExternalConfig {
  infoPageContent: Type<any>;
  privacyContent: Type<any>;
  routingConfig: {};
  sentry?: SentryConfig;
}
type componentPropertyKeys = 'component' | 'infoPageContent' | 'privacyContent';
export type PartialDeep<T> = {
  [P in Exclude<keyof T, componentPropertyKeys>]?: PartialDeep<T[P]>;
};
type Pick<T, K extends keyof T> = {
  [P in K]: Omit<T[P], componentPropertyKeys>;
};
type Exclude<T, U> = T extends U ? never : T;
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
export declare const defaultSkeletonConfig: Omit<
  InternalSolidSkeletonConfig,
  componentPropertyKeys
>;
export type SolidSkeletonConfig = PartialDeep<InternalSolidSkeletonConfig> &
  RequiredExternalConfig;
export declare const SOLID_SKELETON_CONFIG: InjectionToken<InternalSolidSkeletonConfig>;
export {};
