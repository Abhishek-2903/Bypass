import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styles from "../styles/rtm.module.css";
import Sidebar from "../components/Sidebar";
import KillFeed from "../components/KillFeed";
import StatsTable from "../components/StatsTable";
import { WS_CONFIG } from "../config";

const MapSection = dynamic(() => import("../components/MapSection"), {
  ssr: false,
});

export default function RealTimeMonitoring() {
  const [soldiers, setSoldiers] = useState([]);
  const [selectedSoldierId, setSelectedSoldierId] = useState(null);
  const [comPort, setComPort] = useState("");
  const [wsPort, setWsPort] = useState("8001");
  const [savedComPort, setSavedComPort] = useState("");
  const [savedWsPort, setSavedWsPort] = useState("");
  const [sessionStatus, setSessionStatus] = useState("stopped");
  const [error, setError] = useState(null);

  // WebSocket connection
  useEffect(() => {
    let ws;
    if (sessionStatus === "running") {
      const wsUrl = `ws://localhost:${savedWsPort}/ws`;
      ws = new WebSocket(wsUrl);
      ws.onmessage = (message) => {
        try {
          const data = JSON.parse(message.data);
          setSoldiers((prev) => {
            const filtered = prev.filter((s) => s.soldier_id !== data.soldier_id);
            return [...filtered, { ...data, lastUpdate: new Date().toISOString() }];
          });
        } catch (error) {
          console.error("Error parsing soldier data:", error);
          setError("Error receiving data from WebSocket");
        }
      };
      ws.onerror = () => {
        setError("WebSocket connection failed");
      };
      ws.onclose = () => {
        if (sessionStatus === "running") {
          setError("WebSocket closed unexpectedly");
        }
      };
    }
    return () => ws && ws.close();
  }, [sessionStatus, savedWsPort]);

  // Handle ports save
  const handleSavePorts = () => {
    if (!comPort || !comPort.match(/^COM\d+$/i)) {
      setError("Please enter a valid COM port (e.g., COM3)");
      return;
    }
    const wsPortNum = parseInt(wsPort);
    if (!wsPort || isNaN(wsPortNum) || wsPortNum < 1024 || wsPortNum > 65535) {
      setError("Please enter a valid WebSocket port (1024-65535)");
      return;
    }
    setSavedComPort(comPort.toUpperCase());
    setSavedWsPort(wsPort);
    setError(null);
  };

  // Handle session toggle
  const handleToggleSession = async () => {
    if (sessionStatus === "stopped") {
      if (!savedComPort || !savedWsPort) {
        setError("Please save valid ports first");
        return;
      }
      try {
        const res = await fetch("/api/session-control", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "start", port: savedComPort, ws_port: savedWsPort }),
        });
        const data = await res.json();
        if (data.success) {
          setSessionStatus("running");
          setError(null);
        } else {
          setError(data.error || "Failed to start session");
        }
      } catch (err) {
        setError("Error starting session: " + err.message);
      }
    } else {
      try {
        const res = await fetch("/api/session-control", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "stop" }),
        });
        const data = await res.json();
        if (data.success) {
          setSessionStatus("stopped");
          setError(null);
        } else {
          setError(data.error || "Failed to stop session");
        }
      } catch (err) {
        setError("Error stopping session: " + err.message);
      }
    }
  };

  const handleSelectSoldier = (soldierId) => {
    setSelectedSoldierId((prevId) => (prevId === soldierId ? null : soldierId));
  };

  return (
    <div className={styles.simulationPage}>
      <a href="/" className={styles.endSessionButton}>
        End Session
      </a>

      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Sidebar
            soldiers={soldiers}
            selectedSoldierId={selectedSoldierId}
            onSelectSoldier={handleSelectSoldier}
          />
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.mapContainer}>
            <MapSection soldiers={soldiers} selectedSoldierId={selectedSoldierId} />
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.killFeed}>
              <KillFeed />
            </div>
            <div className={styles.statsTable}>
              <StatsTable />
            </div>
          </div>
          {/* Session Controls at Bottom-Right */}
          <div className={styles.sessionControls}>
            {sessionStatus === "stopped" && (
              <>
                <input
                  type="text"
                  placeholder="Enter COM Port (e.g., COM3)"
                  value={comPort}
                  onChange={(e) => setComPort(e.target.value.toUpperCase())}
                  className={styles.comPortInput}
                />
                <input
                  type="text"
                  placeholder="Enter WS Port (e.g., 8001)"
                  value={wsPort}
                  onChange={(e) => setWsPort(e.target.value)}
                  className={styles.comPortInput}
                />
                <button
                  onClick={handleSavePorts}
                  className={styles.comPortButton}
                >
                  Save Ports
                </button>
              </>
            )}
            <button
              onClick={handleToggleSession}
              disabled={sessionStatus === "stopped" && (!savedComPort || !savedWsPort)}
              className={styles.sessionButton}
            >
              {sessionStatus === "running" ? "Stop Simulation" : "Start Simulation"}
            </button>
            {error && <p className={styles.error}>{error}</p>}
            {savedComPort && savedWsPort && (
              <p className={styles.status}>
                
              </p>
            )}
          </div>
        </div>
      </div>
    
    
    <style jsx global>{`
        /* General Page Styling */
        .simulationPage {
          width: 100vw;
          height: 100vh;
          background-color: #0b0c10;
          color: #66fcf1;
          font-family: "Exo 2", sans-serif;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        .sidebar {
          width: 250px;
          background: #f4f4f4;
          padding: 1rem;
          height: 100vh;
          overflow-y: auto;
          border-right: 2px solid #ddd;
        }
          .simulationPage {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.container {
  display: flex;
  flex: 1;
}

.leftContainer {
  width: 250px;
  border-right: 1px solid #ccc;
}

.rightContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative; /* For absolute positioning of sessionControls */
}

.mapContainer {
  flex: 1;
  height: 60%;
}

.bottomSection {
  display: flex;
  height: 40%;
}

.killFeed {
  flex: 1;
  border-right: 1px solid #ccc;
}

.statsTable {
  flex: 1;
}

.endSessionButton {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 8px 16px;
  background-color: #ff4d4d;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.sessionControls {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comPortInput {
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
}

.comPortButton,
.sessionButton {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}

.comPortButton:disabled,
.sessionButton:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 12px;
  margin: 0;
}

.status {
  font-size: 12px;
  color: #333;
  margin: 0;
}
        .team-group h4 {
          margin-bottom: 0.5rem;
          border-bottom: 1px solid #ccc;
        }
        .soldier-item {
          padding: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
          
        .soldier-item:hover {
          background: #e6f7ff;
        }
        .dot {
          height: 10px;
          width: 10px;
          border-radius: 50%;
          margin-right: 8px;
        }
        .green {
          background-color: green;
        }
        .red {
          background-color: red;
        }
        .endSessionButton {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 999; /* keep it above other elements */
          padding: 0.7rem 1.2rem;
          background-color: #ff4444;
          color: #fff;
          font-weight: bold;
          text-decoration: none;
          border: 2px solid #ff4444;
          border-radius: 6px;
          transition: background-color 0.2s, color 0.2s, border-color 0.2s;
        }
        .loadingContainer,
        .errorContainer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: #00ffff;
        }
        .retryButton,
        .refreshButton {
          background: #00ffff;
          color: #0a0a0a;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 4px;
          font-family: "Orbitron", sans-serif;
          margin: 1rem;
        }
        .retryButton:hover,
        .refreshButton:hover {
          background: #33ffff;
        }
        .endSessionButton:hover {
          background-color: #ff6666;
          border-color: #ff6666;
          cursor: pointer;
        }
        /* Layout Containers */
        .container {
          display: flex;
          height: calc(100vh - 40px);
          padding: 20px;
          gap: 20px;
        }
        .leftContainer {
          flex: 0 0 200px;
          background-color: #1f2833;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(102, 252, 241, 0.5);
          overflow-y: auto;
          padding: 20px;
        }
        .rightContainer {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .mapContainer {
          flex: 2;
          position: relative;
          background-color: #1f2833;
          border-radius: 10px;
          overflow: hidden;
          height: calc(70vh - 60px);
        }
        .mapContainer #map {
          width: 100%;
          height: 100%;
        }
        .bottomSection {
          flex: 1;
          display: flex;
          gap: 20px;
          min-height: 200px;
          max-height: calc(30vh - 40px);
        }
        .killFeed,
        .statsTable {
          flex: 1;
          background-color: #1f2833;
          border-radius: 10px;
          padding: 15px;
          overflow-y: auto;
        }
        /* Stats Table Styling */
        .statsTableWrapper {
          background-color: #1e272e; /* Darker background */
          border: 2px solid #ffa502; /* Bright orange border */
          border-radius: 10px;
          padding: 20px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .statsTitle {
          text-align: center;
          font-size: 22px; /* Larger font size */
          font-weight: bold;
          margin: 0 0 20px;
          color: #ffa502; /* Bright orange title */
        }
        /* Table Styling */
        #statsTable {
          width: 100%;
          border-collapse: collapse; /* Removes gaps between cells */
          text-align: center;
          font-family: "Exo 2", sans-serif;
          background-color: #2f3640; /* Dark gray background for the table */
          border-radius: 8px; /* Rounded edges */
          overflow: hidden; /* Ensures the table fits inside the wrapper */
        }
        #statsTable th,
        #statsTable td {
          padding: 12px 15px; /* Adds space inside cells */
          border: 1px solid #ffa502; /* Bright orange borders for visibility */
          text-align: center;
        }
        #statsTable th {
          background-color: #ffa502; /* Bright orange header background */
          color: #1e272e; /* Dark text for contrast */
          font-weight: bold;
          position: sticky;
          top: 0;
          z-index: 1;
        }
        #statsTable td {
          background-color: #353b48; /* Darker gray for rows */
          color: #dcdde1; /* Light gray text */
        }
        /* Hover Effect for Rows */
        #statsTable tr:hover td {
          background-color: #57606f; /* Slightly brighter hover color */
          transition: background-color 0.2s ease;
        }
        /* Team Name Styling */
        .teamName {
          display: flex;
          align-items: center;
          gap: 10px; /* Spacing between team indicator and name */
        }
        .teamIndicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }
        .teamIndicator.red {
          background-color: #e84118; /* Bright red */
        }
        .teamIndicator.blue {
          background-color: #00a8ff; /* Bright blue */
        }
        /* Scrollbar Styling */
        .tableContainer::-webkit-scrollbar {
          width: 8px;
        }
        .tableContainer::-webkit-scrollbar-thumb {
          background: #ffa502;
          border-radius: 4px;
        }
        .tableContainer::-webkit-scrollbar-thumb:hover {
          background: #ffbe76;
        }
      `}</style>
    </div>
  );
} 