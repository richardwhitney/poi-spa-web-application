import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Point, Category, Location} from "../services/poi-types";
import { PoiService} from "../services/poi-service";

@inject(PoiService)
export class UpdatePoint {

  point: Point;

  id: string;

  location: Location = { lat: 53.2734, lng: -7.7783203 };

  constructor(private ps: PoiService) {

  }

  async updatePoint() {
    await this.ps.updatePoint(this.id, this.point.name, this.point.description, this.point.geo);
    //this.ps.addPoint(this.point.name, this.point.description, this.selectedCategory, this.point.geo);
  }

  async activate(params) {
    this.id = params.id;
    this.point = await this.ps.getPoint(params.id);
  }
}
