import { bindable } from 'aurelia-framework';
import { Point, Category } from "../../services/poi-types";

export class CategoriesForm {
  name: string;
  @bindable
  categories: Category[];

  @bindable
  points: Point[];

  addCategory() {
    const category = {
      name: this.name,
      points: []
    };
    this.categories.push(category);
    console.log(category);
  }
}
