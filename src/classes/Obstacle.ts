export interface IObstacle {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default class Obstacle implements IObstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  constructor(x: number, y: number, h: number, w: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
