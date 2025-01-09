import { PhotographModel } from '@zentrumnawi/solid-core';
export interface SlideshowSelectApi {
  id: number;
  title: string;
  title_image: PhotographModel;
  position: number;
  pages: number[];
  categories: string[];
}
