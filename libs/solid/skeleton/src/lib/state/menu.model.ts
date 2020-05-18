export interface MenuItem {
  route: string;
  active: boolean;
  title: string;
  icon?: string;
  svgIcon?: string;
  showOnLanding: boolean;
  showInMenu: boolean;
}
