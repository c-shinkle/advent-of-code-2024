import { describe, it, expect } from "bun:test";
import {
  checkAllColumnsDown,
  checkAllDiagonalsDownRight,
  checkAllDiagonalsDownLeft,
  checkAllDiagonalsUpRight,
  checkAllDiagonalsUpLeft,
  checkAllRowsRight,
  checkAllRowsLeft,
  checkAllColumnsUp,
  part1,
} from "./code";

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
    const actual = checkAllColumnsDown(rows);
    expect(actual).toEqual(1);
  });

  it("should get columns up count", () => {
    const actual = checkAllColumnsUp(rows);
    expect(actual).toEqual(2);
  });

  it("should get all diagonals down-right count", () => {
    const actual = checkAllDiagonalsDownRight(rows);
    expect(actual).toEqual(1);
  });

  it("should get all diagonals up-right count", () => {
    const actual = checkAllDiagonalsUpRight(rows);
    expect(actual).toEqual(4);
  });

  it("should get all diagonals down-left count", () => {
    const actual = checkAllDiagonalsDownLeft(rows);
    expect(actual).toEqual(1);
  });

  it("should get all diagonals up-left count", () => {
    const actual = checkAllDiagonalsUpLeft(rows);
    expect(actual).toEqual(4);
  });

  it("should count all xmas", () => {
    const actual = part1(rows.join("\n"));
    expect(actual).toEqual(18);
  });
});
