import { bindable } from 'aurelia-framework';
import { Category } from "../../services/poi-types";

export class CategoriesList {
  @bindable
  categories: Category[];
}
