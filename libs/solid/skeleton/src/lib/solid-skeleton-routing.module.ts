import { Route } from '@angular/router';
import { Type } from '@angular/core';

export interface RouteConfig {
  url?: string;
  title?: string;
  component: Type<any>;
  menuItem?: boolean;
  order?: number;
  matIcon?: string;
  svgIcon?: string;
}

export interface AppRoutingModuleConfig {
  landing: RouteConfig;
  privacy: RouteConfig;
  feedbackDisabled?: boolean;
}

export function generateAppRoutes(cfg: AppRoutingModuleConfig) {
  const routes: Route[] = [];
  const addRoute = (cfg: RouteConfig, defaultUrl: string, defaultTitle: string, defaultOrder: number, icon?: string, svgIcon?: string) => {
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
  addRoute(cfg.landing, '', 'Startseite', 1, 'home', undefined);
  addRoute(cfg.privacy, 'privacy', 'Datenschutzerklärung', 2, undefined, 'privacy');
  return routes;
}
