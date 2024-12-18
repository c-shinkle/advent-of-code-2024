import { readFileSync } from "fs";

const input = readFileSync("4_day/input.txt").toString();
// const input = `
// MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX
// `;

console.log(part1(input));

export function part1(input: string) {
  let count = 0;

  const rows = input.trim().split("\n");
  count += checkAllRowsRight(rows);
  count += checkAllRowsLeft(rows);
  count += checkAllColumnsDown(rows);
  count += checkAllColumnsUp(rows);
  count += checkAllDiagonalsDownRight(rows);
  count += checkAllDiagonalsUpRight(rows);
  count += checkAllDiagonalsDownLeft(rows);
  count += checkAllDiagonalsUpLeft(rows);

  return count;
}

export function getRowCount(row: string) {
  let count = 0;
  let i = -1;
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

export function checkAllColumnsDown(rows: string[]) {
  let count = 0;
  for (let i = 0; i < rows[0].length; i++) {
    let col = "";
    for (const row of rows) {
      col += row[i];
    }
    count += getRowCount(col);
  }
  return count;
}

export function checkAllColumnsUp(rows: string[]) {
  const reverseCols = rows.toReversed();
  return checkAllColumnsDown(reverseCols);
}

export function checkAllDiagonalsDownRight(rows: string[]) {
  const rowLen = rows.length;
  const colLen = rows[0].length;
  let count = 0;

  for (let offset = 0; offset < rowLen; offset++) {
    let dia = "";
    for (let index = 0; index < Math.min(rowLen - offset, colLen); index++) {
      dia += rows[index + offset][index];
    }
    count += getRowCount(dia);
  }

  for (let offset = 1; offset < colLen; offset++) {
    let dia = "";
    for (let index = 0; index < Math.min(rowLen, colLen - offset); index++) {
      dia += rows[index][index + offset];
    }
    count += getRowCount(dia);
  }

  return count;
}

export function checkAllDiagonalsUpRight(rows: string[]) {
  const reverseCols = rows.toReversed();
  return checkAllDiagonalsDownRight(reverseCols);
}

export function checkAllDiagonalsDownLeft(rows: string[]) {
  const reverseRows = rows.map((r) => [...r].reverse().join(""));
  return checkAllDiagonalsDownRight(reverseRows);
}

export function checkAllDiagonalsUpLeft(rows: string[]) {
  const reverseRowsAndCols = rows
    .map((r) => [...r].reverse().join(""))
    .reverse();
  return checkAllDiagonalsDownRight(reverseRowsAndCols);
}

// function rangeEx(start: number, end: number) {
//   return Array.from({ length: end - start }, (_, i) => start + i);
// }
