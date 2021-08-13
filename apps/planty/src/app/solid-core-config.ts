import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { environment } from '../environments/environment';

export const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [],
  appName: 'PLANTY2Learn',
  appLogoLarge: 'assets/info/HGU_Logo.svg',
  appLogoSmall: 'assets/info/HGU_Signet.svg',
};
