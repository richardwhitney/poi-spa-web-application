import { bindable, inject } from 'aurelia-framework';
import { Point} from "../../services/poi-types";
import { PoiService } from "../../services/poi-service";

@inject(PoiService)
export class PointInfo {

  @bindable
  point: Point;

  constructor(private ps: PoiService) {

  }

}
