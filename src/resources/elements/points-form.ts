import { bindable } from 'aurelia-framework';
import { Point} from "../../services/poi-types";

export class PointsForm {
  name: string;
  description: string;
  @bindable
  points: Point[];

  addPoint() {
    const point = {
      name: this.name,
      description: this.description
    };
    this.points.push(point);
    console.log(point);
  }
}
