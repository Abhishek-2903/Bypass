import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "../styles/rtm.module.css";
import Sidebar from "../components/Sidebar";
import KillFeed from "../components/KillFeed";
import StatsTable from "../components/StatsTable";
import Timeline from "../components/Timeline";
import { WS_CONFIG } from "../config";

// Dynamically import Leaflet-based MapSection to avoid SSR issues
const MapSection = dynamic(() => import("../components/MapSection"), {
  ssr: false, // IMPORTANT
});

export default function RealTimeMonitoring() {
  const [soldiers, setSoldiers] = useState([]);
  // Track which soldier is "selected" (clicked in the sidebar)
  const [selectedSoldierId, setSelectedSoldierId] = useState(null);
  
  // Timeline state
  const [currentTime, setCurrentTime] = useState(0); // in seconds (0-7200 for 2 hours)
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1x speed

  useEffect(() => {
    // Connect to WebSocket for soldier data
    const ws = new WebSocket(WS_CONFIG.getSoldierWsUrl());

    // Handle incoming messages
    ws.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);

        // Update the soldiers array
        setSoldiers((prev) => {
          // Remove any old soldier record with the same ID
          const filtered = prev.filter((s) => s.soldier_id !== data.soldier_id);

          // Add or merge the new data
          // Optionally add a lastUpdate for "time ago"
          return [
            ...filtered,
            { ...data, lastUpdate: new Date().toISOString() },
          ];
        });
      } catch (error) {
        console.error("Error parsing soldier data:", error);
      }
    };

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  // Timeline playback effect
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        const newTime = prevTime + (playbackSpeed * 1); // increment by speed per second
        return newTime >= 7200 ? 7200 : newTime; // max 2 hours (7200 seconds)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const handleSelectSoldier = (soldierId) => {
    setSelectedSoldierId((prevId) => (prevId === soldierId ? null : soldierId));
  };

  const handleTimelineChange = (newTime) => {
    setCurrentTime(newTime);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  const handleSkip = (seconds) => {
    setCurrentTime((prevTime) => {
      const newTime = prevTime + seconds;
      return Math.max(0, Math.min(7200, newTime)); // clamp between 0 and 7200
    });
  };

  return (
    <div className={styles.simulationPage}>
      <a href="/" className={styles.endSessionButton}>
        End Session
      </a>

      <div className={styles.container}>
        {/* SIDEBAR (Left) */}
        <div className={styles.leftContainer}>
          <Sidebar
            soldiers={soldiers}
            selectedSoldierId={selectedSoldierId}
            onSelectSoldier={handleSelectSoldier}
          />
        </div>

        {/* MAP + Timeline + Bottom Section (Right) */}
        <div className={styles.rightContainer}>
          {/* MAP SECTION */}
          <div className={styles.mapContainer}>
            <MapSection
              soldiers={soldiers}
              selectedSoldierId={selectedSoldierId}
              currentTime={currentTime}
            />
          </div>

          {/* TIMELINE SECTION - Media Player Controls */}
          <div className={styles.timelineSection}>
            <Timeline
              currentTime={currentTime}
              maxTime={7200} // 2 hours in seconds
              isPlaying={isPlaying}
              playbackSpeed={playbackSpeed}
              onTimeChange={handleTimelineChange}
              onPlayPause={handlePlayPause}
              onSpeedChange={handleSpeedChange}
              onSkip={handleSkip}
            />
          </div>

          {/* BOTTOM SECTION - Kill Feed & Stats */}
          <div className={styles.bottomSection}>
            <div className={styles.killFeed}>
              <KillFeed currentTime={currentTime} />
            </div>
            <div className={styles.statsTable}>
              <StatsTable currentTime={currentTime} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}