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

const API_BASE_URL = "http://localhost:8000";

export default function RealTimeMonitoring() {
  // Session management states
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [sessionError, setSessionError] = useState(null);
  const [isStartingSession, setIsStartingSession] = useState(false);

  // RTM states (only active when session is selected)
  const [soldiers, setSoldiers] = useState([]);
  const [selectedSoldierId, setSelectedSoldierId] = useState(null);
  
  // Timeline state
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [maxTime, setMaxTime] = useState(7200); // Default 2 hours

  // WebSocket reference
  const [ws, setWs] = useState(null);

  // Fetch all sessions on component mount
  useEffect(() => {
    fetchSessions();
  }, []);

  // WebSocket connection effect (only when session is selected)
  useEffect(() => {
    if (!selectedSession) return;

    // Connect to WebSocket for soldier data
    const websocket = new WebSocket(WS_CONFIG.getSoldierWsUrl());
    setWs(websocket);

    // Handle incoming messages
    websocket.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);

        // Update the soldiers array
        setSoldiers((prev) => {
          const filtered = prev.filter((s) => s.soldier_id !== data.soldier_id);
          return [
            ...filtered,
            { ...data, lastUpdate: new Date().toISOString() },
          ];
        });
      } catch (error) {
        console.error("Error parsing soldier data:", error);
      }
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on unmount or session change
    return () => {
      websocket.close();
    };
  }, [selectedSession]);

  // Timeline playback effect
  useEffect(() => {
    if (!isPlaying || !selectedSession) return;

    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        const newTime = prevTime + (playbackSpeed * 1);
        return newTime >= maxTime ? maxTime : newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, maxTime, selectedSession]);

  // Fetch all sessions from API
  const fetchSessions = async () => {
    try {
      setIsLoadingSessions(true);
      setSessionError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/sessions/all_sessions`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const sessionsData = await response.json();
      setSessions(sessionsData || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      setSessionError("Failed to load sessions. Please try again.");
    } finally {
      setIsLoadingSessions(false);
    }
  };

  // Select and start a session
  const handleSessionSelect = async (sessionId) => {
    try {
      setIsStartingSession(true);
      
      const response = await fetch(`${API_BASE_URL}/api/replay/select_session/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      console.log("Session started:", result);
      
      // Find and set the selected session
      const session = sessions.find(s => s.session_id === sessionId);
      setSelectedSession(session);
      
      // Reset timeline state
      setCurrentTime(0);
      setIsPlaying(false);
      setPlaybackSpeed(1);
      setSoldiers([]);
      setSelectedSoldierId(null);
      
    } catch (error) {
      console.error("Error starting session:", error);
      alert("Failed to start session. Please try again.");
    } finally {
      setIsStartingSession(false);
    }
  };

  // Handle timeline control API calls
  const handleTimelineControl = async (action, value = null) => {
    if (!selectedSession) return;

    try {
      let endpoint = '';
      let method = 'POST';
      let body = {};

      switch (action) {
        case 'play':
          endpoint = '/api/replay/play';
          break;
        case 'pause':
          endpoint = '/api/replay/pause';
          break;
        case 'seek':
          endpoint = '/api/replay/seek';
          body = { time: value };
          break;
        case 'speed':
          endpoint = '/api/replay/speed';
          body = { speed: value };
          break;
        case 'skip':
          endpoint = '/api/replay/skip';
          body = { seconds: value };
          break;
        default:
          return;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: Object.keys(body).length ? JSON.stringify(body) : undefined
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local state based on action
      switch (action) {
        case 'play':
          setIsPlaying(true);
          break;
        case 'pause':
          setIsPlaying(false);
          break;
        case 'seek':
          setCurrentTime(value);
          break;
        case 'speed':
          setPlaybackSpeed(value);
          break;
        case 'skip':
          setCurrentTime(prev => Math.max(0, Math.min(maxTime, prev + value)));
          break;
      }

    } catch (error) {
      console.error(`Error with ${action}:`, error);
    }
  };

  const handleSelectSoldier = (soldierId) => {
    setSelectedSoldierId((prevId) => (prevId === soldierId ? null : soldierId));
  };

  const handleTimelineChange = (newTime) => {
    handleTimelineControl('seek', newTime);
  };

  const handlePlayPause = () => {
    handleTimelineControl(isPlaying ? 'pause' : 'play');
  };

  const handleSpeedChange = (speed) => {
    handleTimelineControl('speed', speed);
  };

  const handleSkip = (seconds) => {
    handleTimelineControl('skip', seconds);
  };

  const handleBackToSessions = () => {
    // Close WebSocket connection
    if (ws) {
      ws.close();
      setWs(null);
    }
    
    // Reset all states
    setSelectedSession(null);
    setSoldiers([]);
    setSelectedSoldierId(null);
    setCurrentTime(0);
    setIsPlaying(false);
    setPlaybackSpeed(1);
    
    // Refresh sessions list
    fetchSessions();
  };

  // Session Selection UI
  if (!selectedSession) {
    return (
      <div className={styles.simulationPage}>
        <a href="/" className={styles.endSessionButton}>
          End Session
        </a>

        <div className={styles.sessionSelectionContainer}>
          <div className={styles.sessionSelectionWrapper}>
            <h1 className={styles.sessionTitle}>Select Training Session</h1>
            
            {isLoadingSessions ? (
              <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading sessions...</p>
              </div>
            ) : sessionError ? (
              <div className={styles.errorContainer}>
                <p className={styles.errorText}>{sessionError}</p>
                <button 
                  onClick={fetchSessions} 
                  className={styles.retryButton}
                  disabled={isLoadingSessions}
                >
                  Retry
                </button>
              </div>
            ) : sessions.length === 0 ? (
              <div className={styles.noSessionsContainer}>
                <p>No training sessions found.</p>
                <button 
                  onClick={fetchSessions} 
                  className={styles.refreshButton}
                >
                  Refresh
                </button>
              </div>
            ) : (
              <div className={styles.sessionsList}>
                {sessions.map((session) => (
                  <div 
                    key={session.session_id} 
                    className={styles.sessionCard}
                  >
                    <div className={styles.sessionInfo}>
                      <h3 className={styles.sessionId}>Session: {session.session_id}</h3>
                      <div className={styles.sessionDetails}>
                        <p><span>Start:</span> {new Date(session.start_time).toLocaleString()}</p>
                        <p><span>End:</span> {new Date(session.end_time).toLocaleString()}</p>
                        <p><span>Duration:</span> {Math.round((new Date(session.end_time) - new Date(session.start_time)) / (1000 * 60))} minutes</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSessionSelect(session.session_id)}
                      disabled={isStartingSession}
                      className={styles.selectSessionButton}
                    >
                      {isStartingSession ? 'Starting...' : 'Select Session'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main RTM Interface (shown when session is selected)
  return (
    <div className={styles.simulationPage}>
      <div className={styles.sessionHeader}>
        <button 
          onClick={handleBackToSessions} 
          className={styles.backToSessionsButton}
        >
          ← Back to Sessions
        </button>
        <h2 className={styles.currentSessionTitle}>
          Session: {selectedSession.session_id}
        </h2>
        <a href="/" className={styles.endSessionButton}>
          End Session
        </a>
      </div>

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
              maxTime={maxTime}
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