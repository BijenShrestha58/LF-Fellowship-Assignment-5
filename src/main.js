"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.css");
var constants_1 = require("./constants");
var common_1 = require("./utils/common");
var Player_1 = require("./classes/Player");
var Obstacle_1 = require("./classes/Obstacle");
var collision_1 = require("./utils/collision");
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
var playerImage = document.getElementById("player-image");
var obstacleImage = document.getElementById("obstacle1-image");
var backgroundImage = document.getElementById("background-image");
canvas.width = constants_1.DIMENSIONS.CANVAS_WIDTH;
canvas.height = constants_1.DIMENSIONS.CANVAS_HEIGHT;
var obstacle1 = new Obstacle_1.default(
  constants_1.LANE_POSITION.LEFT_LANE,
  (0, common_1.getRandomInt)(
    constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT * -2,
    0
  ),
  constants_1.PLAYER_DIMENSIONS.PLAYER_WIDTH,
  constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT
);
var obstacle2 = new Obstacle_1.default(
  constants_1.LANE_POSITION.MID_LANE,
  (0, common_1.getRandomInt)(
    constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT * -7,
    constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT * -5
  ),
  constants_1.PLAYER_DIMENSIONS.PLAYER_WIDTH,
  constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT
);
var obstacle3 = new Obstacle_1.default(
  constants_1.LANE_POSITION.RIGHT_LANE,
  (0, common_1.getRandomInt)(
    constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT * -5,
    constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT * -3
  ),
  constants_1.PLAYER_DIMENSIONS.PLAYER_WIDTH,
  constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT
);
var obstacleArray = [obstacle1, obstacle2, obstacle3];
var player = new Player_1.default(
  constants_1.LANE_POSITION.MID_LANE,
  constants_1.DIMENSIONS.CANVAS_HEIGHT -
    constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT -
    20,
  constants_1.PLAYER_DIMENSIONS.PLAYER_WIDTH,
  constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT
);
var targetX = player.x;
var score = 0;
var highScore = localStorage.getItem("highScore")
  ? parseInt(localStorage.getItem("highScore"))
  : 0;
var gameState = constants_1.GAME_STATE.START;
var bgY1 = 0;
var bgY2 = -constants_1.DIMENSIONS.CANVAS_HEIGHT;
var currentSpeed = constants_1.SPEED;
function drawStartScreen() {
  ctx.fillStyle = "#000";
  ctx.fillRect(
    0,
    0,
    constants_1.DIMENSIONS.CANVAS_WIDTH,
    constants_1.DIMENSIONS.CANVAS_HEIGHT
  );
  ctx.fillStyle = "#fff";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "Press Enter to Start",
    constants_1.DIMENSIONS.CANVAS_WIDTH / 2,
    constants_1.DIMENSIONS.CANVAS_HEIGHT / 2
  );
  console.log("Displaying start screen");
  requestAnimationFrame(gameLoop);
}
function drawGameOverScreen() {
  ctx.fillStyle = "#000";
  ctx.fillRect(
    0,
    0,
    constants_1.DIMENSIONS.CANVAS_WIDTH,
    constants_1.DIMENSIONS.CANVAS_HEIGHT
  );
  ctx.fillStyle = "#fff";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "Game Over",
    constants_1.DIMENSIONS.CANVAS_WIDTH / 2,
    constants_1.DIMENSIONS.CANVAS_HEIGHT / 2 - 60
  );
  ctx.fillText(
    "Score: ".concat(score),
    constants_1.DIMENSIONS.CANVAS_WIDTH / 2,
    constants_1.DIMENSIONS.CANVAS_HEIGHT / 2
  );
  ctx.fillText(
    "High Score: ".concat(highScore),
    constants_1.DIMENSIONS.CANVAS_WIDTH / 2,
    constants_1.DIMENSIONS.CANVAS_HEIGHT / 2 + 30
  );
  ctx.fillText(
    "Press Enter to Restart",
    constants_1.DIMENSIONS.CANVAS_WIDTH / 2,
    constants_1.DIMENSIONS.CANVAS_HEIGHT / 2 + 60
  );
  console.log("Displaying game over screen");
  requestAnimationFrame(gameLoop);
}
function drawGame() {
  ctx.clearRect(
    0,
    0,
    constants_1.DIMENSIONS.CANVAS_WIDTH,
    constants_1.DIMENSIONS.CANVAS_HEIGHT
  );
  bgY1 += currentSpeed / 2;
  bgY2 += currentSpeed / 2;
  if (bgY1 >= constants_1.DIMENSIONS.CANVAS_HEIGHT) {
    bgY1 = bgY2 - constants_1.DIMENSIONS.CANVAS_HEIGHT;
  }
  if (bgY2 >= constants_1.DIMENSIONS.CANVAS_HEIGHT) {
    bgY2 = bgY1 - constants_1.DIMENSIONS.CANVAS_HEIGHT;
  }
  ctx.drawImage(
    backgroundImage,
    0,
    bgY1,
    constants_1.DIMENSIONS.CANVAS_WIDTH,
    constants_1.DIMENSIONS.CANVAS_HEIGHT
  );
  ctx.drawImage(
    backgroundImage,
    0,
    bgY2,
    constants_1.DIMENSIONS.CANVAS_WIDTH,
    constants_1.DIMENSIONS.CANVAS_HEIGHT
  );
  ctx.strokeStyle = "#fff";
  obstacleArray.forEach(function (obstacle) {
    ctx.beginPath();
    ctx.drawImage(
      obstacleImage,
      obstacle.x,
      obstacle.y,
      obstacle.w,
      obstacle.h
    );
    obstacle.y = obstacle.y + currentSpeed;
    if (obstacle.y > constants_1.DIMENSIONS.CANVAS_HEIGHT) {
      obstacle.y = (0, common_1.getRandomInt)(-1000, -100);
      obstacleArray.forEach(function (obsCheck) {
        if (obstacle === obsCheck) {
          return;
        }
        if (
          obsCheck.y - obstacle.y <
          2 * constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT
        ) {
          obstacle.y -= 2 * constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT + 50;
        }
      });
      score += 1;
      currentSpeed = constants_1.SPEED + Math.floor(score / 10);
    }
  });
  if (player.x < targetX) {
    player.x += Math.min(constants_1.SIDE_SPEED, targetX - player.x);
  } else if (player.x > targetX) {
    player.x -= Math.min(constants_1.SIDE_SPEED, player.x - targetX);
  }
  ctx.beginPath();
  ctx.drawImage(playerImage, player.x, player.y, player.w, player.h);
  if ((0, collision_1.collisionDetection)(player, obstacleArray)) {
    gameState = constants_1.GAME_STATE.END;
    console.log("Game Over!");
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
    }
    return;
  }
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("Score: ".concat(score), 60, 20);
  ctx.fillText("High Score: ".concat(highScore), 60, 50);
  requestAnimationFrame(gameLoop);
}
function gameLoop() {
  switch (gameState) {
    case constants_1.GAME_STATE.START:
      drawStartScreen();
      break;
    case constants_1.GAME_STATE.RUNNING:
      drawGame();
      break;
    case constants_1.GAME_STATE.END:
      drawGameOverScreen();
      break;
  }
}
function resetGame() {
  player.x = constants_1.LANE_POSITION.MID_LANE;
  player.y =
    constants_1.DIMENSIONS.CANVAS_HEIGHT -
    constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT -
    20;
  targetX = player.x;
  score = 0;
  obstacleArray.forEach(function (obstacle, index) {
    obstacle.y = (0, common_1.getRandomInt)(
      -constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT * (index * 2 + 1),
      -constants_1.PLAYER_DIMENSIONS.PLAYER_HEIGHT * index * 2
    );
  });
  console.log("Game reset");
}
window.addEventListener("keypress", function (e) {
  console.log("Key pressed: ".concat(e.key));
  switch (e.key) {
    case "Enter":
      if (
        gameState === constants_1.GAME_STATE.START ||
        gameState === constants_1.GAME_STATE.END
      ) {
        resetGame();
        gameState = constants_1.GAME_STATE.RUNNING;
        console.log("Game state changed to RUNNING");
        requestAnimationFrame(gameLoop);
      }
      break;
    case "a":
      if (
        gameState === constants_1.GAME_STATE.RUNNING &&
        targetX - constants_1.DIFFERENCE > 100
      ) {
        targetX -= constants_1.DIFFERENCE;
      }
      break;
    case "d":
      if (
        gameState === constants_1.GAME_STATE.RUNNING &&
        targetX + constants_1.DIFFERENCE <
          constants_1.DIMENSIONS.CANVAS_WIDTH - 100
      ) {
        targetX += constants_1.DIFFERENCE;
      }
      break;
  }
});
requestAnimationFrame(gameLoop);
