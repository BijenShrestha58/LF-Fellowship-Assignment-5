import Point from "./Point";

export interface ILine {
  start: Point;
  end: Point;
  length: () => number;
  slope: (line: ILine) => number;
}

export default class Line implements ILine {
  start: Point;
  end: Point;
  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
  }
  length = () => this.start.distance(this.end);
  slope = () => 0;
}
