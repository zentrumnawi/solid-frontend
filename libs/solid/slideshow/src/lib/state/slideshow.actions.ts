export class SlideshowLoadContentAction {
  static readonly type = '[Slideshow] content loaded';

  constructor(public id: string) {}
}
