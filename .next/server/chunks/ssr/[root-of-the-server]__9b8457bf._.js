module.exports = {

"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}}),
"[project]/styles/rtm.module.css [ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "active": "rtm-module__Jq76pa__active",
  "blue": "rtm-module__Jq76pa__blue",
  "bottomSection": "rtm-module__Jq76pa__bottomSection",
  "comPortInput": "rtm-module__Jq76pa__comPortInput",
  "container": "rtm-module__Jq76pa__container",
  "dot": "rtm-module__Jq76pa__dot",
  "endSessionButton": "rtm-module__Jq76pa__endSessionButton",
  "error": "rtm-module__Jq76pa__error",
  "errorContainer": "rtm-module__Jq76pa__errorContainer",
  "green": "rtm-module__Jq76pa__green",
  "inactive": "rtm-module__Jq76pa__inactive",
  "killFeed": "rtm-module__Jq76pa__killFeed",
  "leftContainer": "rtm-module__Jq76pa__leftContainer",
  "loadingContainer": "rtm-module__Jq76pa__loadingContainer",
  "map": "rtm-module__Jq76pa__map",
  "mapContainer": "rtm-module__Jq76pa__mapContainer",
  "pulse": "rtm-module__Jq76pa__pulse",
  "red": "rtm-module__Jq76pa__red",
  "refreshButton": "rtm-module__Jq76pa__refreshButton",
  "retryButton": "rtm-module__Jq76pa__retryButton",
  "rightContainer": "rtm-module__Jq76pa__rightContainer",
  "sessionButton": "rtm-module__Jq76pa__sessionButton",
  "sessionControls": "rtm-module__Jq76pa__sessionControls",
  "sessionStatus": "rtm-module__Jq76pa__sessionStatus",
  "sidebar": "rtm-module__Jq76pa__sidebar",
  "simulationPage": "rtm-module__Jq76pa__simulationPage",
  "soldier-item": "rtm-module__Jq76pa__soldier-item",
  "spin": "rtm-module__Jq76pa__spin",
  "spinner": "rtm-module__Jq76pa__spinner",
  "startButton": "rtm-module__Jq76pa__startButton",
  "statsTable": "rtm-module__Jq76pa__statsTable",
  "statsTableWrapper": "rtm-module__Jq76pa__statsTableWrapper",
  "statsTitle": "rtm-module__Jq76pa__statsTitle",
  "statusIndicator": "rtm-module__Jq76pa__statusIndicator",
  "stopButton": "rtm-module__Jq76pa__stopButton",
  "tableContainer": "rtm-module__Jq76pa__tableContainer",
  "team-group": "rtm-module__Jq76pa__team-group",
  "teamIndicator": "rtm-module__Jq76pa__teamIndicator",
  "teamName": "rtm-module__Jq76pa__teamName",
});
}}),
"[project]/components/Sidebar.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Sidebar)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
function Sidebar({ soldiers, selectedSoldierId, onSelectSoldier }) {
    const [expandedTeams, setExpandedTeams] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        team_red: true,
        team_blue: true // Default expanded
    });
    // Use stable sorting to prevent flickering
    const groupedAndSorted = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const groupMap = {};
        // Group soldiers by team
        soldiers.forEach((s)=>{
            const teamName = s.team || "team_red"; // fallback if missing
            if (!groupMap[teamName]) groupMap[teamName] = [];
            groupMap[teamName].push(s);
        });
        // Sort each team's soldiers ONCE and keep stable order
        Object.keys(groupMap).forEach((teamName)=>{
            groupMap[teamName].sort((a, b)=>{
                const idA = parseInt(a.soldier_id) || 0;
                const idB = parseInt(b.soldier_id) || 0;
                return idA - idB;
            });
        });
        return groupMap;
    }, [
        soldiers.length
    ]); // Only re-sort when soldier count changes, not on every update
    // Update soldier data without re-sorting
    const updatedGrouped = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        const updated = {};
        Object.keys(groupedAndSorted).forEach((teamName)=>{
            updated[teamName] = groupedAndSorted[teamName].map((soldier)=>{
                // Find the latest data for this soldier
                const latestData = soldiers.find((s)=>s.soldier_id === soldier.soldier_id);
                return latestData || soldier;
            });
        });
        return updated;
    }, [
        soldiers,
        groupedAndSorted
    ]);
    // Toggle expand/collapse for a team
    const toggleTeam = (teamName)=>{
        setExpandedTeams((prev)=>({
                ...prev,
                [teamName]: !prev[teamName]
            }));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                style: styles.header,
                children: "TEAM "
            }, void 0, false, {
                fileName: "[project]/components/Sidebar.js",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            Object.keys(updatedGrouped).map((teamName)=>{
                const isExpanded = expandedTeams[teamName] !== false; // Default to expanded
                const teamSoldiers = updatedGrouped[teamName];
                // Team color styling
                const teamColor = teamName === 'team_red' ? '#ff4444' : '#4488ff';
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: styles.teamSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                ...styles.teamHeader,
                                borderLeft: `4px solid ${teamColor}`
                            },
                            onClick: ()=>toggleTeam(teamName),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: teamColor
                                    },
                                    children: teamName.replace('team_', '').toUpperCase()
                                }, void 0, false, {
                                    fileName: "[project]/components/Sidebar.js",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: styles.teamCount,
                                    children: [
                                        isExpanded ? "▼" : "▶",
                                        " ",
                                        teamSoldiers.length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Sidebar.js",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Sidebar.js",
                            lineNumber: 78,
                            columnNumber: 13
                        }, this),
                        isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: styles.soldierList,
                            children: teamSoldiers.map((soldier)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(SoldierRow, {
                                    soldier: soldier,
                                    teamColor: teamColor,
                                    isSelected: soldier.soldier_id === selectedSoldierId,
                                    onSelectSoldier: onSelectSoldier
                                }, soldier.soldier_id, false, {
                                    fileName: "[project]/components/Sidebar.js",
                                    lineNumber: 97,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/Sidebar.js",
                            lineNumber: 95,
                            columnNumber: 15
                        }, this)
                    ]
                }, teamName, true, {
                    fileName: "[project]/components/Sidebar.js",
                    lineNumber: 77,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/components/Sidebar.js",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
// Memoized soldier row to prevent unnecessary re-renders
const SoldierRow = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["default"].memo(({ soldier, teamColor, isSelected, onSelectSoldier })=>{
    const { soldier_id, hit_status, frequency } = soldier;
    const statusColor = hit_status ? "#ff3333" : "#33ff33";
    const statusText = hit_status ? "KIll" : "ACTIVE";
    const handleClick = ()=>{
        onSelectSoldier(soldier_id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            ...styles.soldierRow,
            backgroundColor: isSelected ? "#333" : "transparent",
            borderColor: isSelected ? teamColor : "transparent",
            borderLeft: `3px solid ${teamColor}`
        },
        onClick: handleClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: styles.soldierLeft,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            color: statusColor,
                            marginRight: "0.5rem",
                            fontSize: '1.2rem'
                        },
                        children: "●"
                    }, void 0, false, {
                        fileName: "[project]/components/Sidebar.js",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: styles.soldierInfo,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: styles.soldierId,
                                children: soldier_id
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.js",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: styles.frequency,
                                children: frequency || `Soldier ${soldier_id}`
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.js",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Sidebar.js",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Sidebar.js",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: styles.soldierRight,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    style: {
                        color: statusColor,
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        padding: '2px 6px',
                        backgroundColor: hit_status ? '#ff333320' : '#33ff3320',
                        borderRadius: '3px'
                    },
                    children: statusText
                }, void 0, false, {
                    fileName: "[project]/components/Sidebar.js",
                    lineNumber: 142,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Sidebar.js",
                lineNumber: 141,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Sidebar.js",
        lineNumber: 125,
        columnNumber: 5
    }, this);
});
const styles = {
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0a",
        color: "#fff",
        padding: "1rem",
        fontFamily: "'Orbitron', sans-serif",
        border: "3px double #00ffff",
        borderRadius: "8px",
        boxSizing: "border-box",
        overflowY: "auto"
    },
    header: {
        textAlign: "center",
        margin: 0,
        marginBottom: "1.5rem",
        fontSize: "1.4rem",
        letterSpacing: "2px",
        color: "#00ffff",
        textShadow: "0 0 10px #00ffff"
    },
    teamSection: {
        marginBottom: "1rem",
        border: "1px solid #333",
        borderRadius: "6px",
        overflow: "hidden",
        backgroundColor: "#111"
    },
    teamHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        padding: "0.8rem 1rem",
        backgroundColor: "#1a1a1a",
        borderBottom: "1px solid #333",
        transition: "background-color 0.2s ease",
        fontWeight: "bold",
        fontSize: "1.1rem"
    },
    teamCount: {
        color: "#aaa",
        fontSize: "0.9rem"
    },
    soldierList: {
        padding: "0.5rem 0"
    },
    soldierRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        padding: "0.6rem 1rem",
        margin: "0.1rem 0",
        border: "1px solid transparent",
        borderRadius: "4px",
        transition: "all 0.2s ease",
        backgroundColor: "#0f0f0f"
    },
    soldierLeft: {
        display: "flex",
        alignItems: "center",
        flex: 1
    },
    soldierInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    soldierId: {
        fontSize: "1rem",
        fontWeight: "bold",
        marginBottom: "0.1rem"
    },
    callSign: {
        fontSize: "0.75rem",
        color: "#bbb",
        textTransform: "uppercase",
        letterSpacing: "0.5px"
    },
    soldierRight: {
        fontSize: "0.9rem"
    }
}; // Component is already exported as default at the top
}}),
"[project]/components/KillFeed.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const RawDataFeed = ()=>{
    const [rawDataEntries, setRawDataEntries] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]); // Raw data entries
    const [connectionStatus, setConnectionStatus] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('Disconnected');
    const [totalDataReceived, setTotalDataReceived] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    // Helper function to format timestamp
    const formatTime = (timestamp)=>{
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
    const parseRawData = (rawData)=>{
        // Split by common delimiters and clean up
        const lines = rawData.split(/[\r\n]+/).filter((line)=>line.trim() !== '');
        const cleanedLines = [];
        lines.forEach((line)=>{
            const trimmed = line.trim();
            if (trimmed) {
                // Check if it contains structured data (like {module,frequency,id,lat,lon})
                if (trimmed.includes('{') && trimmed.includes('}')) {
                    // Extract content between braces
                    const matches = trimmed.match(/\{([^}]+)\}/g);
                    if (matches) {
                        matches.forEach((match)=>{
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
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Connect to raw data WebSocket on port 8002
        const ws = new WebSocket('ws://localhost:8002/ws');
        ws.onopen = ()=>{
            console.log("🔗 Raw Data Feed WebSocket connected to port 8002");
            setConnectionStatus('Connected');
        };
        ws.onmessage = (message)=>{
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
                    parsedLines.forEach((line, index)=>{
                        const entry = {
                            id: `${data._id}-${index}`,
                            connection: data.connection,
                            rawData: line,
                            dataLength: line.length,
                            timestamp: data.timestamp,
                            displayTime: formatTime(data.timestamp)
                        };
                        console.log("✅ Adding raw data entry:", entry);
                        setRawDataEntries((prev)=>{
                            const updated = [
                                entry,
                                ...prev
                            ];
                            return updated.slice(0, 50); // Keep latest 50 entries
                        });
                        setTotalDataReceived((prev)=>prev + 1);
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
                setRawDataEntries((prev)=>{
                    const updated = [
                        entry,
                        ...prev
                    ];
                    return updated.slice(0, 50);
                });
                setTotalDataReceived((prev)=>prev + 1);
            }
        };
        ws.onclose = ()=>{
            console.log("📤 Raw Data Feed WebSocket disconnected");
            setConnectionStatus('Disconnected');
        };
        ws.onerror = (error)=>{
            console.error("❌ Raw Data Feed WebSocket error:", error);
            setConnectionStatus('Error');
        };
        return ()=>{
            ws.close();
        };
    }, []);
    // Helper function to determine row color based on data content
    const getRowColor = (rawData)=>{
        if (rawData.includes('ESP32') || rawData.includes('LoRa')) return '#2d5a87'; // Blue for ESP32/LoRa
        if (rawData.includes('MHz')) return '#1a472a'; // Green for frequency data
        if (rawData.includes(',')) return '#4a2c2a'; // Brown for CSV-like data
        return '#333'; // Default gray
    };
    // Helper function to highlight important parts of data
    const highlightData = (rawData)=>{
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "popup-message-wrapper",
        style: {
            maxHeight: "400px",
            overflowY: "auto"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "killFeedTitle",
                        children: "Raw Data Feed (Port 8002)"
                    }, void 0, false, {
                        fileName: "[project]/components/KillFeed.js",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    color: connectionStatus === 'Connected' ? '#00ff88' : '#ff6b6b',
                                    fontSize: '0.8em',
                                    fontWeight: 'bold'
                                },
                                children: [
                                    "● ",
                                    connectionStatus
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/KillFeed.js",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                style: {
                                    color: '#888',
                                    fontSize: '0.7em'
                                },
                                children: [
                                    totalDataReceived,
                                    " entries"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/KillFeed.js",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/KillFeed.js",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/KillFeed.js",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            rawDataEntries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    color: '#666',
                    padding: '20px',
                    fontStyle: 'italic'
                },
                children: connectionStatus === 'Connected' ? 'Waiting for data...' : 'No connection to raw data stream'
            }, void 0, false, {
                fileName: "[project]/components/KillFeed.js",
                lineNumber: 184,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: '0.85em'
                },
                children: rawDataEntries.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "kill-entry",
                        style: {
                            backgroundColor: getRowColor(entry.rawData),
                            margin: '2px 0',
                            padding: '6px 10px',
                            borderRadius: '4px',
                            borderLeft: '3px solid #00ff88',
                            transition: 'all 0.3s ease'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                gap: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '0 0 3px 0',
                                                fontFamily: 'Courier New, monospace',
                                                fontSize: '0.9em',
                                                lineHeight: '1.2'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                dangerouslySetInnerHTML: {
                                                    __html: highlightData(entry.rawData)
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/KillFeed.js",
                                                lineNumber: 220,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/KillFeed.js",
                                            lineNumber: 214,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: '15px',
                                                fontSize: '0.7em',
                                                color: '#888'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "📡 ",
                                                        entry.connection
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/KillFeed.js",
                                                    lineNumber: 232,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "📏 ",
                                                        entry.dataLength,
                                                        " bytes"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/KillFeed.js",
                                                    lineNumber: 233,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "🕒 ",
                                                        entry.displayTime
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/KillFeed.js",
                                                    lineNumber: 234,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/KillFeed.js",
                                            lineNumber: 226,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/KillFeed.js",
                                    lineNumber: 213,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: '#555',
                                        fontSize: '0.7em',
                                        minWidth: '25px',
                                        textAlign: 'right'
                                    },
                                    children: [
                                        "#",
                                        index + 1
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/KillFeed.js",
                                    lineNumber: 237,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/KillFeed.js",
                            lineNumber: 207,
                            columnNumber: 15
                        }, this)
                    }, entry.id, false, {
                        fileName: "[project]/components/KillFeed.js",
                        lineNumber: 195,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/KillFeed.js",
                lineNumber: 193,
                columnNumber: 9
            }, this),
            rawDataEntries.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center',
                    color: '#888',
                    fontSize: '0.7em',
                    padding: '10px 0 5px 0',
                    borderTop: '1px solid #444',
                    marginTop: '10px'
                },
                children: "Showing latest 50 entries • Auto-scrolling enabled"
            }, void 0, false, {
                fileName: "[project]/components/KillFeed.js",
                lineNumber: 252,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/KillFeed.js",
        lineNumber: 158,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = RawDataFeed;
}}),
"[project]/config.js [ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const WS_CONFIG = {
    BASE_URL: 'ws://localhost',
    HTTP_BASE_URL: 'http://localhost',
    RTM_PORTS: {
        SOLDIER_DATA: 8001,
        KILL_FEED: 8002,
        STATS: 8003
    },
    AAR_PORTS: {
        SOLDIER_DATA: 8765,
        KILL_FEED: 8766,
        STATS: 8767
    },
    API_PORTS: {
        REPLAY_INIT: 8000
    },
    PORTS: {
        SOLDIER_DATA: 8001,
        KILL_FEED: 8002,
        STATS: 8003
    }
};
WS_CONFIG.getSoldierWsUrl = ()=>`${WS_CONFIG.BASE_URL}:${WS_CONFIG.RTM_PORTS.SOLDIER_DATA}/ws`;
WS_CONFIG.getKillFeedWsUrl = ()=>`${WS_CONFIG.BASE_URL}:${WS_CONFIG.RTM_PORTS.KILL_FEED}/ws`;
WS_CONFIG.getStatsWsUrl = ()=>`${WS_CONFIG.BASE_URL}:${WS_CONFIG.RTM_PORTS.STATS}/ws`;
WS_CONFIG.getAARSoldierWsUrl = ()=>`${WS_CONFIG.BASE_URL}:${WS_CONFIG.AAR_PORTS.SOLDIER_DATA}/ws`;
WS_CONFIG.getAARKillFeedWsUrl = ()=>`${WS_CONFIG.BASE_URL}:${WS_CONFIG.AAR_PORTS.KILL_FEED}/ws`;
WS_CONFIG.getAARStatsWsUrl = ()=>`${WS_CONFIG.BASE_URL}:${WS_CONFIG.AAR_PORTS.STATS}/ws`;
WS_CONFIG.getReplayInitUrl = ()=>`${WS_CONFIG.HTTP_BASE_URL}:${WS_CONFIG.API_PORTS.REPLAY_INIT}/initialize-replay`;
WS_CONFIG.getAllWebSocketUrls = ()=>[
        WS_CONFIG.getSoldierWsUrl(),
        WS_CONFIG.getKillFeedWsUrl(),
        WS_CONFIG.getStatsWsUrl(),
        WS_CONFIG.getAARSoldierWsUrl(),
        WS_CONFIG.getAARKillFeedWsUrl(),
        WS_CONFIG.getAARStatsWsUrl()
    ];
WS_CONFIG.getAllHttpApiUrls = ()=>[
        WS_CONFIG.getReplayInitUrl()
    ];
module.exports = {
    WS_CONFIG
};
// debug logs (optional)
console.log('Real-Time Monitoring WebSocket URLs:', {
    soldier: WS_CONFIG.getSoldierWsUrl(),
    killFeed: WS_CONFIG.getKillFeedWsUrl(),
    stats: WS_CONFIG.getStatsWsUrl()
});
console.log('After Action Review WebSocket URLs:', {
    soldier: WS_CONFIG.getAARSoldierWsUrl(),
    killFeed: WS_CONFIG.getAARKillFeedWsUrl(),
    stats: WS_CONFIG.getAARStatsWsUrl()
});
console.log('HTTP API URLs:', {
    replayInit: WS_CONFIG.getReplayInitUrl()
});
console.log('All WebSocket URLs for CSP:', WS_CONFIG.getAllWebSocketUrls());
}}),
"[project]/components/StatsTable.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config.js [ssr] (ecmascript)");
;
;
;
;
const StatsTable = ()=>{
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        team_red: {},
        team_blue: {}
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const ws = new WebSocket(__TURBOPACK__imported__module__$5b$project$5d2f$config$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["WS_CONFIG"].getStatsWsUrl());
        ws.onopen = ()=>{
            console.log("🔗 Stats WebSocket connected");
        };
        ws.onclose = ()=>{
            console.log("📤 Stats WebSocket disconnected");
        };
        ws.onerror = (error)=>{
            console.error("❌ Stats WebSocket error:", error);
        };
        ws.onmessage = (message)=>{
            try {
                const data = JSON.parse(message.data);
                // Log received data for debugging
                console.log("📊 Stats Data Received:", data);
                // Only update stats if the message has team_red and team_blue
                if (data.team_red && data.team_blue) {
                    setStats(data);
                    // Log the actual values being set
                    console.log("✅ Stats Updated:");
                    console.log(`   🔴 Red Team  - Kills: ${data.team_red.total_killed || 0}, Bullets: ${data.team_red.bullets_fired || 0}`);
                    console.log(`   🔵 Blue Team - Kills: ${data.team_blue.total_killed || 0}, Bullets: ${data.team_blue.bullets_fired || 0}`);
                } else {
                    console.log("⚠️ Received non-stats message:", data);
                }
            } catch (error) {
                console.error("❌ Error parsing stats data:", error);
            }
        };
        return ()=>ws.close();
    }, []);
    // Helper function to safely get stat values
    const getStat = (team, stat)=>{
        return stats[team]?.[stat] || 0;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        id: "statsCard",
        className: "jsx-820129cbff4814f0" + " " + "summary-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: "jsx-820129cbff4814f0",
                children: "Statistical Summary"
            }, void 0, false, {
                fileName: "[project]/components/StatsTable.js",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-820129cbff4814f0" + " " + "stats-table-wrapper",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("table", {
                    id: "statsTable",
                    className: "jsx-820129cbff4814f0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("thead", {
                            className: "jsx-820129cbff4814f0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                className: "jsx-820129cbff4814f0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        className: "jsx-820129cbff4814f0",
                                        children: "Team"
                                    }, void 0, false, {
                                        fileName: "[project]/components/StatsTable.js",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        className: "jsx-820129cbff4814f0",
                                        children: "Killed"
                                    }, void 0, false, {
                                        fileName: "[project]/components/StatsTable.js",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("th", {
                                        className: "jsx-820129cbff4814f0",
                                        children: "Fired"
                                    }, void 0, false, {
                                        fileName: "[project]/components/StatsTable.js",
                                        lineNumber: 65,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/StatsTable.js",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/StatsTable.js",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tbody", {
                            className: "jsx-820129cbff4814f0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                    className: "jsx-820129cbff4814f0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            className: "jsx-820129cbff4814f0",
                                            children: "Red Team"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StatsTable.js",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            style: {
                                                fontWeight: 'bold',
                                                color: getStat('team_red', 'total_killed') > 0 ? '#ff6666' : 'inherit'
                                            },
                                            className: "jsx-820129cbff4814f0",
                                            children: getStat('team_red', 'total_killed')
                                        }, void 0, false, {
                                            fileName: "[project]/components/StatsTable.js",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            style: {
                                                fontWeight: 'bold',
                                                color: getStat('team_red', 'bullets_fired') > 0 ? '#66ff66' : 'inherit'
                                            },
                                            className: "jsx-820129cbff4814f0",
                                            children: getStat('team_red', 'bullets_fired')
                                        }, void 0, false, {
                                            fileName: "[project]/components/StatsTable.js",
                                            lineNumber: 77,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/StatsTable.js",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("tr", {
                                    className: "jsx-820129cbff4814f0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            className: "jsx-820129cbff4814f0",
                                            children: "Blue Team"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StatsTable.js",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            style: {
                                                fontWeight: 'bold',
                                                color: getStat('team_blue', 'total_killed') > 0 ? '#ff6666' : 'inherit'
                                            },
                                            className: "jsx-820129cbff4814f0",
                                            children: getStat('team_blue', 'total_killed')
                                        }, void 0, false, {
                                            fileName: "[project]/components/StatsTable.js",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("td", {
                                            style: {
                                                fontWeight: 'bold',
                                                color: getStat('team_blue', 'bullets_fired') > 0 ? '#66ff66' : 'inherit'
                                            },
                                            className: "jsx-820129cbff4814f0",
                                            children: getStat('team_blue', 'bullets_fired')
                                        }, void 0, false, {
                                            fileName: "[project]/components/StatsTable.js",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/StatsTable.js",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/StatsTable.js",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/StatsTable.js",
                    lineNumber: 60,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/StatsTable.js",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "820129cbff4814f0",
                children: 'body{color:#66fcf1;background-color:#0b0c10;min-height:100vh;margin:0;padding:0;font-family:"Exo 2",sans-serif;overflow:hidden}.end-session-button{color:#fff;cursor:pointer;z-index:1000;background-color:#45a29e;border:none;border-radius:5px;padding:10px 20px;font-family:"Exo 2",sans-serif;font-size:1em;text-decoration:none;transition:background-color .3s;position:absolute;top:20px;right:20px}.end-session-button:hover{color:#0b0c10;background-color:#66fcf1}#simulationPage{box-sizing:border-box;background-color:#0b0c10;width:100vw;height:100vh;padding:20px;overflow:hidden}.container{flex-wrap:nowrap;gap:20px;height:calc(100vh - 40px);display:flex}.left-container{background-color:#1f2833;border-radius:10px;flex-direction:column;flex:0 0 200px;max-height:calc(100vh - 40px);display:flex;overflow:hidden;box-shadow:0 0 10px #66fcf180}.team-content-wrapper{flex:1;padding:20px;overflow-y:auto}.right-container{flex-direction:column;flex:1;gap:20px;min-width:0;height:100%;display:flex}.map-container{background-color:#1f2833;border-radius:10px;flex-direction:column;flex:2;justify-content:center;align-items:center;width:100%;min-height:400px;display:flex;position:relative;overflow:hidden}.map-container img{object-fit:cover;width:100%;height:100%;position:absolute;top:0;left:0}.fullscreen-button{color:#fff;cursor:pointer;z-index:1;background-color:#45a29eb3;border:none;border-radius:5px;max-width:100px;padding:5px 10px;transition:background-color .3s;position:absolute;top:5px;left:10px}.team-label{z-index:1;cursor:pointer;color:#0b0c10;background-color:#45a29e;border-radius:5px;justify-content:space-between;margin-bottom:10px;padding:10px;font-size:1.2em;display:flex;position:sticky;top:0}.soldier-item{color:#66fcf1;text-align:left;background-color:#0b0c10;border-radius:3px;margin-bottom:5px;padding:5px 10px;font-size:1em;display:none}.soldier-circle{z-index:2;border:2px solid #000;border-radius:50%;justify-content:center;align-items:center;width:30px;height:30px;display:flex;position:absolute;overflow:hidden}.soldier-line{transform-origin:bottom;background-color:#fff;width:2px;height:20px;position:absolute;top:0}.soldier-item.visible{display:block}.summary-container{flex-wrap:wrap;justify-content:space-between;gap:20px;display:flex}.summary-card{text-align:center;background-color:#1f2833;border-radius:10px;flex:1;max-height:300px;padding:10px;font-size:1em;overflow:hidden;box-shadow:0 0 10px #66fcf180}#popupCard{text-align:center;background-color:#1f2833;border-radius:10px;flex:300px;width:100%;max-width:30%;max-height:300px;padding:10px;font-size:1em;overflow:hidden;box-shadow:0 0 10px #66fcf180}.popup-message-wrapper{word-wrap:break-word;max-height:250px;padding:10px;overflow-y:auto}#popupMessage{color:#66fcf1;text-align:left;background-color:#1b1b1b;border-radius:5px;width:100%;max-width:100%;margin:5px 0;padding:10px;font-size:1em}.stats-table-wrapper{max-height:120px;overflow-y:auto}#statsTable{border-collapse:collapse;width:100%}#statsTable th,#statsTable td{text-align:left;border:1px solid #66fcf1;padding:10px}#statsTable th{color:#0b0c10;background-color:#45a29e}#statsTable td{background-color:#1b1b1b}.team-red-charlie,.team-red-delta{background-color:red}.team-blue-alpha,.team-blue-delta{background-color:#00f}.team-content-wrapper::-webkit-scrollbar{width:8px}.team-content-wrapper::-webkit-scrollbar-track{background:#1f2833;border-radius:4px}.team-content-wrapper::-webkit-scrollbar-thumb{background:#45a29e;border-radius:4px}.team-content-wrapper::-webkit-scrollbar-thumb:hover{background:#66fcf1}.image-control-buttons{z-index:10;gap:10px;display:flex;position:absolute;top:10px;right:10px}.image-control-button{color:#fff;cursor:pointer;background-color:#45a29eb3;border:none;border-radius:5px;padding:5px 10px;transition:background-color .3s}.image-control-button:hover{color:#0b0c10;background-color:#66fcf1}.map-container.fullscreen{z-index:1000;background-color:#0b0c10;width:100vw;height:100vh;position:fixed;top:0;left:0}.map-container.fullscreen img{object-fit:contain;width:100%;height:100%}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/StatsTable.js",
        lineNumber: 57,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = StatsTable;
}}),
"[project]/pages/index.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>RealTimeMonitoring)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/styles/rtm.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Sidebar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Sidebar.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$KillFeed$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/KillFeed.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatsTable$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/StatsTable.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config.js [ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const MapSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/components/MapSection.js [ssr] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i), {
    loadableGenerated: {
        modules: [
            "[project]/components/MapSection.js [client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
function RealTimeMonitoring() {
    const [soldiers, setSoldiers] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [selectedSoldierId, setSelectedSoldierId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [comPort, setComPort] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [wsPort, setWsPort] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("8001");
    const [savedComPort, setSavedComPort] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [savedWsPort, setSavedWsPort] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [sessionStatus, setSessionStatus] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("stopped");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // WebSocket connection
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        let ws;
        if (sessionStatus === "running") {
            const wsUrl = `ws://localhost:${savedWsPort}/ws`;
            ws = new WebSocket(wsUrl);
            ws.onmessage = (message)=>{
                try {
                    const data = JSON.parse(message.data);
                    setSoldiers((prev)=>{
                        const filtered = prev.filter((s)=>s.soldier_id !== data.soldier_id);
                        return [
                            ...filtered,
                            {
                                ...data,
                                lastUpdate: new Date().toISOString()
                            }
                        ];
                    });
                } catch (error) {
                    console.error("Error parsing soldier data:", error);
                    setError("Error receiving data from WebSocket");
                }
            };
            ws.onerror = ()=>{
                setError("WebSocket connection failed");
            };
            ws.onclose = ()=>{
                if (sessionStatus === "running") {
                    setError("WebSocket closed unexpectedly");
                }
            };
        }
        return ()=>ws && ws.close();
    }, [
        sessionStatus,
        savedWsPort
    ]);
    // Handle ports save
    const handleSavePorts = ()=>{
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
    const handleToggleSession = async ()=>{
        if (sessionStatus === "stopped") {
            if (!savedComPort || !savedWsPort) {
                setError("Please save valid ports first");
                return;
            }
            try {
                const res = await fetch("/api/session-control", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        action: "start",
                        port: savedComPort,
                        ws_port: savedWsPort
                    })
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
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        action: "stop"
                    })
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
    const handleSelectSoldier = (soldierId)=>{
        setSelectedSoldierId((prevId)=>prevId === soldierId ? null : soldierId);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].simulationPage || ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                href: "/",
                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].endSessionButton || ""),
                children: "End Session"
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].container || ""),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].leftContainer || ""),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Sidebar$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            soldiers: soldiers,
                            selectedSoldierId: selectedSoldierId,
                            onSelectSoldier: handleSelectSoldier
                        }, void 0, false, {
                            fileName: "[project]/pages/index.js",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightContainer || ""),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].mapContainer || ""),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MapSection, {
                                    soldiers: soldiers,
                                    selectedSoldierId: selectedSoldierId
                                }, void 0, false, {
                                    fileName: "[project]/pages/index.js",
                                    lineNumber: 132,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].bottomSection || ""),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].killFeed || ""),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$KillFeed$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 136,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statsTable || ""),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatsTable$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 139,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sessionControls || ""),
                                children: [
                                    sessionStatus === "stopped" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Enter COM Port (e.g., COM3)",
                                                value: comPort,
                                                onChange: (e)=>setComPort(e.target.value.toUpperCase()),
                                                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].comPortInput || "")
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 146,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Enter WS Port (e.g., 8001)",
                                                value: wsPort,
                                                onChange: (e)=>setWsPort(e.target.value),
                                                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].comPortInput || "")
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 153,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: handleSavePorts,
                                                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].comPortButton || ""),
                                                children: "Save Ports"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 160,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: handleToggleSession,
                                        disabled: sessionStatus === "stopped" && (!savedComPort || !savedWsPort),
                                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sessionButton || ""),
                                        children: sessionStatus === "running" ? "Stop Simulation" : "Start Simulation"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this),
                                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].error || ""),
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 175,
                                        columnNumber: 23
                                    }, this),
                                    savedComPort && savedWsPort && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].status || "")
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/index.js",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/index.js",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/index.js",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "9de421a33172ef0",
                children: '.simulationPage{color:#66fcf1;background-color:#0b0c10;width:100vw;height:100vh;margin:0;padding:0;font-family:"Exo 2",sans-serif;overflow:hidden}.sidebar{background:#f4f4f4;border-right:2px solid #ddd;width:250px;height:100vh;padding:1rem;overflow-y:auto}.simulationPage{flex-direction:column;height:100vh;display:flex}.container{flex:1;display:flex}.leftContainer{border-right:1px solid #ccc;width:250px}.rightContainer{flex-direction:column;flex:1;display:flex;position:relative}.mapContainer{flex:1;height:60%}.bottomSection{height:40%;display:flex}.killFeed{border-right:1px solid #ccc;flex:1}.statsTable{flex:1}.endSessionButton{color:#fff;background-color:#ff4d4d;border-radius:4px;padding:8px 16px;text-decoration:none;position:absolute;bottom:10px;right:10px}.sessionControls{background-color:#ffffffe6;border-radius:4px;flex-direction:column;align-items:flex-end;gap:8px;padding:10px;display:flex;position:absolute;bottom:10px;right:10px;box-shadow:0 2px 4px #0000001a}.comPortInput{border:1px solid #ccc;border-radius:4px;width:150px;padding:6px}.comPortButton,.sessionButton{cursor:pointer;color:#fff;background-color:#007bff;border:none;border-radius:4px;padding:6px 12px}.comPortButton:disabled,.sessionButton:disabled{cursor:not-allowed;background-color:#ccc}.error{color:red;margin:0;font-size:12px}.status{color:#333;margin:0;font-size:12px}.team-group h4{border-bottom:1px solid #ccc;margin-bottom:.5rem}.soldier-item{cursor:pointer;align-items:center;padding:5px;display:flex}.soldier-item:hover{background:#e6f7ff}.dot{border-radius:50%;width:10px;height:10px;margin-right:8px}.green{background-color:green}.red{background-color:red}.endSessionButton{z-index:999;color:#fff;background-color:#f44;border:2px solid #f44;border-radius:6px;padding:.7rem 1.2rem;font-weight:700;text-decoration:none;transition:background-color .2s,color .2s,border-color .2s;position:absolute;top:1rem;right:1rem}.loadingContainer,.errorContainer{color:#0ff;flex-direction:column;justify-content:center;align-items:center;height:100vh;display:flex}.retryButton,.refreshButton{color:#0a0a0a;cursor:pointer;background:#0ff;border:none;border-radius:4px;margin:1rem;padding:.5rem 1rem;font-family:Orbitron,sans-serif}.retryButton:hover,.refreshButton:hover{background:#3ff}.endSessionButton:hover{cursor:pointer;background-color:#f66;border-color:#f66}.container{gap:20px;height:calc(100vh - 40px);padding:20px;display:flex}.leftContainer{background-color:#1f2833;border-radius:10px;flex:0 0 200px;padding:20px;overflow-y:auto;box-shadow:0 0 10px #66fcf180}.rightContainer{flex-direction:column;flex:1;gap:20px;display:flex}.mapContainer{background-color:#1f2833;border-radius:10px;flex:2;height:calc(70vh - 60px);position:relative;overflow:hidden}.mapContainer #map{width:100%;height:100%}.bottomSection{flex:1;gap:20px;min-height:200px;max-height:calc(30vh - 40px);display:flex}.killFeed,.statsTable{background-color:#1f2833;border-radius:10px;flex:1;padding:15px;overflow-y:auto}.statsTableWrapper{background-color:#1e272e;border:2px solid #ffa502;border-radius:10px;flex-direction:column;height:100%;padding:20px;display:flex}.statsTitle{text-align:center;color:#ffa502;margin:0 0 20px;font-size:22px;font-weight:700}#statsTable{border-collapse:collapse;text-align:center;background-color:#2f3640;border-radius:8px;width:100%;font-family:"Exo 2",sans-serif;overflow:hidden}#statsTable th,#statsTable td{text-align:center;border:1px solid #ffa502;padding:12px 15px}#statsTable th{color:#1e272e;z-index:1;background-color:#ffa502;font-weight:700;position:sticky;top:0}#statsTable td{color:#dcdde1;background-color:#353b48}#statsTable tr:hover td{background-color:#57606f;transition:background-color .2s}.teamName{align-items:center;gap:10px;display:flex}.teamIndicator{border-radius:50%;width:12px;height:12px;display:inline-block}.teamIndicator.red{background-color:#e84118}.teamIndicator.blue{background-color:#00a8ff}.tableContainer::-webkit-scrollbar{width:8px}.tableContainer::-webkit-scrollbar-thumb{background:#ffa502;border-radius:4px}.tableContainer::-webkit-scrollbar-thumb:hover{background:#ffbe76}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/index.js",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
}}),
"[project]/node_modules/next/dist/esm/server/route-modules/pages/module.compiled.js [ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time truthy", 1) {
        if ("TURBOPACK compile-time truthy", 1) {
            module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/pages-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-turbo.runtime.dev.js, cjs)");
        } else {
            "TURBOPACK unreachable";
        }
    } else {
        "TURBOPACK unreachable";
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/esm/server/route-kind.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "RouteKind": (()=>RouteKind)
});
var RouteKind = /*#__PURE__*/ function(RouteKind) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ RouteKind["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ RouteKind["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ RouteKind["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ RouteKind["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `IMAGE` represents all the images that are generated by `next/image`.
   */ RouteKind["IMAGE"] = "IMAGE";
    return RouteKind;
}({}); //# sourceMappingURL=route-kind.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/helpers.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Hoists a name from a module or promised module.
 *
 * @param module the module to hoist the name from
 * @param name the name to hoist
 * @returns the value on the module (or promised module)
 */ __turbopack_context__.s({
    "hoist": (()=>hoist)
});
function hoist(module, name) {
    // If the name is available in the module, return it.
    if (name in module) {
        return module[name];
    }
    // If a property called `then` exists, assume it's a promise and
    // return a promise that resolves to the name.
    if ('then' in module && typeof module.then === 'function') {
        return module.then((mod)=>hoist(mod, name));
    }
    // If we're trying to hoise the default export, and the module is a function,
    // return the module itself.
    if (typeof module === 'function' && name === 'default') {
        return module;
    }
    // Otherwise, return undefined.
    return undefined;
} //# sourceMappingURL=helpers.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/pages/vendored/contexts/loadable.js [ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/pages/module.compiled.js [ssr] (ecmascript)").vendored['contexts'].Loadable; //# sourceMappingURL=loadable.js.map
}}),
"[project]/node_modules/next/dist/shared/lib/dynamic.js [ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    noSSR: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    /**
 * This function lets you dynamically import a component.
 * It uses [React.lazy()](https://react.dev/reference/react/lazy) with [Suspense](https://react.dev/reference/react/Suspense) under the hood.
 *
 * Read more: [Next.js Docs: `next/dynamic`](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#nextdynamic)
 */ default: function() {
        return dynamic;
    },
    noSSR: function() {
        return noSSR;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [ssr] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[externals]/react [external] (react, cjs)"));
const _loadablesharedruntime = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/pages/vendored/contexts/loadable.js [ssr] (ecmascript)"));
const isServerSide = typeof window === 'undefined';
// Normalize loader to return the module as form { default: Component } for `React.lazy`.
// Also for backward compatible since next/dynamic allows to resolve a component directly with loader
// Client component reference proxy need to be converted to a module.
function convertModule(mod) {
    return {
        default: (mod == null ? void 0 : mod.default) || mod
    };
}
function noSSR(LoadableInitializer, loadableOptions) {
    // Removing webpack and modules means react-loadable won't try preloading
    delete loadableOptions.webpack;
    delete loadableOptions.modules;
    // This check is necessary to prevent react-loadable from initializing on the server
    if (!isServerSide) {
        return LoadableInitializer(loadableOptions);
    }
    const Loading = loadableOptions.loading;
    // This will only be rendered on the server side
    return ()=>/*#__PURE__*/ (0, _jsxruntime.jsx)(Loading, {
            error: null,
            isLoading: true,
            pastDelay: false,
            timedOut: false
        });
}
function dynamic(dynamicOptions, options) {
    let loadableFn = _loadablesharedruntime.default;
    let loadableOptions = {
        // A loading component is not required, so we default it
        loading: (param)=>{
            let { error, isLoading, pastDelay } = param;
            if (!pastDelay) return null;
            if ("TURBOPACK compile-time truthy", 1) {
                if (isLoading) {
                    return null;
                }
                if (error) {
                    return /*#__PURE__*/ (0, _jsxruntime.jsxs)("p", {
                        children: [
                            error.message,
                            /*#__PURE__*/ (0, _jsxruntime.jsx)("br", {}),
                            error.stack
                        ]
                    });
                }
            }
            return null;
        }
    };
    // Support for direct import(), eg: dynamic(import('../hello-world'))
    // Note that this is only kept for the edge case where someone is passing in a promise as first argument
    // The react-loadable babel plugin will turn dynamic(import('../hello-world')) into dynamic(() => import('../hello-world'))
    // To make sure we don't execute the import without rendering first
    if (dynamicOptions instanceof Promise) {
        loadableOptions.loader = ()=>dynamicOptions;
    // Support for having import as a function, eg: dynamic(() => import('../hello-world'))
    } else if (typeof dynamicOptions === 'function') {
        loadableOptions.loader = dynamicOptions;
    // Support for having first argument being options, eg: dynamic({loader: import('../hello-world')})
    } else if (typeof dynamicOptions === 'object') {
        loadableOptions = {
            ...loadableOptions,
            ...dynamicOptions
        };
    }
    // Support for passing options, eg: dynamic(import('../hello-world'), {loading: () => <p>Loading something</p>})
    loadableOptions = {
        ...loadableOptions,
        ...options
    };
    const loaderFn = loadableOptions.loader;
    const loader = ()=>loaderFn != null ? loaderFn().then(convertModule) : Promise.resolve(convertModule(()=>null));
    // coming from build/babel/plugins/react-loadable-plugin.js
    if (loadableOptions.loadableGenerated) {
        loadableOptions = {
            ...loadableOptions,
            ...loadableOptions.loadableGenerated
        };
        delete loadableOptions.loadableGenerated;
    }
    // support for disabling server side rendering, eg: dynamic(() => import('../hello-world'), {ssr: false}).
    if (typeof loadableOptions.ssr === 'boolean' && !loadableOptions.ssr) {
        delete loadableOptions.webpack;
        delete loadableOptions.modules;
        return noSSR(loadableFn, loadableOptions);
    }
    return loadableFn({
        ...loadableOptions,
        loader: loader
    });
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=dynamic.js.map
}}),
"[project]/node_modules/next/dynamic.js [ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/shared/lib/dynamic.js [ssr] (ecmascript)");
}}),
"[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/pages/index.js [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/pages/_document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/pages/_app.js [ssr] (ecmascript)\" } [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__),
    "getServerSideProps": (()=>getServerSideProps),
    "getStaticPaths": (()=>getStaticPaths),
    "getStaticProps": (()=>getStaticProps),
    "reportWebVitals": (()=>reportWebVitals),
    "routeModule": (()=>routeModule),
    "unstable_getServerProps": (()=>unstable_getServerProps),
    "unstable_getServerSideProps": (()=>unstable_getServerSideProps),
    "unstable_getStaticParams": (()=>unstable_getStaticParams),
    "unstable_getStaticPaths": (()=>unstable_getStaticPaths),
    "unstable_getStaticProps": (()=>unstable_getStaticProps)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2f$module$2e$compiled$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-modules/pages/module.compiled.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/route-kind.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/build/templates/helpers.js [ssr] (ecmascript)");
// Import the app and document modules.
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$_document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/_document.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$_app$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/_app.js [ssr] (ecmascript)");
// Import the userland code.
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/pages/index.js [ssr] (ecmascript)");
;
;
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, 'default');
const getStaticProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, 'getStaticProps');
const getStaticPaths = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, 'getStaticPaths');
const getServerSideProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, 'getServerSideProps');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, 'config');
const reportWebVitals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, 'reportWebVitals');
const unstable_getStaticProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getStaticProps');
const unstable_getStaticPaths = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getStaticPaths');
const unstable_getStaticParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getStaticParams');
const unstable_getServerProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getServerProps');
const unstable_getServerSideProps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, 'unstable_getServerSideProps');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2f$module$2e$compiled$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["PagesRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["RouteKind"].PAGES,
        page: "/index",
        pathname: "/",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    components: {
        // default export might not exist when optimized for data only
        App: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$_app$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"],
        Document: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$_document$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"]
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$index$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__9b8457bf._.js.map