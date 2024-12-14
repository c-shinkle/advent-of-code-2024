import { describe, test, expect } from "bun:test";
import { getRowCount } from "./code.js";

describe("Day 4", () => {
  test("should get row count", () => {
    const row = "aaaXMASbbbXMASccc";
    expect(getRowCount(row)).toEqual(2);
  });
});
