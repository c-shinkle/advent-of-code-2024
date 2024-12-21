import { readFileSync } from "fs";

const input = readFileSync("04_day/input.txt").toString();
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

// console.log(part1(input));

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

export function part2(input: string) {
  const grid = input.trim().split("\n");
  const rowLen = grid.length;
  const colLen = grid[0].length;
  let count = 0;

  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      const letterAInBounds =
        grid[row][col] == "A" &&
        0 < row &&
        row < rowLen - 1 &&
        0 < col &&
        col < colLen - 1;
      if (!letterAInBounds) {
        continue;
      }

      const upRightM = grid[row - 1][col + 1] == "M";
      const upRightS = grid[row - 1][col + 1] == "S";

      const upLeftM = grid[row - 1][col - 1] == "M";
      const upLeftS = grid[row - 1][col - 1] == "S";

      const downLeftM = grid[row + 1][col - 1] == "M";
      const downLeftS = grid[row + 1][col - 1] == "S";

      const downRightM = grid[row + 1][col + 1] == "M";
      const downRightS = grid[row + 1][col + 1] == "S";

      const upM = upRightM && upLeftM && downLeftS && downRightS;
      const leftM = upLeftM && downLeftM && upRightS && downRightS;
      const downM = downLeftM && downRightM && upRightS && upLeftS;
      const rightM = downRightM && upRightM && upLeftS && downLeftS;

      if (upM || leftM || downM || rightM) {
        count += 1;
      }
    }
  }
  return count;
}
console.log(part2(input));
