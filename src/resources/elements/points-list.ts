import { bindable } from 'aurelia-framework';
import { Point } from "../../services/poi-types";

export class PointsList {
  @bindable
  points: Point[];
}
