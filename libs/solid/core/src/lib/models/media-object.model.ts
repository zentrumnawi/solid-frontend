export interface MediaObjectModel {
  id: number;
  file: string;
  dzi_file: string | null;
  profile_position: number;
  media_format: 'image' | 'audio' | 'video';
  img_alt: string;
  img_original_width: number;
  img_original_height: number;
  img_original_scale: number;
  description?: string;
  audio?: string;
  title: string;
  date?: Date;
  author?: string;
  license?: string;
}
