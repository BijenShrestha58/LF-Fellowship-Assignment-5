"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collisionDetection = void 0;
function collisionDetection(player, obstacleArray) {
    for (var _i = 0, obstacleArray_1 = obstacleArray; _i < obstacleArray_1.length; _i++) {
        var obstacle = obstacleArray_1[_i];
        if (player.x < obstacle.x + obstacle.w &&
            player.x + player.w > obstacle.x &&
            player.y < obstacle.y + obstacle.h &&
            player.y + player.h > obstacle.y) {
            return true;
        }
    }
    return false;
}
exports.collisionDetection = collisionDetection;
