import { ImageModel } from '../../models/image.model';
import { ImageComponent } from './image.component';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { OverlayModule } from '@angular/cdk/overlay';

export default {
  title: 'ImageComponent',
  decorators: [withKnobs],
};

const minimumImage = new ImageModel({
  id: 0,
  img: {
    large: 'https://live.staticflickr.com/3858/14471783754_89aa3e23f3_o.jpg',
    medium: '',
    original: '',
    small: '',
    thumbnail: '',
  },
  img_alt: 'Please insert coffee to continue!',
  img_original_height: 0,
  img_original_scale: 0,
  img_original_width: 0,
  license: 'CC BY 2.0',
  author: 'Scott Schiller',
});

export const primary = () => ({
  moduleMetadata: {
    imports: [OverlayModule],
  },
  component: ImageComponent,
  props: {
    image: minimumImage,
    overlayEnabled: boolean('overlayEnabled', true, 'Properties'),
  },
});
