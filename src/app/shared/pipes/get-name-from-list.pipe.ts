import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getNameFromList',
  pure: true,
})
export class GetNameFromListPipe implements PipeTransform {
  transform(id: string, list: { _id: string }[], field = 'name'): string {
    if (!list) {
      return;
    }

    const object = list.find(i => i._id === id);
    return object ? object[field] : '';
  }
}
