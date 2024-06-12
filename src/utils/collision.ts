import Obstacle from "../classes/Obstacle";
import Player from "../classes/Player";

export function collisionDetection(
  player: Player,
  obstacleArray: Obstacle[]
): boolean {
  for (let obstacle of obstacleArray) {
    if (
      player.x < obstacle.x + obstacle.w &&
      player.x + player.w > obstacle.x &&
      player.y < obstacle.y + obstacle.h &&
      player.y + player.h > obstacle.y
    ) {
      return true;
    }
  }
  return false;
}
