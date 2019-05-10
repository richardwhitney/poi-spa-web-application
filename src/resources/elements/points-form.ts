import { bindable } from 'aurelia-framework';
import { Point, Category } from "../../services/poi-types";

export class PointsForm {
  name: string;
  description: string;
  @bindable
  points: Point[];

  @bindable
  categories: Category[];

  selectedCategory: Category = null;

  addPoint() {
    const point = {
      name: this.name,
      description: this.description
    };
    this.points.push(point);
    console.log(point);
  }
}
