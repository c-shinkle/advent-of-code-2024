import assert from "assert";
import { readFileSync } from "fs";

const input = readFileSync("3_day/input.txt").toString();
// const input = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
// console.log(input);

const part1 = (input: string) => {
  const mulRegex = new RegExp(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
  const operandCaptures = new RegExp(/^mul\(([0-9]{1,3}),([0-9]{1,3})\)$/);
  let sum = 0;

  const matches = Array.from(input.matchAll(mulRegex));
  // console.log(matches.join("\n"));
  for (const match of matches) {
    const parts = operandCaptures.exec(match[0]);
    if (parts === null) {
      throw Error(`Failed to capture: ${match}`);
    }

    const [first, second] = parts.slice(1).map((p) => parseInt(p, 10));
    sum += first * second;
  }

  return sum;
};
// console.log(part1(input));

// const input =
//   "xmul(2,4)&mul[3,7]!^dont()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

const part2 = (input: string) => {
  const enableIndexes = [0].concat(
    [...input.matchAll(new RegExp(/do\(\)/g))].map((a) => a.index),
  );
  const disableIndexes = [...input.matchAll(new RegExp(/don't\(\)/g))].map(
    (a) => a.index,
  );

  const mulRegex = new RegExp(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
  const operandCaptures = new RegExp(/^mul\(([0-9]{1,3}),([0-9]{1,3})\)$/);
  let sum = 0;

  for (const match of input.matchAll(mulRegex)) {
    const start = match.index;
    const enableGLB = enableIndexes.findLast((e) => e <= start);
    assert(
      enableGLB !== undefined,
      "enableIndexes starts with a '0', therefore, we will always find an element",
    );
    const disableGLB = disableIndexes.findLast((e) => e <= start) ?? -1;

    if (enableGLB > disableGLB || (enableGLB <= start && start < disableGLB)) {
      const parts = operandCaptures.exec(match[0]);
      if (parts === null) {
        throw Error(`Failed to capture: ${match}`);
      }

      const [first, second] = parts.slice(1).map((p) => parseInt(p, 10));
      sum += first * second;
    }
  }

  return sum;
};
console.log(part2(input));
