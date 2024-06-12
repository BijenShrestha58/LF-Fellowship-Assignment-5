import Point from "./Point";

export interface ICircle {
  center: Point;
  radius: number;
}

export default class Circle implements ICircle {
  center: Point;
  radius: number;

  constructor(center: Point, radius: number) {
    this.radius = radius;
    this.center = center;
  }
}
