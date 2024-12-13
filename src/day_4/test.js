import { getRowCount } from "./code.js";

describe("Day 4", () => {
  it("should get row count", () => {
    const row = "aaaXMASbbbXMASccc";
    expect(getRowCount(row)).toEqual(2);
  });
});
