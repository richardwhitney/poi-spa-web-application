import { inject, bindable } from 'aurelia-framework';
import { Point } from "../services/poi-types";
import { PoiService } from "../services/poi-service";

@inject(PoiService)
export class Poidetail {

  point: Point;

  constructor(private ps: PoiService) {

  }

  async deletePoint() {
    this.ps.deletePoint(this.point._id);
  }

  async activate(params) {
    this.point = await this.ps.getPoint(params.id);
  }
}
