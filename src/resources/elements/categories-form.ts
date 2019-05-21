import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Point, Category } from "../../services/poi-types";
import { PoiService } from "../../services/poi-service";

@inject(PoiService)
export class CategoriesForm {
  name: string;

  @bindable
  points: Point[];

  constructor(private ps: PoiService) {

  }

  addCategory() {
    this.ps.addCategory(this.name);
  }
}
