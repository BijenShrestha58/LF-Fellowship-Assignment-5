import "./style.css";
import { DIMENSIONS, SPEED } from "./constants";
import Line from "./shapes/Line";
import Point from "./shapes/Point";
import Circle from "./shapes/Circle";
import { getRandomInt } from "./utils/common";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

const pointA = new Point(500, 500);
const pointB = new Point(400, 400);
const line = new Line(new Point(100, 100), new Point(200, 300));
const circle1 = new Circle(new Point(100, getRandomInt(-200, -100)), 25);
const circle2 = new Circle(new Point(300, getRandomInt(-300, -200)), 25);
const circle3 = new Circle(new Point(500, getRandomInt(-400, -300)), 25);

const circleArray: Circle[] = [circle1, circle2, circle3];

const player = new Circle(new Point(300, DIMENSIONS.CANVAS_HEIGHT - 100), 25);

function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  ctx.moveTo(line.start.x, line.start.y);
  ctx.lineTo(line.end.x, line.end.y);
  ctx.strokeStyle = "#fff";
  ctx.stroke();

  circleArray.forEach((circle, i) => {
    ctx.beginPath();
    ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, Math.PI * 2);
    ctx.stroke();
    circle.center.y = circle.center.y + SPEED;

    if (circle.center.y > DIMENSIONS.CANVAS_HEIGHT) {
      circle.center.y = getRandomInt(-200, 0);
    }
  });

  ctx.beginPath();
  ctx.arc(player.center.x, player.center.y, player.radius, 0, Math.PI * 2);
  ctx.stroke();
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

window.addEventListener("keypress", (e) => {
  switch (e.key) {
    case "a": {
      if (player.center.x - 200 > 0) {
        player.center.x -= 200;
      }
      break;
    }
    case "d": {
      if (player.center.x + 200 < DIMENSIONS.CANVAS_WIDTH) {
        player.center.x += 200;
      }
      break;
    }
  }
});
