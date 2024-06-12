export interface IPoint {
  x: number;
  y: number;
  getX: () => number;
  setX: (x: number) => void;
  distance: (point: IPoint) => number;
}

export default class Point implements IPoint {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  getX = () => this.x;
  setX = (x: number) => {
    this.x = x;
  };

  distance = (point: IPoint) =>
    Math.sqrt((this.x - point.getX()) ** 2 + (this.y - point.y) ** 2);
}
