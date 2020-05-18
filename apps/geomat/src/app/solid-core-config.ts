import { overlinePlugin, SolidCoreConfig } from '@zentrumnawi/solid-core';
import { environment } from '../environments/environment';
// @ts-ignore
import * as subscript from 'markdown-it-sub';
// @ts-ignore
import * as superscript from 'markdown-it-sup';

export const coreConfig: SolidCoreConfig = {
  ...environment,
  markdownPlugins: [subscript, superscript, overlinePlugin],
  appName: 'GeoMat',
};
