import {Pipe, PipeTransform} from '@angular/core';
import {Iworker} from '../Imodel/Iworker';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Iworker[], searchText: any): any[] {
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
        return it.firstName.toLocaleLowerCase().includes(searchText);
      });
    }
  }
}
