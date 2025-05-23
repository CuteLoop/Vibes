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
 * @file Manages UI controls and event handlers.
 */

// Note: Module-level DOM element constants have been removed.
// Lookups are now done inside setupUI or on-demand.

/**
 * Initializes UI elements and attaches event listeners.
 * @public
 * @param {object} callbacks - Object containing callback functions for UI events.
 * @param {() => void} callbacks.onPlayPause - Called when play/pause button is clicked.
 * @param {() => void} callbacks.onReset - Called when reset button is clicked.
 * @param {(value: number) => void} callbacks.onSpeedChange - Called when speed slider value changes.
 * @param {(value: number) => void} callbacks.onCellSizeChange - Called when cell size input changes.
 * @param {() => void} callbacks.onDownload - Called when download button is clicked.
 * @param {() => number} callbacks.getInitialSpeed - Function to get initial speed.
 * @param {() => number} callbacks.getInitialCellSize - Function to get initial cell size.
 */
export function setupUI(callbacks) {
    const playPauseButton = /** @type {HTMLButtonElement | null} */ (document.getElementById('playPause'));
    const resetButton = /** @type {HTMLButtonElement | null} */ (document.getElementById('reset'));
    const speedSlider = /** @type {HTMLInputElement | null} */ (document.getElementById('speed'));
    const speedValueSpan = /** @type {HTMLSpanElement | null} */ (document.getElementById('speedValue'));
    const cellSizeInput = /** @type {HTMLInputElement | null} */ (document.getElementById('cellSize'));
    const downloadButton = /** @type {HTMLButtonElement | null} */ (document.getElementById('download'));
  
    if (playPauseButton) {
        playPauseButton.addEventListener('click', callbacks.onPlayPause);
    }
    if (resetButton) {
        resetButton.addEventListener('click', callbacks.onReset);
    }
    if (speedSlider && speedValueSpan) {
        speedSlider.value = callbacks.getInitialSpeed().toString();
        speedValueSpan.textContent = callbacks.getInitialSpeed().toString();
        speedSlider.addEventListener('input', (event) => {
            const target = /** @type {HTMLInputElement} */ (event.target);
            const speed = parseInt(target.value, 10);
            speedValueSpan.textContent = speed.toString();
            callbacks.onSpeedChange(speed);
        });
    }
    if (cellSizeInput) {
        cellSizeInput.value = callbacks.getInitialCellSize().toString();
        cellSizeInput.addEventListener('change', (event) => { // Using 'change' for number input
            const target = /** @type {HTMLInputElement} */ (event.target);
            const size = parseInt(target.value, 10);
            if (size > 0) {
                callbacks.onCellSizeChange(size);
            }
        });
    }
    if (downloadButton) {
        downloadButton.addEventListener('click', callbacks.onDownload);
    }
  
    // Keyboard shortcuts
    window.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            event.preventDefault(); // Prevent scrolling
            callbacks.onPlayPause();
        }
        if (event.key === 'r' || event.key === 'R') {
            callbacks.onReset();
        }
    });
}
  
/**
 * Updates the play/pause button text based on the simulation state.
 * @public
 * @param {boolean} isPlaying - True if the simulation is currently playing.
 */
export function updatePlayPauseButton(isPlaying) {
    const btn = /** @type {HTMLButtonElement|null} */ (
        document.getElementById('playPause')
    );
    if (btn) btn.textContent = isPlaying ? 'Pause' : 'Play';
}
  