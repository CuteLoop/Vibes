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
 * @file Main entry point for the Langton's Ant simulation using p5.js.
 */

import { getAntState, moveAnt, resetAnt } from './ant.js';
import { getBlackCells, resetGrid } from './grid.js';
import { setupUI, updatePlayPauseButton } from './ui.js';

let p5Instance;
let isPlaying = false;
let stepsPerFrame = 10;
let currentCellSize = 10;
let panX = 0;
let panY = 0;
let zoom = 1;
let isDragging = false;
let lastMouseX, lastMouseY;

/**
 * p5.js setup function. Initializes canvas and UI.
 * @global
 */
window.setup = function() {
    const canvasContainer = document.getElementById('canvasContainer');
    const canvas = createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    canvas.parent('canvasContainer');
    p5Instance = this; // Save p5 instance for global access if needed elsewhere
    frameRate(60);
    resetSimulation();

    setupUI({
        onPlayPause: togglePlayPause,
        onReset: resetSimulation,
        onSpeedChange: (speed) => { stepsPerFrame = speed; },
        onCellSizeChange: (size) => {
            currentCellSize = size;
            // Recenter view when cell size changes for better UX
            const ant = getAntState();
            panX = width / 2 - ant.x * currentCellSize * zoom;
            panY = height / 2 - ant.y * currentCellSize * zoom;
            redrawGrid();
        },
        onDownload: downloadCanvasAsPNG,
        getInitialSpeed: () => stepsPerFrame,
        getInitialCellSize: () => currentCellSize,
    });

    // Prevent default browser behavior for mouse wheel (scrolling)
    canvas.elt.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
}

/**
 * p5.js draw function. Called repeatedly to update and draw the simulation.
 * @global
 */
window.draw = function() {
    if (isPlaying) {
        for (let i = 0; i < stepsPerFrame; i++) {
            moveAnt();
        }
    }
    redrawGrid();
}

/**
 * Redraws the entire grid and ant based on the current state.
 * @private
 */
function redrawGrid() {
    background(255); // White background
    push(); // Save current drawing style
    translate(panX, panY);
    scale(zoom);

    // Draw black cells
    fill(0); // Black color for cells
    noStroke();
    const blackCells = getBlackCells();
    blackCells.forEach(coord => {
        const [x, y] = coord.split(',').map(Number);
        rect(x * currentCellSize, y * currentCellSize, currentCellSize, currentCellSize);
    });

    // Draw ant
    const ant = getAntState();
    fill(255, 0, 0); // Red color for ant
    stroke(0);
    strokeWeight(1 / zoom); // Keep stroke weight consistent with zoom
    translate(ant.x * currentCellSize + currentCellSize / 2, ant.y * currentCellSize + currentCellSize / 2);
    rotate(ant.dir * HALF_PI); // 0: Up, 1: Right, 2: Down, 3: Left

    // Draw ant as a triangle
    const antSize = currentCellSize * 0.8;
    triangle(0, -antSize / 2, -antSize / 2, antSize / 2, antSize / 2, antSize / 2);

    pop(); // Restore drawing style
}

/**
 * Toggles the simulation state between playing and paused.
 * @private
 */
function togglePlayPause() {
    isPlaying = !isPlaying;
    updatePlayPauseButton(isPlaying);
}

/**
 * Resets the simulation to its initial state.
 * @private
 */
function resetSimulation() {
    isPlaying = false;
    updatePlayPauseButton(false);
    resetGrid();
    // Start ant at the center of the initial view (approximately)
    resetAnt(0,0); // Ant starts at logical (0,0)
    // Reset pan and zoom to center the ant
    panX = width / 2;
    panY = height / 2;
    zoom = 1;
    redrawGrid(); // Draw initial state
}

/**
 * Handles canvas resizing when the window is resized.
 * @global
 */
window.windowResized = function() {
    const canvasContainer = document.getElementById('canvasContainer');
    if (canvasContainer) {
      resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
      // Adjust pan to keep the center of the view relatively stable after resize
      // This is a simple heuristic and might need refinement for perfect centering.
      panX = width / 2 - (getAntState().x * currentCellSize * zoom) + (width - canvasContainer.offsetWidth)/2;
      panY = height / 2 - (getAntState().y * currentCellSize * zoom) + (height - canvasContainer.offsetHeight)/2;
      redrawGrid();
    }
}

/**
 * Downloads the current canvas content as a PNG image.
 * @private
 */
function downloadCanvasAsPNG() {
    saveCanvas('langtons_ant', 'png');
}

/**
 * Handles mouse press events for panning.
 * @global
 */
window.mousePressed = function(event) {
    // Check if mouse is over canvas and not on UI elements
    if (event.target.tagName === 'CANVAS') {
        isDragging = true;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }
}

/**
 * Handles mouse drag events for panning.
 * @global
 */
window.mouseDragged = function(event) {
    if (isDragging && event.target.tagName === 'CANVAS') {
        panX += mouseX - lastMouseX;
        panY += mouseY - lastMouseY;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        redrawGrid();
    }
}

/**
 * Handles mouse release events to stop panning.
 * @global
 */
window.mouseReleased = function() {
    isDragging = false;
}

/**
 * Handles mouse wheel events for zooming.
 * @global
 * @param {WheelEvent} event - The mouse wheel event.
 */
window.mouseWheel = function(event) {
    // Check if mouse is over canvas and not on UI elements
    if (event.target.tagName === 'CANVAS') {
        const zoomFactor = 0.1;
        const direction = event.deltaY > 0 ? -1 : 1; // -1 for zoom out, 1 for zoom in
        const oldZoom = zoom;

        zoom += direction * zoomFactor * zoom; // Zoom scales with current zoom level
        zoom = constrain(zoom, 0.1, 10); // Min/max zoom levels

        // Zoom towards the mouse cursor
        // World coordinates of mouse before zoom
        const mouseWorldX_before = (mouseX - panX) / oldZoom;
        const mouseWorldY_before = (mouseY - panY) / oldZoom;

        // New pan to keep mouseWorldX_before at the same screen position (mouseX)
        panX = mouseX - mouseWorldX_before * zoom;
        panY = mouseY - mouseWorldY_before * zoom;

        redrawGrid();
        return false; // Prevent default browser scroll
    }
} 