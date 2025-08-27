import { useEffect, useState } from "react";

const RawDataFeed = () => {
  const [rawDataEntries, setRawDataEntries] = useState([]); // Raw data entries
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [totalDataReceived, setTotalDataReceived] = useState(0);

  // Helper function to format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  };

  // Helper function to parse and clean raw data
  const parseRawData = (rawData) => {
    // Split by common delimiters and clean up
    const lines = rawData.split(/[\r\n]+/).filter(line => line.trim() !== '');
    const cleanedLines = [];
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed) {
        // Check if it contains structured data (like {module,frequency,id,lat,lon})
        if (trimmed.includes('{') && trimmed.includes('}')) {
          // Extract content between braces
          const matches = trimmed.match(/\{([^}]+)\}/g);
          if (matches) {
            matches.forEach(match => {
              const content = match.slice(1, -1); // Remove braces
              cleanedLines.push(content);
            });
          }
        } else {
          cleanedLines.push(trimmed);
        }
      }
    });
    
    return cleanedLines;
  };

  useEffect(() => {
    // Connect to raw data WebSocket on port 8002
    const ws = new WebSocket('ws://localhost:8002/ws');

    ws.onopen = () => {
      console.log("🔗 Raw Data Feed WebSocket connected to port 8002");
      setConnectionStatus('Connected');
    };

    ws.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data);
        console.log("📡 Raw Data Received:", data);

        // Handle different types of messages
        if (data.type === 'connection_status') {
          console.log("📊 Connection Status:", data.message);
          return;
        }

        if (data.type === 'raw_data') {
          const parsedLines = parseRawData(data.data);
          
          // Create entries for each line of data
          parsedLines.forEach((line, index) => {
            const entry = {
              id: `${data._id}-${index}`,
              connection: data.connection,
              rawData: line,
              dataLength: line.length,
              timestamp: data.timestamp,
              displayTime: formatTime(data.timestamp)
            };

            console.log("✅ Adding raw data entry:", entry);

            setRawDataEntries((prev) => {
              const updated = [entry, ...prev];
              return updated.slice(0, 50); // Keep latest 50 entries
            });

            setTotalDataReceived(prev => prev + 1);
          });
        }
      } catch (error) {
        console.error("❌ Error parsing raw data:", error);
        console.log("📄 Raw message:", message.data);
        
        // If JSON parsing fails, treat as plain text
        const entry = {
          id: `plain-${Date.now()}`,
          connection: 'Unknown',
          rawData: message.data,
          dataLength: message.data.length,
          timestamp: new Date().toISOString(),
          displayTime: formatTime(new Date().toISOString())
        };

        setRawDataEntries((prev) => {
          const updated = [entry, ...prev];
          return updated.slice(0, 50);
        });

        setTotalDataReceived(prev => prev + 1);
      }
    };

    ws.onclose = () => {
      console.log("📤 Raw Data Feed WebSocket disconnected");
      setConnectionStatus('Disconnected');
    };

    ws.onerror = (error) => {
      console.error("❌ Raw Data Feed WebSocket error:", error);
      setConnectionStatus('Error');
    };

    return () => {
      ws.close();
    };
  }, []);

  // Helper function to determine row color based on data content
  const getRowColor = (rawData) => {
    if (rawData.includes('ESP32') || rawData.includes('LoRa')) return '#2d5a87'; // Blue for ESP32/LoRa
    if (rawData.includes('MHz')) return '#1a472a'; // Green for frequency data
    if (rawData.includes(',')) return '#4a2c2a'; // Brown for CSV-like data
    return '#333'; // Default gray
  };

  // Helper function to highlight important parts of data
  const highlightData = (rawData) => {
    let highlighted = rawData;
    
    // Highlight numbers (coordinates, IDs, frequencies)
    highlighted = highlighted.replace(/\b\d+\.?\d*\b/g, '<span style="color: #ffd700; font-weight: bold;">$&</span>');
    
    // Highlight GPS coordinates patterns
    highlighted = highlighted.replace(/([NS]|[EW])/g, '<span style="color: #00ff88;">$&</span>');
    
    // Highlight MHz
    highlighted = highlighted.replace(/(MHz)/g, '<span style="color: #ff6b6b;">$&</span>');
    
    // Highlight ESP32, LoRa
    highlighted = highlighted.replace(/(ESP32|LoRa)/g, '<span style="color: #4ecdc4;">$&</span>');
    
    return highlighted;
  };

  return (
    <div className="popup-message-wrapper" style={{ maxHeight: "400px", overflowY: "auto" }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <h2 className="killFeedTitle">Raw Data Feed (Port 8002)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ 
            color: connectionStatus === 'Connected' ? '#00ff88' : '#ff6b6b',
            fontSize: '0.8em',
            fontWeight: 'bold'
          }}>
            ● {connectionStatus}
          </span>
          <span style={{ 
            color: '#888',
            fontSize: '0.7em'
          }}>
            {totalDataReceived} entries
          </span>
        </div>
      </div>

      {rawDataEntries.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          color: '#666', 
          padding: '20px',
          fontStyle: 'italic'
        }}>
          {connectionStatus === 'Connected' ? 'Waiting for data...' : 'No connection to raw data stream'}
        </div>
      ) : (
        <div style={{ fontSize: '0.85em' }}>
          {rawDataEntries.map((entry, index) => (
            <div 
              key={entry.id} 
              className="kill-entry" 
              style={{ 
                backgroundColor: getRowColor(entry.rawData),
                margin: '2px 0',
                padding: '6px 10px',
                borderRadius: '4px',
                borderLeft: '3px solid #00ff88',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '10px'
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ 
                    margin: '0 0 3px 0',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '0.9em',
                    lineHeight: '1.2'
                  }}>
                    <span 
                      dangerouslySetInnerHTML={{ 
                        __html: highlightData(entry.rawData) 
                      }}
                    />
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    gap: '15px',
                    fontSize: '0.7em',
                    color: '#888'
                  }}>
                    <span>📡 {entry.connection}</span>
                    <span>📏 {entry.dataLength} bytes</span>
                    <span>🕒 {entry.displayTime}</span>
                  </div>
                </div>
                <span style={{ 
                  color: '#555',
                  fontSize: '0.7em',
                  minWidth: '25px',
                  textAlign: 'right'
                }}>
                  #{index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {rawDataEntries.length > 0 && (
        <div style={{ 
          textAlign: 'center', 
          color: '#888', 
          fontSize: '0.7em',
          padding: '10px 0 5px 0',
          borderTop: '1px solid #444',
          marginTop: '10px'
        }}>
          Showing latest 50 entries • Auto-scrolling enabled
        </div>
      )}
    </div>
  );
};

export default RawDataFeed;