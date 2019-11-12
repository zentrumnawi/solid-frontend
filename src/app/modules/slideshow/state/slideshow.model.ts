export interface Slideshow {
  id: string;
  title: string;
  pages: SlideshowPage[];
}

export interface SlideshowPage {
  id: number;
  title: string;
  contentPath: string;
  content?: string;
  images: SlideshowImage[];
}

export interface SlideshowImage {
  title: string;
  description: string;
  url: string;
}
