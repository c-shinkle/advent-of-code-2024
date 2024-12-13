import { readFileSync } from "fs";

// const input = readFileSync("src/day_3/input.txt").toString();
const input = "aaaXMASbbbXMASccc";

/**
 * @param {string} input
 * @returns {number}
 */
const part1 = (input) => {
  const rows = input.split("\n");
  // lines.pop();
  const rowLen = rows.length;
  const colLen = rows[0].length;

  // Check all rows right
  let count = 0;
  for (const row of rows) {
    count += getRowCount(row);
  }

  // Check all columns down
  for (let i = 0; i < rowLen; i++) {
    const col = [];
    for (const row of rows) {
      col.push(row[i]);
    }
    count += getRowCount(col);
  }

  // Check all diagonals right-down
  // TODO how to get all diagonals, not just the longest one?
  const dia = [];
  for (let i = 0; i < Math.max(rowLen, colLen); i++) {
    dia.push(rows[i][i]);
  }
  count += getRowCount(dia);

  return 0;
};

/**
 * @param {string} row
 * @returns {number}
 */
export const getRowCount = (row) => {
  let count = 0;
  const letters = Array.from(row);
  for (const substring of windows(letters, 4)) {
    if (substring === "XMAS") {
      count += 1;
    }
  }
  return count;
};

/**
 * @param {string[]} array 
 * @param {number} count 
 * @returns {string}
 */
function* windows(array, count = 1) {
  let index = 0;
  while (index < array.length - count + 1) {
    yield array.slice(index, index + count).join('');
    index++;
  }
}

console.log(getRowCount(input));
