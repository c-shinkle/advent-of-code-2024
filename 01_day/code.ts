import { readFileSync } from "fs";

const input = readFileSync("01_day/input.txt").toString();
//const input = `3   4
//4   3
//2   5
//1   3
//3   9
//3   3
//`;

//console.log(input);

const part1 = (input: string) => {
  const lines = input.trim().split("\n");
  let lhs: number[] = [];
  let rhs: number[] = [];

  for (const line of lines) {
    const [left, right] = line.split("   ");
    console.log(`left = ${left}`);
    console.log(`right = ${right}`);
    const leftNumber = Number.parseInt(left);
    const rightNumber = Number.parseInt(right);

    lhs.push(leftNumber);
    rhs.push(rightNumber);
  }

  lhs.sort((a, b) => a - b);
  rhs.sort((a, b) => a - b);

  let total = 0;

  for (let i = 0; i < lhs.length; i++) {
    total += Math.abs(lhs[i] - rhs[i]);
  }

  return total;
};

//console.log(part1(input));

const part2 = (input: string) => {
  const lines = input.trim().split("\n");

  let lhs: number[] = [];
  let rhs = new Map<number, number>();

  for (const line of lines) {
    const [left, right] = line.split("   ");
    const leftNumber = Number.parseInt(left);
    const rightNumber = Number.parseInt(right);

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

console.log(part2(input));
