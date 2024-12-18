import { readFileSync } from "fs";

const input = readFileSync("2_day/input.txt").toString();
// const input = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`;

// console.log(input);

const part1 = (input: string) => {
  const lines = input.trim().split("\n");

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

// console.log(part1(input));

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const isAsc = (levels: number[]) => {
  let prev = levels[0];
  for (const level of levels.slice(1)) {
    const foo = range(prev + 1, prev + 3);
    if (!foo.includes(level)) {
      return false;
    }
    prev = level;
  }
  return true;
};

const isDesc = (levels: number[]) => {
  let prev = levels[0];
  for (const level of levels.slice(1)) {
    const foo = range(prev - 3, prev - 1);
    if (!foo.includes(level)) {
      return false;
    }
    prev = level;
  }
  return true;
};

const part2 = (input: string) => {
  const lines = input.trim().split("\n");

  let sum = 0;
  for (const line of lines) {
    const levels = line.split(" ").map((s) => Number.parseInt(s));

    if (isDesc(levels) || isAsc(levels)) {
      // console.log(`Original array safe: ${levels}`);
      sum += 1;
    } else if (checkAllSubsetsOfOne(levels)) {
      sum += 1;
    }
  }

  return sum;
};

const checkAllSubsetsOfOne = (allLevels: number[]) => {
  for (let i = 0; i < allLevels.length; i++) {
    const subsetLevels = allLevels.toSpliced(i, 1);
    if (isDesc(subsetLevels) || isAsc(subsetLevels)) {
      // console.log(`Subset safe: ${subsetLevels} (removed value: ${allLevels[i]})`);
      return true;
    }
  }
  return false;
};

console.log(part2(input));
