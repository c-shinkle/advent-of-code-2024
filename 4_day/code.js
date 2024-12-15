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

/**
 * @param {string} input
 * @returns {number}
 */
function part1(input) {
  const rows = input.trim().split("\n");
  let count = 0;

  count += checkAllRows(rows);
  count += checkAllColumns(rows);
  count += checkAllDiagonals(rows);

  return count;
}

/**
 * @param {string} row
 * @returns {number}
 */
export function getRowCount(row) {
  let count = 0;
  const letters = Array.from(row);
  for (const substring of windows(letters, 4)) {
    if (substring === "XMAS") {
      count += 1;
    }
  }
  return count;
}

/**
 * @param {string[]} rows
 * @returns {number}
 */
export function checkAllRows(rows) {
  // Check all rows right
  let count = 0;
  for (const row of rows) {
    count += getRowCount(row);
  }

  return count;
}

/**
 * @param {string[]} rows
 * @returns {number}
 */
export function checkAllColumns(rows) {
  let count = 0;
  // Check all columns down
  for (let i = 0; i < rows[0].length; i++) {
    const col = [];
    for (const row of rows) {
      col.push(row[i]);
    }
    count += getRowCount(col);
  }
  return count;
}

/**
 * @param {string[]} rows
 * @returns {number}
 */
export function checkAllDiagonals(rows) {
  const rowLen = rows.length;
  const colLen = rows[0].length;
  let count = 0;

  for (const offset of rangeEx(0, rowLen)) {
    const dia = [];
    const temp = rangeEx(0, Math.min(rowLen - offset, colLen));
    for (const index of temp) {
      dia.push(rows[index + offset][index]);
    }
    count += getRowCount(dia);
  }

  for (const offset of rangeEx(1, colLen)) {
    const dia = [];
    for (const index of rangeEx(0, Math.min(rowLen, colLen - offset))) {
      dia.push(rows[index][index + offset]);
    }
    count += getRowCount(dia);
  }

  return count;
}

/**
 * @param {string[]} array
 * @param {number} count
 * @returns {string}
 */
function* windows(array, count = 1) {
  let index = 0;
  while (index < array.length - count + 1) {
    yield array.slice(index, index + count).join("");
    index++;
  }
}

/**
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
function rangeEx(start, end) {
  return Array.from({ length: end - start }, (_, i) => start + i);
}
