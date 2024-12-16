import { describe, it, expect } from "bun:test";
import { checkAllColumns, checkAllDiagonals, checkAllRowsRight, checkAllRowsLeft } from "./code";

describe("Day 4", () => {
  const rows = [
    "MMMSXXMASM",
    "MSAMXMSMSA",
    "AMXSXMAAMM",
    "MSAMASMSMX",
    "XMASAMXAMM",
    "XXAMMXXAMA",
    "SMSMSASXSS",
    "SAXAMASAAA",
    "MAMMMXMMMM",
    "MXMXAXMASX",
  ];

  it("should get rows right count", () => {
    const actual = checkAllRowsRight(rows);
    expect(actual).toEqual(3);
  });

  it("should get rows left count", () => {
    const actual = checkAllRowsLeft(rows);
    expect(actual).toEqual(2);
  });

  it("should get columns down count", () => {
    const actual = checkAllColumns(rows);
    expect(actual).toEqual(1);
  });

  it("should get all diagonals right-down count", () => {
    const actual = checkAllDiagonals(rows);
    expect(actual).toEqual(1);
  });
});
