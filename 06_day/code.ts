import { readFileSync } from "fs";

const input = readFileSync("06_day/input.txt").toString();
// const input = `
// ....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...
// `;

type Direction = "^" | ">" | "v" | "<";

console.log(part1(input));
export function part1(input: string) {
  const lines = input.trim().split("\n");

  const grid = lines;

  let position: number[] | null = null;
  let direction: Direction | null = null;
  outer: for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const val = grid[y][x];
      if (val === "^" || val === ">" || val === "v" || val === "<") {
        position = [x, y];
        direction = val;
        break outer;
      }
    }
  }

  if (position === null || direction === null) {
    throw Error("no starting position found!");
  }

  let set = new Set<string>();

  while (position) {
    set.add(position.toString());

    const [x, y] = position;

    switch (direction) {
      case "^":
        if (y > 0 && grid[y - 1][x] === "#") {
          direction = ">";
        } else if (y > 0) {
          position = [x, y - 1];
        } else {
          position = null;
        }
        break;
      case ">":
        if (x < grid[0].length - 1 && grid[y][x + 1] === "#") {
          direction = "v";
        } else if (x < grid[0].length - 1) {
          position = [x + 1, y];
        } else {
          position = null;
        }
        break;
      case "v":
        if (y < grid.length - 1 && grid[y + 1][x] === "#") {
          direction = "<";
        } else if (y < grid.length - 1) {
          position = [x, y + 1];
        } else {
          position = null;
        }
        break;
      case "<":
        if (x > 0 && grid[y][x - 1] === "#") {
          direction = "^";
        } else if (x > 0) {
          position = [x - 1, y];
        } else {
          position = null;
        }
        break;
    }
  }

  return set.size;
}
