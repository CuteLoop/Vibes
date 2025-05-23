// MIT License
// Copyright (c) 2024 Your Name or Organization
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions: The above copyright
// notice and this permission notice shall be included in all copies or
// substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS",
// WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
// TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
// FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
// OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * @file Manages the state of the grid, storing black cells.
 */

/**
 * Set of black cell coordinates.
 * Coordinates are stored as strings "x,y".
 * @type {Set<string>}
 */
let blackCells = new Set();

/**
 * Checks if a cell is black.
 * @public
 * @param {number} x - The x-coordinate of the cell.
 * @param {number} y - The y-coordinate of the cell.
 * @returns {boolean} True if the cell is black, false otherwise.
 */
export function isBlack(x, y) {
    return blackCells.has(`${x},${y}`);
}

/**
 * Toggles the color of a cell.
 * If white, makes it black. If black, makes it white.
 * @public
 * @param {number} x - The x-coordinate of the cell.
 * @param {number} y - The y-coordinate of the cell.
 */
export function flipColor(x, y) {
    const coord = `${x},${y}`;
    if (blackCells.has(coord)) {
        blackCells.delete(coord);
    } else {
        blackCells.add(coord);
    }
}

/**
 * Resets the grid, clearing all black cells.
 * @public
 */
export function resetGrid() {
    blackCells.clear();
}

/**
 * Gets all black cells.
 * @public
 * @returns {Set<string>} A copy of the set of black cell coordinates.
 */
export function getBlackCells() {
    return new Set(blackCells);
} 