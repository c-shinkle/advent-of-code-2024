import { readFileSync } from "fs";

const input = readFileSync("05_day/input.txt").toString();
// const input = `
// 47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13
//
// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47
// `;

console.log(part1(input));
export function part1(input: string) {
  const [orderingLines, pagesLines] = input.trim().split("\n\n");

  let beforeMap = new Map<number, Set<number>>();

  for (const line of orderingLines.split("\n")) {
    const [beforeNumber, afterNumber] = line
      .split("|")
      .map((s) => Number.parseInt(s));

    const beforeArray = beforeMap.get(beforeNumber);
    if (beforeArray) {
      beforeArray.add(afterNumber);
    } else {
      beforeMap.set(beforeNumber, new Set([afterNumber]));
    }
  }

  let count = 0;
  for (const line of pagesLines.split("\n")) {
    const rules = line.split(",").map((r) => Number.parseInt(r));
    if (helper(rules, beforeMap)) {
      count += rules[Math.floor(rules.length / 2)];
    }
  }

  return count;
}

function helper(rules: number[], beforeMap: Map<number, Set<number>>): boolean {
  const seen = new Set<number>();
  for (const rule of rules) {
    if (!beforeMap.get(rule)?.isDisjointFrom(seen)) {
      return false;
    }
    seen.add(rule);
  }
  return true;
}

export function part2(input: string) {
  const [orderingLines, pagesLines] = input.trim().split("\n\n");

  let beforeMap = new Map<number, Set<number>>();

  for (const line of orderingLines.split("\n")) {
    const [beforeNumber, afterNumber] = line
      .split("|")
      .map((s) => Number.parseInt(s));

    const beforeArray = beforeMap.get(beforeNumber);
    if (beforeArray) {
      beforeArray.add(afterNumber);
    } else {
      beforeMap.set(beforeNumber, new Set([afterNumber]));
    }
  }

  let count = 0;
  for (const line of pagesLines.split("\n")) {
    const rules = line.split(",").map((r) => Number.parseInt(r));
    if (!helper(rules, beforeMap)) {

      count += rules[Math.floor(rules.length / 2)];
    }
  }

  return count;
}

function fixRules(rules: string[], beforeMap: Map<number, Set<number>>) {

}
