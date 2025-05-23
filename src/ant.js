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
 * @file Manages the ant's state and movement logic.
 */

import { isBlack, flipColor } from './grid.js';

/**
 * Represents the ant's current state.
 * @typedef {object} AntState
 * @property {number} x - The x-coordinate of the ant.
 * @property {number} y - The y-coordinate of the ant.
 * @property {number} dir - The direction the ant is facing (0: up, 1: right, 2: down, 3: left).
 */

/** @type {AntState} */
let ant = { x: 0, y: 0, dir: 0 }; // dir: 0=N, 1=E, 2=S, 3=W

/**
 * Gets the ant's current state (position and direction).
 * @public
 * @returns {AntState} The ant's state.
 */
export function getAntState() {
    return { ...ant };
}

/**
 * Moves the ant one step according to Langton's rules.
 * 1. Checks current cell color.
 * 2. Turns left/right.
 * 3. Flips cell color.
 * 4. Moves forward.
 * @public
 */
export function moveAnt() {
    const onBlack = isBlack(ant.x, ant.y);

    if (onBlack) {
        ant.dir = (ant.dir + 3) % 4; // Turn left ( (dir - 1 + 4) % 4 )
    } else {
        ant.dir = (ant.dir + 1) % 4; // Turn right
    }

    flipColor(ant.x, ant.y);

    switch (ant.dir) {
        case 0: // Up (North)
            ant.y--;
            break;
        case 1: // Right (East)
            ant.x++;
            break;
        case 2: // Down (South)
            ant.y++;
            break;
        case 3: // Left (West)
            ant.x--;
            break;
    }
}

/**
 * Resets the ant to its initial position and direction (center, facing up).
 * @public
 * @param {number} startX - The initial x-coordinate.
 * @param {number} startY - The initial y-coordinate.
 */
export function resetAnt(startX = 0, startY = 0) {
    ant.x = startX;
    ant.y = startY;
    ant.dir = 0; // Facing North
} 