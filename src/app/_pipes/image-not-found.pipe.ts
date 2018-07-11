import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageNotFound'
})
export class ImageNotFoundPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const placeholderImg = 'http://via.placeholder.com/270x360'
    if (value === 'N/A') {
      return placeholderImg
    }
    return value
  }

}
