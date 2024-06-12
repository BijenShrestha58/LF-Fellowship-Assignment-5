import "./style.css";
import {
  DIMENSIONS,
  SPEED,
  PLAYER_DIMENSIONS,
  LANE_POSITION,
  DIFFERENCE,
  SIDE_SPEED,
  GAME_STATE,
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
const backgroundImage = document.getElementById(
  "background-image"
) as HTMLImageElement;

canvas.width = DIMENSIONS.CANVAS_WIDTH;
canvas.height = DIMENSIONS.CANVAS_HEIGHT;

const obstacle1 = new Obstacle(
  LANE_POSITION.LEFT_LANE,
  getRandomInt(PLAYER_DIMENSIONS.PLAYER_HEIGHT * -2, 0),
  PLAYER_DIMENSIONS.PLAYER_WIDTH,
  PLAYER_DIMENSIONS.PLAYER_HEIGHT
);
const obstacle2 = new Obstacle(
  LANE_POSITION.MID_LANE,
  getRandomInt(
    PLAYER_DIMENSIONS.PLAYER_HEIGHT * -7,
    PLAYER_DIMENSIONS.PLAYER_HEIGHT * -5
  ),
  PLAYER_DIMENSIONS.PLAYER_WIDTH,
  PLAYER_DIMENSIONS.PLAYER_HEIGHT
);
const obstacle3 = new Obstacle(
  LANE_POSITION.RIGHT_LANE,
  getRandomInt(
    PLAYER_DIMENSIONS.PLAYER_HEIGHT * -5,
    PLAYER_DIMENSIONS.PLAYER_HEIGHT * -3
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
let highScore = localStorage.getItem("highScore")
  ? parseInt(localStorage.getItem("highScore")!)
  : 0;
let gameState = GAME_STATE.START;
let bgY1 = 0;
let bgY2 = -DIMENSIONS.CANVAS_HEIGHT;
let currentSpeed = SPEED;

function drawStartScreen() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillStyle = "#fff";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "Press Enter to Start",
    DIMENSIONS.CANVAS_WIDTH / 2,
    DIMENSIONS.CANVAS_HEIGHT / 2
  );
  console.log("Displaying start screen");
  requestAnimationFrame(gameLoop);
}

function drawGameOverScreen() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);
  ctx.fillStyle = "#fff";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "Game Over",
    DIMENSIONS.CANVAS_WIDTH / 2,
    DIMENSIONS.CANVAS_HEIGHT / 2 - 60
  );
  ctx.fillText(
    `Score: ${score}`,
    DIMENSIONS.CANVAS_WIDTH / 2,
    DIMENSIONS.CANVAS_HEIGHT / 2
  );
  ctx.fillText(
    `High Score: ${highScore}`,
    DIMENSIONS.CANVAS_WIDTH / 2,
    DIMENSIONS.CANVAS_HEIGHT / 2 + 30
  );
  ctx.fillText(
    "Press Enter to Restart",
    DIMENSIONS.CANVAS_WIDTH / 2,
    DIMENSIONS.CANVAS_HEIGHT / 2 + 60
  );
  console.log("Displaying game over screen");
  requestAnimationFrame(gameLoop);
}

function drawGame() {
  ctx.clearRect(0, 0, DIMENSIONS.CANVAS_WIDTH, DIMENSIONS.CANVAS_HEIGHT);

  bgY1 += currentSpeed / 2;
  bgY2 += currentSpeed / 2;

  if (bgY1 >= DIMENSIONS.CANVAS_HEIGHT) {
    bgY1 = bgY2 - DIMENSIONS.CANVAS_HEIGHT;
  }
  if (bgY2 >= DIMENSIONS.CANVAS_HEIGHT) {
    bgY2 = bgY1 - DIMENSIONS.CANVAS_HEIGHT;
  }

  ctx.drawImage(
    backgroundImage,
    0,
    bgY1,
    DIMENSIONS.CANVAS_WIDTH,
    DIMENSIONS.CANVAS_HEIGHT
  );
  ctx.drawImage(
    backgroundImage,
    0,
    bgY2,
    DIMENSIONS.CANVAS_WIDTH,
    DIMENSIONS.CANVAS_HEIGHT
  );

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

    obstacle.y = obstacle.y + currentSpeed;

    if (obstacle.y > DIMENSIONS.CANVAS_HEIGHT) {
      obstacle.y = getRandomInt(-1000, -100);
      obstacleArray.forEach((obsCheck) => {
        if (obstacle === obsCheck) {
          return;
        }
        if (obsCheck.y - obstacle.y < 2 * PLAYER_DIMENSIONS.PLAYER_HEIGHT) {
          obstacle.y -= 2 * PLAYER_DIMENSIONS.PLAYER_HEIGHT + 50;
        }
      });

      score += 1;
      currentSpeed = SPEED + Math.floor(score / 10);
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
    gameState = GAME_STATE.END;
    console.log("Game Over!");
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
    }
    return;
  }
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 60, 20);
  ctx.fillText(`High Score: ${highScore}`, 60, 50);

  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  switch (gameState) {
    case GAME_STATE.START:
      drawStartScreen();
      break;
    case GAME_STATE.RUNNING:
      drawGame();
      break;
    case GAME_STATE.END:
      drawGameOverScreen();
      break;
  }
}

function resetGame() {
  player.x = LANE_POSITION.MID_LANE;
  player.y = DIMENSIONS.CANVAS_HEIGHT - PLAYER_DIMENSIONS.PLAYER_HEIGHT - 20;
  targetX = player.x;
  score = 0;
  obstacleArray.forEach((obstacle, index) => {
    obstacle.y = getRandomInt(
      -PLAYER_DIMENSIONS.PLAYER_HEIGHT * (index * 2 + 1),
      -PLAYER_DIMENSIONS.PLAYER_HEIGHT * index * 2
    );
  });
  console.log("Game reset");
}

window.addEventListener("keypress", (e) => {
  console.log(`Key pressed: ${e.key}`);
  switch (e.key) {
    case "Enter":
      if (gameState === GAME_STATE.START || gameState === GAME_STATE.END) {
        resetGame();
        gameState = GAME_STATE.RUNNING;
        console.log("Game state changed to RUNNING");
        requestAnimationFrame(gameLoop);
      }
      break;
    case "a":
      if (gameState === GAME_STATE.RUNNING && targetX - DIFFERENCE > 100) {
        targetX -= DIFFERENCE;
      }
      break;
    case "d":
      if (
        gameState === GAME_STATE.RUNNING &&
        targetX + DIFFERENCE < DIMENSIONS.CANVAS_WIDTH - 100
      ) {
        targetX += DIFFERENCE;
      }
      break;
  }
});

requestAnimationFrame(gameLoop);
