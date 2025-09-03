import React from 'react';
import styles from '../styles/rtm.module.css';

const Timeline = ({
  currentTime,
  maxTime,
  isPlaying,
  playbackSpeed,
  onTimeChange,
  onPlayPause,
  onSpeedChange,
  onSkip
}) => {
  // Format time to HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSliderChange = (e) => {
    const newTime = parseInt(e.target.value);
    onTimeChange(newTime);
  };

  const handlePlayPauseClick = () => {
    onPlayPause();
  };

  const handleSpeedChangeSelect = (e) => {
    const newSpeed = parseFloat(e.target.value);
    onSpeedChange(newSpeed);
  };

  const handleSkipClick = (seconds) => {
    onSkip(seconds);
  };

  const speedOptions = [0.25, 0.5, 1, 1.5, 2, 4];

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineControls}>
        {/* Time Display */}
        <div className={styles.timeDisplay}>
          <span className={styles.currentTime}>{formatTime(currentTime)}</span>
          <span className={styles.timeSeparator}>/</span>
          <span className={styles.maxTime}>{formatTime(maxTime)}</span>
        </div>

        {/* Control Buttons */}
        <div className={styles.controlButtons}>
          {/* Skip Backward 30s */}
          <button 
            className={styles.controlBtn} 
            onClick={() => handleSkipClick(-30)}
            title="Skip back 30s"
            type="button"
          >
            ⏪
          </button>

          {/* Skip Backward 10s */}
          <button 
            className={styles.controlBtn} 
            onClick={() => handleSkipClick(-10)}
            title="Skip back 10s"
            type="button"
          >
            ⏮️
          </button>

          {/* Play/Pause */}
          <button 
            className={`${styles.controlBtn} ${styles.playPauseBtn}`} 
            onClick={handlePlayPauseClick}
            title={isPlaying ? "Pause" : "Play"}
            type="button"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          {/* Skip Forward 10s */}
          <button 
            className={styles.controlBtn} 
            onClick={() => handleSkipClick(10)}
            title="Skip forward 10s"
            type="button"
          >
            ⏭️
          </button>

          {/* Skip Forward 30s */}
          <button 
            className={styles.controlBtn} 
            onClick={() => handleSkipClick(30)}
            title="Skip forward 30s"
            type="button"
          >
            ⏩
          </button>
        </div>

        {/* Speed Control */}
        <div className={styles.speedControl}>
          <label className={styles.speedLabel}>Speed:</label>
          <select 
            value={playbackSpeed} 
            onChange={handleSpeedChangeSelect}
            className={styles.speedSelect}
          >
            {speedOptions.map(speed => (
              <option key={speed} value={speed}>
                {speed}x
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline Slider */}
      <div className={styles.timelineSlider}>
        <input
          type="range"
          min="0"
          max={maxTime}
          value={currentTime}
          onChange={handleSliderChange}
          className={styles.slider}
        />
        
        {/* Progress Bar Visual */}
        <div className={styles.progressContainer}>
          <div className={styles.progressTrack}></div>
          <div 
            className={styles.progressBar}
            style={{ width: `${maxTime > 0 ? (currentTime / maxTime) * 100 : 0}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;