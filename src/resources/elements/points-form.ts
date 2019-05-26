import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Point, Category, Location } from "../../services/poi-types";
import { PoiService} from "../../services/poi-service";

@inject(PoiService)
export class PointsForm {
  name: string;
  description: string;
  @bindable
  categories: Category[];

  selectedCategory: Category = null;

  location: Location = { lat: 53.2734, lng: -7.7783203 };

  constructor(private ps: PoiService) {

  }

  addPoint() {
    this.ps.addPoint(this.name, this.description, this.selectedCategory, this.location);
  }
}

