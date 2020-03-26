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
export type RouteConfigFromModule = RouteConfig & { moduleImport: LoadChildren };

export interface AppRoutingModuleConfig {
  landing: RouteConfigWithComponent;
  info: RouteConfigWithComponent;
  privacy: RouteConfigWithComponent;
  profile?: RouteConfig;
  quiz?: RouteConfig;
  custom?: (RouteConfigWithComponent | RouteConfigFromModule)[];
}

export function generateAppRoutes(cfg: AppRoutingModuleConfig) {
  const routes: Route[] = [];
  const addRoute = (cfg: RouteConfigWithComponent, defaultUrl: string, defaultTitle: string, defaultOrder: number, icon?: string, svgIcon?: string) => {
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
  const addModuleRoute = (cfg: RouteConfigFromModule, defaultUrl: string, defaultTitle: string, defaultOrder: number, icon?: string, svgIcon?: string) => {
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
  addRoute(cfg.landing, '', 'Startseite', 1, 'home', undefined);
  addModuleRoute({
    ...cfg.profile,
    moduleImport: () => import('@zentrumnawi/solid/profile').then(m => m.SolidProfileModule)
  }, 'profile', 'Steckbriefe', 2, 'list');
  addModuleRoute({
    ...cfg.quiz,
    moduleImport: () => import('@zentrumnawi/solid/quiz').then(m => m.SolidQuizModule)
  }, 'quiz', 'Selbsttest', 3, 'question_answer');
  addRoute(cfg.info, 'info', 'Informationen', 4, 'info');
  addRoute(cfg.privacy, 'privacy', 'Datenschutzerklärung', 5, undefined, 'privacy');
  cfg.custom?.forEach(custom => {
    if ((custom as RouteConfigWithComponent).component) {
      addRoute(custom as RouteConfigWithComponent, '', '', 0);
    } else {
      addModuleRoute(custom as RouteConfigFromModule, '', '', 0);
    }
  });
  return routes;
}
