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
import { collisionDetection } from "./utils/collision";

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
  getRandomInt(-PLAYER_DIMENSIONS.PLAYER_HEIGHT, 0),
  PLAYER_DIMENSIONS.PLAYER_WIDTH,
  PLAYER_DIMENSIONS.PLAYER_HEIGHT
);
const obstacle2 = new Obstacle(
  LANE_POSITION.MID_LANE,
  getRandomInt(
    -PLAYER_DIMENSIONS.PLAYER_HEIGHT * 3,
    -PLAYER_DIMENSIONS.PLAYER_HEIGHT
  ),
  PLAYER_DIMENSIONS.PLAYER_WIDTH,
  PLAYER_DIMENSIONS.PLAYER_HEIGHT
);
const obstacle3 = new Obstacle(
  LANE_POSITION.RIGHT_LANE,
  getRandomInt(
    -PLAYER_DIMENSIONS.PLAYER_HEIGHT * 5,
    -PLAYER_DIMENSIONS.PLAYER_HEIGHT * 3
  ),
  PLAYER_DIMENSIONS.PLAYER_WIDTH,
  PLAYER_DIMENSIONS.PLAYER_HEIGHT
);

const obstacleArray: Obstacle[] = [obstacle1, obstacle2, obstacle3];

const player = new Player(
  LANE_POSITION.MID_LANE,
  DIMENSIONS.CANVAS_HEIGHT - PLAYER_DIMENSIONS.PLAYER_HEIGHT - 20,
  PLAYER_DIMENSIONS.PLAYER_WIDTH,
  PLAYER_DIMENSIONS.PLAYER_HEIGHT
);

let targetX = player.x;
let score = 0;

function draw() {
  ctx.fillStyle = "#000";
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
      obstacle.y = getRandomInt(-400, -200);
      score += 1;
    }
  });

  if (player.x < targetX) {
    player.x += Math.min(SIDE_SPEED, targetX - player.x);
  } else if (player.x > targetX) {
    player.x -= Math.min(SIDE_SPEED, player.x - targetX);
  }

  ctx.beginPath();
  ctx.drawImage(playerImage, player.x, player.y, player.w, player.h);

  if (collisionDetection(player, obstacleArray)) {
    console.log("Game Over");
    return;
  }
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);

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
