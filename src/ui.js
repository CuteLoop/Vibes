export function setupUI(cb) {
    const initSpeed = cb.getInitialSpeed();
    const initSize  = cb.getInitialCellSize();
  
    if (playPauseButton) playPauseButton.addEventListener('click', cb.onPlayPause);
    if (resetButton)     resetButton.addEventListener('click', cb.onReset);
    if (downloadButton)  downloadButton.addEventListener('click', cb.onDownload);
  
    if (speedSlider && speedValueSpan) {
      speedSlider.value = speedValueSpan.textContent = String(initSpeed);
  
      const onSpeed = e => {
        const v = Number((/** @type {HTMLInputElement} */ e.target).value);
        speedValueSpan.textContent = v;
        cb.onSpeedChange(v);
      };
      speedSlider.addEventListener('input', onSpeed);          // live update
    }
  
    if (cellSizeInput) {
      cellSizeInput.value = String(initSize);
      cellSizeInput.addEventListener('input', e => {
        const size = Number((/** @type {HTMLInputElement} */ e.target).value);
        if (size > 0) cb.onCellSizeChange(size);
      });
    }
  
    window.addEventListener('keydown', e => {
      if (e.code === 'Space')      { e.preventDefault(); cb.onPlayPause(); }
      else if (e.key.toLowerCase() === 'r') cb.onReset();
    });
  }
  
  export function updatePlayPauseButton(isPlaying) {
    if (playPauseButton) playPauseButton.textContent = isPlaying ? 'Pause' : 'Play';
  }
  