import { Route } from '@angular/router';
import { Type } from '@angular/core';

export interface RouteConfig {
  url?: string;
  title?: string;
  component: Type<any>;
  menuItem?: boolean;
  order?: number;
}

export interface AppRoutingModuleConfig {
  privacy?: RouteConfig;
  feedbackDisabled?: boolean;
}

export function generateAppRoutes(cfg: AppRoutingModuleConfig) {
  const routes: Route[] = [];
  const addRoute = (cfg: RouteConfig | undefined, defaultUrl: string, defaultTitle: string, defaultOrder: number, icon?: string, svgIcon?: string) => {
    if (!cfg) {
      return;
    }
    routes.push({
      path: cfg.url || defaultUrl,
      component: cfg.component,
      data: {
        title: cfg.title || defaultTitle,
        menuItem: cfg.menuItem !== undefined ? cfg.menuItem : true,
        icon: icon,
        svgIcon: svgIcon,
        order: cfg.order || defaultOrder
      }
    });
  };
  addRoute(cfg.privacy, 'privacy', 'Datenschutzerklärung', 1, undefined, 'privacy');
  return routes;
}
