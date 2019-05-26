import { Point } from "./poi-types";

export class MapUpdate {
  point: Point;

  constructor(point: Point) {
    this.point = point;
  }
}
