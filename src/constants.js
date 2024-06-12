"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GAME_STATE = exports.SIDE_SPEED = exports.DIFFERENCE = exports.LANE_POSITION = exports.PLAYER_DIMENSIONS = exports.SPEED = exports.DIMENSIONS = void 0;
exports.DIMENSIONS = {
    CANVAS_WIDTH: window.innerWidth / 1.5,
    CANVAS_HEIGHT: window.innerHeight,
};
exports.SPEED = 5;
exports.PLAYER_DIMENSIONS = {
    PLAYER_WIDTH: 100,
    PLAYER_HEIGHT: 150,
};
exports.LANE_POSITION = {
    LEFT_LANE: ((1 / 3) * exports.DIMENSIONS.CANVAS_WIDTH) / 2 -
        exports.PLAYER_DIMENSIONS.PLAYER_WIDTH / 2 +
        100,
    MID_LANE: exports.DIMENSIONS.CANVAS_WIDTH / 2 - exports.PLAYER_DIMENSIONS.PLAYER_WIDTH / 2,
    RIGHT_LANE: (exports.DIMENSIONS.CANVAS_WIDTH * (2 / 3) + exports.DIMENSIONS.CANVAS_WIDTH) / 2 -
        exports.PLAYER_DIMENSIONS.PLAYER_WIDTH / 2 -
        100,
};
exports.DIFFERENCE = exports.LANE_POSITION.MID_LANE - exports.LANE_POSITION.LEFT_LANE;
exports.SIDE_SPEED = 10;
var GAME_STATE;
(function (GAME_STATE) {
    GAME_STATE["START"] = "START";
    GAME_STATE["RUNNING"] = "RUNNING";
    GAME_STATE["END"] = "END";
})(GAME_STATE || (exports.GAME_STATE = GAME_STATE = {}));
