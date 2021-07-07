import { Pipe, PipeTransform } from '@angular/core';
import { ImachineItems } from '../Imodel/ImachineItems';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: ImachineItems[], searchText: any): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    if (!isNaN(searchText)) {
      return items.filter((it) => {
        return it.id == searchText;
      });
    } else {
      searchText = searchText.toLocaleLowerCase();

      return items.filter((it) => {
        return it.name.toLocaleLowerCase().includes(searchText);
      });
    }
  }
}
