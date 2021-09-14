import { ImageModel, PhotographModel } from '@zentrumnawi/solid-core';

export interface Slideshow extends SlideshowApi {
  pages: SlideshowPage[];
}

export interface SlideshowApi {
  id: number;
  title: string;
  title_image: PhotographModel;
  position: number;
  pages: SlideshowPageApi[];
}

export interface SlideshowPage extends SlideshowPageApi {
  images: SlideshowImage[];
}

export interface SlideshowPageApi {
  id: number;
  position: number;
  title: string;
  text: string;
  images: SlideshowImageApi[];
}

export interface SlideshowImage extends SlideshowImageApi {
  img: ImageModel;
}

export interface SlideshowImageApi {
  id: number;
  title: string;
  position: number;
  caption: string;
  image: PhotographModel;
}
