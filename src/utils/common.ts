export function getRandomInt(min: number, max: number): number {
  return min + Math.floor(max - min) * Math.random();
}
