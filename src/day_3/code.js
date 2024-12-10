import { readFileSync } from "fs";

const input = readFileSync("src/day_3/input.txt").toString();
// const input =
//   "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

console.log(input);

/**
 * @param {string} input
 */
const part1 = (input) => {
  const mulRegex = new RegExp(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
  const operandCaptures = new RegExp(/^mul\(([0-9]{1,3}),([0-9]{1,3})\)$/);
  let sum = 0;

  const matches = Array.from(input.matchAll(mulRegex));
  console.log(matches.join("\n"));
  for (const match of matches) {
    const parts = operandCaptures.exec(match);
    if (parts === null) {
      throw Error(`Failed to capture: ${match}`);
    }

    const [first, second] = parts.slice(1).map((p) => parseInt(p, 10));
    sum += first * second;
  }

  return sum;
};

console.log(part1(input));
