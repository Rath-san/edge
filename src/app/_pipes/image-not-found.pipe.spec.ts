import { ImageNotFoundPipe } from './image-not-found.pipe';

describe('ImageNotFoundPipe', () => {

  let pipe: ImageNotFoundPipe;

  const imageUrl: string = 'sample url';
  const expectedValue: string = 'http://via.placeholder.com/270x360';

  it('create an instance', () => {
    pipe = new ImageNotFoundPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return placeholder imageif url request returns 404', () => {
    const newUrl = pipe.transform(imageUrl)
    expect(newUrl).toBe(expectedValue)
  })
});
