import { readFileSync } from "fs";

const data = readFileSync("src/day_1/input.txt").toString();
//const data = `3   4
//4   3
//2   5
//1   3
//3   9
//3   3
//`;

//console.log(data);

const part1 = (input) => {
  const lines = input.split("\n");
  lines.pop();
  let lhs = [];
  let rhs = [];

  for (const line of lines) {
    const [left, right] = line.split("   ");
    console.log(`left = ${left}`);
    console.log(`right = ${right}`);
    const leftNumber = Number.parseInt(left);
    const rightNumber = Number.parseInt(right);

    lhs.push(leftNumber);
    rhs.push(rightNumber);
  }

  lhs = lhs.toSorted((a, b) => a - b);
  rhs = rhs.toSorted((a, b) => a - b);

  let total = 0;

  for (let i = 0; i < lhs.length; i++) {
    total += Math.abs(lhs[i] - rhs[i]);
  }

  return total;
};

//console.log(part1(data));

const part2 = (input) => {
  const lines = input.split("\n");
  lines.pop();

  let lhs = [];
  let rhs = new Map();

  for (const line of lines) {
    const [left, right] = line.split("   ");
    const leftNumber = Number.parseInt(left);
    const rightNumber = Number.parseInt(right);
    console.log(`left = ${left}`);
    console.log(`right = ${right}`);

    lhs.push(leftNumber);

    const prev_value = rhs.get(rightNumber) ?? 0;
    rhs.set(rightNumber, prev_value + 1);
  }

  let sum = 0;
  for (const value of lhs) {
    let count = rhs.get(value) ?? 0;
    sum += value * count;
  }

  return sum;
};

console.log(part2(data));
