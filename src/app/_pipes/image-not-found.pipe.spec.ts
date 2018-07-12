import { ImageNotFoundPipe } from './image-not-found.pipe';

describe('ImageNotFoundPipe', () => {

  let pipe: ImageNotFoundPipe;

  const imageUrlValid: string = 'http://via.placeholder.com/370x460';
  const imageUrlInvalid: string = 'N/A';
  const placeholderValue: string = 'http://via.placeholder.com/270x360';

  it('create an instance', () => {
    pipe = new ImageNotFoundPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return placeholder image if request returns 404', () => {
    const newUrl = pipe.transform(imageUrlInvalid);
    expect(newUrl).toBe(placeholderValue);
  });
  it('should return original url if request returns url', () => {
    const newUrl = pipe.transform(imageUrlValid);
    expect(newUrl).toBe(imageUrlValid);
  });

});
