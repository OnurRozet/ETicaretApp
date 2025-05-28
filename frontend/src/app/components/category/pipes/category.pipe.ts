import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModel } from '../models/category.model';

@Pipe({
  name: 'categoryPipe',
})
export class CategoryPipe implements PipeTransform {
  transform(value: CategoryModel[], search: string): CategoryModel[] {
    if (search == null) {
      return value;
    }

    return value.filter((c) =>
      c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }
}
