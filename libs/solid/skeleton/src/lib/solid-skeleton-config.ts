import { InjectionToken, Type } from '@angular/core';
import { LoadChildren } from '@angular/router';

export interface RouteConfig {
  enabled: boolean;
  showOnLandingPage: boolean;
  showInMenu: boolean;
  url: string;
  title: string;
  order: number;
  matIcon?: string;
  svgIcon?: string;
}

export type RouteConfigWithComponent = RouteConfig & { component: Type<any> };

export type RouteConfigFromModule = RouteConfig & {
  moduleImport: LoadChildren;
};

export interface RoutingConfig {
  landing: RouteConfig;
  // info: RouteConfigWithComponent;
  privacy: RouteConfigWithComponent;
  profile: RouteConfig;
  quiz: RouteConfig;
  // slideshow?: RouteConfig<{}>;
  // custom?: (RouteConfigWithComponent | RouteConfigFromModule)[];
}

export interface InternalSolidSkeletonConfig {
  feedbackEnabled: boolean;
  landingBannerContent: Type<any>;
  glossary: {
    enabled: boolean;
    svgIcon?: string;
    matIcon?: string;
  };
  routingConfig: RoutingConfig;
}

export interface RequiredExternalConfig {
  landingBannerContent: Type<any>;
  routingConfig: {
    privacy: {
      component: Type<any>;
    };
  };
}

type componentPropertyKeys = 'landingBannerContent' | 'component';

export type PartialDeep<T> = {
  [P in Exclude<keyof T, componentPropertyKeys>]?: PartialDeep<T[P]>;
};

type Pick<T, K extends keyof T> = {
  [P in K]: Omit<T[P], componentPropertyKeys>;
};
type Exclude<T, U> = T extends U ? never : T;
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

export const defaultSkeletonConfig: Omit<
  InternalSolidSkeletonConfig,
  componentPropertyKeys
> = {
  feedbackEnabled: true,
  glossary: {
    enabled: true,
    matIcon: 'help',
  },
  routingConfig: {
    landing: {
      enabled: true,
      showOnLandingPage: false,
      showInMenu: true,
      url: '',
      title: 'Startseite',
      order: 0,
      matIcon: 'home',
    },
    profile: {
      enabled: true,
      showOnLandingPage: true,
      showInMenu: true,
      url: 'profile',
      title: 'Steckbriefe',
      order: 1,
      matIcon: 'list',
    },
    quiz: {
      enabled: true,
      showOnLandingPage: true,
      showInMenu: true,
      url: 'quiz',
      title: 'Selbsttest',
      order: 2,
      matIcon: 'question_answer',
    },
    // info: {
    //   enabled: true,
    //   showOnLandingPage: true,
    //   showInMenu: true,
    //   url: 'info',
    //   title: 'Informationen',
    //   order: 1,
    //   matIcon: 'info',
    // },
    privacy: {
      enabled: true,
      showOnLandingPage: true,
      showInMenu: true,
      url: 'privacy',
      title: 'Datenschutzerklärung',
      order: 4,
      matIcon: 'info',
    },
  },
};

export type SolidSkeletonConfig = PartialDeep<InternalSolidSkeletonConfig> &
  RequiredExternalConfig;

export const SOLID_SKELETON_CONFIG = new InjectionToken<
  InternalSolidSkeletonConfig
>('solid-skeleton-config');
