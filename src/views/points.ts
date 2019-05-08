import { Point } from "../services/poi-types";

export class Points {
  name: string;
  description: string;
  points: Point[] = [];

  addPoint() {
    const point = {
      name: this.name,
      description: this.description
    };
    this.points.push(point);
    console.log(point);
  }
}
