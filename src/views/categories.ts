import { inject } from 'aurelia-framework';
import { Category, Point } from "../services/poi-types";
import { PoiService} from "../services/poi-service";

@inject(PoiService)
export class Categories {
  categories: Category[];
  points: Point[];

  constructor(private ps: PoiService) {
    this.categories = ps.categories;

  }
}
