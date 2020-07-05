export interface Slideshow {
  id: number;
  title: string;
  img: string | null;
  img_alt: string | null;
  pages: SlideshowPage[];
}

export interface SlideshowPage {
  id: number;
  position: number;
  title: string;
  text: string;
  // images: SlideshowImage[];
}

export interface SlideshowImage {
  title: string;
  description: string;
  url: string;
  text: string;
}
