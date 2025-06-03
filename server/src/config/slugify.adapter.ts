import slugify from 'slugify';

export class Slugify {
  static create( handle: string ): string {

    return slugify( handle, {
      lower: true,
      strict: true,
      replacement:'',
    });

  }
}
