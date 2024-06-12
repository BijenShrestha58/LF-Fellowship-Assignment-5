"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInt = void 0;
function getRandomInt(min, max) {
    return min + Math.floor(max - min) * Math.random();
}
exports.getRandomInt = getRandomInt;
