export interface PhotographModel {
  id: number;
  img: {
    large: string;
    medium: string;
    small: string;
    thumbnail: string;
    original: string;
  };
  img_alt: string;
  img_original_width: number;
  img_original_height: number;
  img_original_scale: number;
  description?: string;
  audio?: string;
  audio_duration?: string;
  date?: Date;
  author?: string;
  license?: string;
}
