import { reverse } from "dns";
import { readFileSync } from "fs";

// const input = readFileSync("4_day/input.txt").toString();
const input = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

console.log(part1(input));

export function part1(input: string) {
  const rows = input.trim().split("\n");
  const reverseRows = rows.map((r) => [...r].reverse().join(""));
  const reverseColumns = rows.reverse();
  let count = 0;

  // Check all rows right
  count += checkAllRowsRight(rows);
  // Check all rows left
  count += checkAllRowsLeft(reverseRows);
  // Check all columns down
  count += checkAllColumns(rows);
  count += checkAllDiagonals(rows);

  return count;
}

export function getRowCount(row: string) {
  let count = 0,
    i = -1;
  while ((i = row.indexOf("XMAS", i + 1)) != -1) {
    count += 1;
  }
  return count;
}

export function checkAllRowsRight(rows: string[]) {
  let count = 0;
  for (const row of rows) {
    count += getRowCount(row);
  }

  return count;
}

export function checkAllRowsLeft(rows: string[]) {
  const reverseRows = rows.map((r) => [...r].reverse().join(""));
  return checkAllRowsRight(reverseRows);
}

export function checkAllColumns(rows: string[]) {
  let count = 0;
  // Check all columns down
  for (let i = 0; i < rows[0].length; i++) {
    let col = "";
    for (const row of rows) {
      col += row[i];
    }
    count += getRowCount(col);
  }
  return count;
}

export function checkAllDiagonals(rows: string[]) {
  const rowLen = rows.length;
  const colLen = rows[0].length;
  let count = 0;

  for (const offset of rangeEx(0, rowLen)) {
    let dia = "";
    for (const index of rangeEx(0, Math.min(rowLen - offset, colLen))) {
      dia += rows[index + offset][index];
    }
    count += getRowCount(dia);
  }

  for (const offset of rangeEx(1, colLen)) {
    let dia = "";
    for (const index of rangeEx(0, Math.min(rowLen, colLen - offset))) {
      dia += rows[index][index + offset];
    }
    count += getRowCount(dia);
  }

  return count;
}

function rangeEx(start: number, end: number) {
  return Array.from({ length: end - start }, (_, i) => start + i);
}
