import { describe, test, expect } from "bun:test";
import { checkAllColumns, checkAllDiagonals, checkAllRows } from "./code.js";

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

  test("should get rows right count", () => {
    const actual = checkAllRows(rows);
    expect(actual).toEqual(3);
  });

  test("should get columns down count", () => {
    const actual = checkAllColumns(rows);
    expect(actual).toEqual(1);
  });

  test("should get all diagonals right-down count", () => {
    const actual = checkAllDiagonals(rows);
    expect(actual).toEqual(1);
  });
});
