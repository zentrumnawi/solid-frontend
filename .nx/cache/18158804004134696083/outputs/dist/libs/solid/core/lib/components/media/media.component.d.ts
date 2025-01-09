import { EventEmitter } from '@angular/core';
import { ImageModel, MediaModel } from '../../models';
import * as i0 from '@angular/core';
export declare class MediaComponent {
  image?: ImageModel;
  mediaObject?: MediaModel;
  hasDialog: boolean;
  hasAttributions: boolean;
  name: string;
  view?: string;
  hasAudio: boolean;
  hasControlPanel: boolean;
  hasDescription: boolean;
  hasDescriptionToggle: boolean;
  slideshowPageChanged: number;
  hasNavigationInDialog: boolean;
  NextDialogEmitter: EventEmitter<any>;
  PrevDialogEmitter: EventEmitter<any>;
  static ɵfac: i0.ɵɵFactoryDeclaration<MediaComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    MediaComponent,
    'solid-core-media',
    never,
    {
      image: { alias: 'image'; required: false };
      mediaObject: { alias: 'mediaObject'; required: false };
      hasDialog: { alias: 'hasDialog'; required: false };
      hasAttributions: { alias: 'hasAttributions'; required: false };
      name: { alias: 'name'; required: false };
      view: { alias: 'view'; required: false };
      hasAudio: { alias: 'hasAudio'; required: false };
      hasControlPanel: { alias: 'hasControlPanel'; required: false };
      hasDescription: { alias: 'hasDescription'; required: false };
      hasDescriptionToggle: { alias: 'hasDescriptionToggle'; required: false };
      slideshowPageChanged: { alias: 'slideshowPageChanged'; required: false };
      hasNavigationInDialog: {
        alias: 'hasNavigationInDialog';
        required: false;
      };
    },
    {
      NextDialogEmitter: 'NextDialogEmitter';
      PrevDialogEmitter: 'PrevDialogEmitter';
    },
    never,
    never,
    false,
    never
  >;
}
