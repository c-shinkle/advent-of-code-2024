import { readFileSync } from "fs";

const input = readFileSync("src/day_3/input.txt").toString();

/**
 * @param {string} input
 * @returns {number}
 */
const part1 = (input) => {
  return 0;
};

/**
 * @param {string} row
 * @returns {number}
 */
const getRowCount = (row) => {
  let count = 0;
  const letters = Array.from(row);
  for (const substring of windows(letters, 4)) {
    if (substring === "XMAS") {
      count += 1;
    }
  }
  return count;
};

function* windows(array, count = 1) {
  if (typeof count !== "number") {
    throw new Error("paramater must be a number");
  }
  let index = 0;
  while (index < array.length - count + 1) {
    yield array.slice(index, index + count);
    index++;
  }
}
