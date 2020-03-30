import { LoadChildren, Route } from '@angular/router';
import { Type } from '@angular/core';

export interface RouteConfig {
  url?: string;
  title?: string;
  menuItem?: boolean;
  order?: number;
  matIcon?: string;
  svgIcon?: string;
}

export type RouteConfigWithComponent = RouteConfig & { component: Type<any> };
export type RouteConfigFromModule = RouteConfig & {
  moduleImport: LoadChildren;
};

export interface AppRoutingModuleConfig {
  landing: RouteConfigWithComponent;
  info: RouteConfigWithComponent;
  privacy: RouteConfigWithComponent;
  profile?: RouteConfig;
  quiz?: RouteConfig;
  slideshow?: RouteConfig;
  custom?: (RouteConfigWithComponent | RouteConfigFromModule)[];
}

export function generateAppRoutes(config: AppRoutingModuleConfig) {
  const routes: Route[] = [];
  const addRoute = (
    cfg: RouteConfigWithComponent,
    defaultUrl: string,
    defaultTitle: string,
    defaultOrder: number,
    icon?: string,
    svgIcon?: string
  ) => {
    routes.push({
      path: cfg.url || defaultUrl,
      component: cfg.component,
      data: {
        title: cfg.title || defaultTitle,
        menuItem: cfg.menuItem !== undefined ? cfg.menuItem : true,
        icon: cfg.matIcon || icon,
        svgIcon: cfg.svgIcon || svgIcon,
        order: cfg.order || defaultOrder
      }
    });
  };
  const addModuleRoute = (
    cfg: RouteConfigFromModule,
    defaultUrl: string,
    defaultTitle: string,
    defaultOrder: number,
    icon?: string,
    svgIcon?: string
  ) => {
    routes.push({
      path: cfg.url || defaultUrl,
      loadChildren: cfg.moduleImport,
      data: {
        title: cfg.title || defaultTitle,
        menuItem: cfg.menuItem !== undefined ? cfg.menuItem : true,
        icon: cfg.matIcon || icon,
        svgIcon: cfg.svgIcon || svgIcon,
        order: cfg.order || defaultOrder
      }
    });
  };
  let order = 0;
  addRoute(config.landing, '', 'Startseite', order++, 'home', undefined);
  addModuleRoute(
    {
      ...config.profile,
      moduleImport: () =>
        import('@zentrumnawi/solid/profile').then(m => m.SolidProfileModule)
    },
    'profile',
    'Steckbriefe',
    order++,
    'list'
  );
  addModuleRoute(
    {
      ...config.slideshow,
      moduleImport: () =>
        import('@zentrumnawi/solid/slideshow').then(m => m.SolidSlideshowModule)
    },
    'slideshow',
    'Slideshow',
    order++,
    'slideshow'
  );
  addModuleRoute(
    {
      ...config.quiz,
      moduleImport: () =>
        import('@zentrumnawi/solid/quiz').then(m => m.SolidQuizModule)
    },
    'quiz',
    'Selbsttest',
    order++,
    'question_answer'
  );
  addRoute(config.info, 'info', 'Informationen', order++, 'info');
  addRoute(
    config.privacy,
    'privacy',
    'Datenschutzerklärung',
    order++,
    undefined,
    'privacy'
  );
  config.custom?.forEach(custom => {
    if ((custom as RouteConfigWithComponent).component) {
      addRoute(custom as RouteConfigWithComponent, '', '', order++);
    } else {
      addModuleRoute(custom as RouteConfigFromModule, '', '', order++);
    }
  });
  routes.push({ path: '**', redirectTo: '' });
  return routes;
}
