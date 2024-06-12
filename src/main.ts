import "./style.css";
import {
  DIMENSIONS,
  SPEED,
  PLAYER_DIMENSIONS,
  LANE_POSITION,
  DIFFERENCE,
  SIDE_SPEED,
} from "./constants";
import { getRandomInt } from "./utils/common";
import Player from "./classes/Player";
import Obstacle from "./classes/Obstacle";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;
const playerImage = document.getElementById("player-image") as HTMLImageElement;
const obstacleImage = document.getElementById(
  "obstacle1-image"
) as HTMLImageElement;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

const obstacle1 = new Obstacle(
  LANE_POSITION.LEFT_LANE,
  getRandomInt(-100, 0),
  PLAYER_DIMENSIONS.PLAYER_WIDTH,
  PLAYER_DIMENSIONS.PLAYER_HEIGHT
);
const obstacle2 = new Obstacle(
  LANE_POSITION.MID_LANE,
  getRandomInt(-200, 0),
  PLAYER_DIMENSIONS.PLAYER_WIDTH,
  PLAYER_DIMENSIONS.PLAYER_HEIGHT
);
const obstacle3 = new Obstacle(
  LANE_POSITION.RIGHT_LANE,
  getRandomInt(-300, -100),
  PLAYER_DIMENSIONS.PLAYER_WIDTH,
  PLAYER_DIMENSIONS.PLAYER_HEIGHT
);

const obstacleArray: Obstacle[] = [obstacle1, obstacle2, obstacle3];

const player = new Player(
  LANE_POSITION.MID_LANE,
  DIMENSIONS.CANVAS_HEIGHT - 150,
  PLAYER_DIMENSIONS.PLAYER_WIDTH,
  PLAYER_DIMENSIONS.PLAYER_HEIGHT
);

console.log(LANE_POSITION.LEFT_LANE);
let targetX = player.x;
function draw() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  ctx.strokeStyle = "#fff";

  obstacleArray.forEach((obstacle) => {
    ctx.beginPath();
    ctx.drawImage(
      obstacleImage,
      obstacle.x,
      obstacle.y,
      obstacle.w,
      obstacle.h
    );

    obstacle.y = obstacle.y + SPEED;

    if (obstacle.y > DIMENSIONS.CANVAS_HEIGHT) {
      obstacle.y = getRandomInt(-400, 0);
    }
  });

  if (player.x < targetX) {
    player.x += Math.min(SIDE_SPEED, targetX - player.x);
  } else if (player.x > targetX) {
    player.x -= Math.min(SIDE_SPEED, player.x - targetX);
  }

  ctx.beginPath();
  ctx.drawImage(playerImage, player.x, player.y, player.w, player.h);

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

window.addEventListener("keypress", (e) => {
  switch (e.key) {
    case "a": {
      if (targetX - DIFFERENCE > 0) {
        targetX -= DIFFERENCE;
      }
      break;
    }
    case "d": {
      if (targetX + DIFFERENCE < DIMENSIONS.CANVAS_WIDTH) {
        targetX += DIFFERENCE;
      }
      break;
    }
  }
});
