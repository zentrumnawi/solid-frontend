// export class LoadSlideshow {
//   static readonly type = '[Slideshow] load all slideshows';
// }

export class AddSlideshow {
  static readonly type = '[Slideshow] add slideshow';
  constructor(public payload: string) {}
}
