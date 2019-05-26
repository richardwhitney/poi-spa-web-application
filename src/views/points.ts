import { inject } from 'aurelia-framework';
import { Point, Category } from "../services/poi-types";
import { PoiService } from "../services/poi-service";

@inject(PoiService)
export class Points {
  points: Point[];
  categories: Category[];

  constructor(private ps: PoiService) {
    this.points = ps.points;
    this.categories = ps.categories;
  }


}
