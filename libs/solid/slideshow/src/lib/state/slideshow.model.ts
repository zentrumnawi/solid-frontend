import { PhotographModel } from '@zentrumnawi/solid-core';

export interface Slideshow {
  id: number;
  title: string;
  title_image: PhotographModel;
  position: number;
  pages: SlideshowPage[];
}

export interface SlideshowPage {
  id: number;
  position: number;
  title: string;
  text: string;
  images: SlideshowImage[] | null;
}

export interface SlideshowImage {
  id: number;
  title: string;
  position: number;
  caption: string;
  image: PhotographModel;
}
