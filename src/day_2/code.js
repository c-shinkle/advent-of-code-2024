import { readFileSync } from "fs";

const input = readFileSync("src/day_2/input.txt").toString();
// const input = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`;

// console.log(input);

/**
 * @param {string} input
 */
const part1 = (input) => {
  const lines = input.split("\n");

  let sum = 0;
  for (const line of lines) {
    const levelStrings = line.split(" ");
    const levelNumbers = levelStrings.map((s) => Number.parseInt(s));

    if (isDesc(levelNumbers) || isAsc(levelNumbers)) {
      sum += 1;
    }
  }

  return sum;
};

console.log(part1(input));

/**
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

/**
 * @param {string[]} levels
 * @returns {boolean}
 */
const isAsc = (levels) => {
  let prev = levels[0];
  for (const level of levels.slice(1)) {
    const foo = range(prev + 1, prev + 3);
    if (!foo.includes(level)) {
      return false;
    }
    prev = level;
  }
  console.log("Found ascending levels!");
  console.log(`${levels}`);
  return true;
};

/**
 * @param {string[]} levels
 * @returns {boolean}
 */
const isDesc = (levels) => {
  let prev = levels[0];
  for (const level of levels.slice(1)) {
    const foo = range(prev - 3, prev - 1);
    if (!foo.includes(level)) {
      return false;
    }
    prev = level;
  }
  console.log("Found descending levels!");
  console.log(`${levels}`);
  return true;
};

/**
 * @param {string} input
 * @return {number}
 */
const part2 = (input) => {
  const lines = input.split("\n");

  let sum = 0;
  for (const line of lines) {
    const levelStrings = line.split(" ");
    const levelNumbers = levelStrings.map((s) => Number.parseInt(s));

    if (isDesc(levelNumbers) || isAsc(levelNumbers)) {
      console.log(`Original array safe: ${levelNumbers}`);
      sum += 1;
    } else if (checkAllSubsetsOfOne(levelNumbers)) {
      sum += 1;
    }
  }

  return sum;
};

/**
 * @param {number[]} allLevels
 * @returns {boolean}
 */
const checkAllSubsetsOfOne = (allLevels) => {
  for (let i = 0; i < allLevels.length; i++) {
    const subsetLevels = allLevels.toSpliced(i, 1);
    if (isDesc(subsetLevels) || isAsc(subsetLevels)) {
      console.log(
        `Subset safe: ${subsetLevels} (removed value: ${allLevels[i]})`,
      );
      return true;
    }
  }
  return false;
};

console.log(part2(input));
