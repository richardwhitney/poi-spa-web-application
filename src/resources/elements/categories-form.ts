import { bindable } from 'aurelia-framework';
import { Category } from "../../services/poi-types";

export class CategoriesForm {
  name: string;
  @bindable
  categories: Category[];

  addCategory() {
    const category = {
      name: this.name
    };
    this.categories.push(category);
    console.log(category);
  }
}
