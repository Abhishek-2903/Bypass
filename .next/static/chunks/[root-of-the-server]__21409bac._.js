(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/styles/rtm.module.css [client] (css module)": ((__turbopack_context__) => {

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
"[project]/components/Sidebar.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Sidebar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function Sidebar({ soldiers, selectedSoldierId, onSelectSoldier }) {
    _s();
    const [expandedTeams, setExpandedTeams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        team_red: true,
        team_blue: true // Default expanded
    });
    // Use stable sorting to prevent flickering
    const groupedAndSorted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Sidebar.useMemo[groupedAndSorted]": ()=>{
            const groupMap = {};
            // Group soldiers by team
            soldiers.forEach({
                "Sidebar.useMemo[groupedAndSorted]": (s)=>{
                    const teamName = s.team || "team_red"; // fallback if missing
                    if (!groupMap[teamName]) groupMap[teamName] = [];
                    groupMap[teamName].push(s);
                }
            }["Sidebar.useMemo[groupedAndSorted]"]);
            // Sort each team's soldiers ONCE and keep stable order
            Object.keys(groupMap).forEach({
                "Sidebar.useMemo[groupedAndSorted]": (teamName)=>{
                    groupMap[teamName].sort({
                        "Sidebar.useMemo[groupedAndSorted]": (a, b)=>{
                            const idA = parseInt(a.soldier_id) || 0;
                            const idB = parseInt(b.soldier_id) || 0;
                            return idA - idB;
                        }
                    }["Sidebar.useMemo[groupedAndSorted]"]);
                }
            }["Sidebar.useMemo[groupedAndSorted]"]);
            return groupMap;
        }
    }["Sidebar.useMemo[groupedAndSorted]"], [
        soldiers.length
    ]); // Only re-sort when soldier count changes, not on every update
    // Update soldier data without re-sorting
    const updatedGrouped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Sidebar.useMemo[updatedGrouped]": ()=>{
            const updated = {};
            Object.keys(groupedAndSorted).forEach({
                "Sidebar.useMemo[updatedGrouped]": (teamName)=>{
                    updated[teamName] = groupedAndSorted[teamName].map({
                        "Sidebar.useMemo[updatedGrouped]": (soldier)=>{
                            // Find the latest data for this soldier
                            const latestData = soldiers.find({
                                "Sidebar.useMemo[updatedGrouped].latestData": (s)=>s.soldier_id === soldier.soldier_id
                            }["Sidebar.useMemo[updatedGrouped].latestData"]);
                            return latestData || soldier;
                        }
                    }["Sidebar.useMemo[updatedGrouped]"]);
                }
            }["Sidebar.useMemo[updatedGrouped]"]);
            return updated;
        }
    }["Sidebar.useMemo[updatedGrouped]"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
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
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: styles.teamSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                ...styles.teamHeader,
                                borderLeft: `4px solid ${teamColor}`
                            },
                            onClick: ()=>toggleTeam(teamName),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: teamColor
                                    },
                                    children: teamName.replace('team_', '').toUpperCase()
                                }, void 0, false, {
                                    fileName: "[project]/components/Sidebar.js",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: styles.soldierList,
                            children: teamSoldiers.map((soldier)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SoldierRow, {
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
_s(Sidebar, "VhcGu5Cgupfe9NWkPkWY4yxQsjQ=");
_c = Sidebar;
// Memoized soldier row to prevent unnecessary re-renders
const SoldierRow = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].memo(({ soldier, teamColor, isSelected, onSelectSoldier })=>{
    const { soldier_id, hit_status, frequency } = soldier;
    const statusColor = hit_status ? "#ff3333" : "#33ff33";
    const statusText = hit_status ? "KIll" : "ACTIVE";
    const handleClick = ()=>{
        onSelectSoldier(soldier_id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...styles.soldierRow,
            backgroundColor: isSelected ? "#333" : "transparent",
            borderColor: isSelected ? teamColor : "transparent",
            borderLeft: `3px solid ${teamColor}`
        },
        onClick: handleClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.soldierLeft,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.soldierInfo,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: styles.soldierId,
                                children: soldier_id
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.js",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.soldierRight,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c1 = SoldierRow;
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
var _c, _c1;
__turbopack_context__.k.register(_c, "Sidebar");
__turbopack_context__.k.register(_c1, "SoldierRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/KillFeed.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const RawDataFeed = ()=>{
    _s();
    const [rawDataEntries, setRawDataEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]); // Raw data entries
    const [connectionStatus, setConnectionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('Disconnected');
    const [totalDataReceived, setTotalDataReceived] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RawDataFeed.useEffect": ()=>{
            // Connect to raw data WebSocket on port 8002
            const ws = new WebSocket('ws://localhost:8002/ws');
            ws.onopen = ({
                "RawDataFeed.useEffect": ()=>{
                    console.log("🔗 Raw Data Feed WebSocket connected to port 8002");
                    setConnectionStatus('Connected');
                }
            })["RawDataFeed.useEffect"];
            ws.onmessage = ({
                "RawDataFeed.useEffect": (message)=>{
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
                            parsedLines.forEach({
                                "RawDataFeed.useEffect": (line, index)=>{
                                    const entry = {
                                        id: `${data._id}-${index}`,
                                        connection: data.connection,
                                        rawData: line,
                                        dataLength: line.length,
                                        timestamp: data.timestamp,
                                        displayTime: formatTime(data.timestamp)
                                    };
                                    console.log("✅ Adding raw data entry:", entry);
                                    setRawDataEntries({
                                        "RawDataFeed.useEffect": (prev)=>{
                                            const updated = [
                                                entry,
                                                ...prev
                                            ];
                                            return updated.slice(0, 50); // Keep latest 50 entries
                                        }
                                    }["RawDataFeed.useEffect"]);
                                    setTotalDataReceived({
                                        "RawDataFeed.useEffect": (prev)=>prev + 1
                                    }["RawDataFeed.useEffect"]);
                                }
                            }["RawDataFeed.useEffect"]);
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
                        setRawDataEntries({
                            "RawDataFeed.useEffect": (prev)=>{
                                const updated = [
                                    entry,
                                    ...prev
                                ];
                                return updated.slice(0, 50);
                            }
                        }["RawDataFeed.useEffect"]);
                        setTotalDataReceived({
                            "RawDataFeed.useEffect": (prev)=>prev + 1
                        }["RawDataFeed.useEffect"]);
                    }
                }
            })["RawDataFeed.useEffect"];
            ws.onclose = ({
                "RawDataFeed.useEffect": ()=>{
                    console.log("📤 Raw Data Feed WebSocket disconnected");
                    setConnectionStatus('Disconnected');
                }
            })["RawDataFeed.useEffect"];
            ws.onerror = ({
                "RawDataFeed.useEffect": (error)=>{
                    console.error("❌ Raw Data Feed WebSocket error:", error);
                    setConnectionStatus('Error');
                }
            })["RawDataFeed.useEffect"];
            return ({
                "RawDataFeed.useEffect": ()=>{
                    ws.close();
                }
            })["RawDataFeed.useEffect"];
        }
    }["RawDataFeed.useEffect"], []);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "popup-message-wrapper",
        style: {
            maxHeight: "400px",
            overflowY: "auto"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "killFeedTitle",
                        children: "Raw Data Feed (Port 8002)"
                    }, void 0, false, {
                        fileName: "[project]/components/KillFeed.js",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            rawDataEntries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: '0.85em'
                },
                children: rawDataEntries.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "kill-entry",
                        style: {
                            backgroundColor: getRowColor(entry.rawData),
                            margin: '2px 0',
                            padding: '6px 10px',
                            borderRadius: '4px',
                            borderLeft: '3px solid #00ff88',
                            transition: 'all 0.3s ease'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                gap: '10px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '0 0 3px 0',
                                                fontFamily: 'Courier New, monospace',
                                                fontSize: '0.9em',
                                                lineHeight: '1.2'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                gap: '15px',
                                                fontSize: '0.7em',
                                                color: '#888'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "📡 ",
                                                        entry.connection
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/KillFeed.js",
                                                    lineNumber: 232,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            rawDataEntries.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(RawDataFeed, "qP0o3mUxue929PS98g8e/2JbERo=");
_c = RawDataFeed;
const __TURBOPACK__default__export__ = RawDataFeed;
var _c;
__turbopack_context__.k.register(_c, "RawDataFeed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/config.js [client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, k: __turbopack_refresh__, m: module, e: exports } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/StatsTable.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const StatsTable = ()=>{
    _s();
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        team_red: {},
        team_blue: {}
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StatsTable.useEffect": ()=>{
            const ws = new WebSocket(__TURBOPACK__imported__module__$5b$project$5d2f$config$2e$js__$5b$client$5d$__$28$ecmascript$29$__["WS_CONFIG"].getStatsWsUrl());
            ws.onopen = ({
                "StatsTable.useEffect": ()=>{
                    console.log("🔗 Stats WebSocket connected");
                }
            })["StatsTable.useEffect"];
            ws.onclose = ({
                "StatsTable.useEffect": ()=>{
                    console.log("📤 Stats WebSocket disconnected");
                }
            })["StatsTable.useEffect"];
            ws.onerror = ({
                "StatsTable.useEffect": (error)=>{
                    console.error("❌ Stats WebSocket error:", error);
                }
            })["StatsTable.useEffect"];
            ws.onmessage = ({
                "StatsTable.useEffect": (message)=>{
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
                }
            })["StatsTable.useEffect"];
            return ({
                "StatsTable.useEffect": ()=>ws.close()
            })["StatsTable.useEffect"];
        }
    }["StatsTable.useEffect"], []);
    // Helper function to safely get stat values
    const getStat = (team, stat)=>{
        return stats[team]?.[stat] || 0;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "statsCard",
        className: "jsx-820129cbff4814f0" + " " + "summary-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "jsx-820129cbff4814f0",
                children: "Statistical Summary"
            }, void 0, false, {
                fileName: "[project]/components/StatsTable.js",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-820129cbff4814f0" + " " + "stats-table-wrapper",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    id: "statsTable",
                    className: "jsx-820129cbff4814f0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            className: "jsx-820129cbff4814f0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "jsx-820129cbff4814f0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "jsx-820129cbff4814f0",
                                        children: "Team"
                                    }, void 0, false, {
                                        fileName: "[project]/components/StatsTable.js",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "jsx-820129cbff4814f0",
                                        children: "Killed"
                                    }, void 0, false, {
                                        fileName: "[project]/components/StatsTable.js",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            className: "jsx-820129cbff4814f0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "jsx-820129cbff4814f0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "jsx-820129cbff4814f0",
                                            children: "Red Team"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StatsTable.js",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "jsx-820129cbff4814f0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "jsx-820129cbff4814f0",
                                            children: "Blue Team"
                                        }, void 0, false, {
                                            fileName: "[project]/components/StatsTable.js",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(StatsTable, "FQBLDysAFTEpH1HdyncPTqJq/RY=");
_c = StatsTable;
const __TURBOPACK__default__export__ = StatsTable;
var _c;
__turbopack_context__.k.register(_c, "StatsTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/pages/index.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>RealTimeMonitoring)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/styles/rtm.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Sidebar$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Sidebar.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$KillFeed$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/KillFeed.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatsTable$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/StatsTable.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config.js [client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
const MapSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/components/MapSection.js [client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i), {
    loadableGenerated: {
        modules: [
            "[project]/components/MapSection.js [client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = MapSection;
function RealTimeMonitoring() {
    _s();
    const [soldiers, setSoldiers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedSoldierId, setSelectedSoldierId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [comPort, setComPort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [wsPort, setWsPort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("8001");
    const [savedComPort, setSavedComPort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [savedWsPort, setSavedWsPort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sessionStatus, setSessionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("stopped");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // WebSocket connection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RealTimeMonitoring.useEffect": ()=>{
            let ws;
            if (sessionStatus === "running") {
                const wsUrl = `ws://localhost:${savedWsPort}/ws`;
                ws = new WebSocket(wsUrl);
                ws.onmessage = ({
                    "RealTimeMonitoring.useEffect": (message)=>{
                        try {
                            const data = JSON.parse(message.data);
                            setSoldiers({
                                "RealTimeMonitoring.useEffect": (prev)=>{
                                    const filtered = prev.filter({
                                        "RealTimeMonitoring.useEffect.filtered": (s)=>s.soldier_id !== data.soldier_id
                                    }["RealTimeMonitoring.useEffect.filtered"]);
                                    return [
                                        ...filtered,
                                        {
                                            ...data,
                                            lastUpdate: new Date().toISOString()
                                        }
                                    ];
                                }
                            }["RealTimeMonitoring.useEffect"]);
                        } catch (error) {
                            console.error("Error parsing soldier data:", error);
                            setError("Error receiving data from WebSocket");
                        }
                    }
                })["RealTimeMonitoring.useEffect"];
                ws.onerror = ({
                    "RealTimeMonitoring.useEffect": ()=>{
                        setError("WebSocket connection failed");
                    }
                })["RealTimeMonitoring.useEffect"];
                ws.onclose = ({
                    "RealTimeMonitoring.useEffect": ()=>{
                        if (sessionStatus === "running") {
                            setError("WebSocket closed unexpectedly");
                        }
                    }
                })["RealTimeMonitoring.useEffect"];
            }
            return ({
                "RealTimeMonitoring.useEffect": ()=>ws && ws.close()
            })["RealTimeMonitoring.useEffect"];
        }
    }["RealTimeMonitoring.useEffect"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].simulationPage || ""),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: "/",
                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].endSessionButton || ""),
                children: "End Session"
            }, void 0, false, {
                fileName: "[project]/pages/index.js",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container || ""),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].leftContainer || ""),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Sidebar$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightContainer || ""),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mapContainer || ""),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapSection, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].bottomSection || ""),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].killFeed || ""),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$KillFeed$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                            fileName: "[project]/pages/index.js",
                                            lineNumber: 136,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 135,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statsTable || ""),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$StatsTable$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sessionControls || ""),
                                children: [
                                    sessionStatus === "stopped" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Enter COM Port (e.g., COM3)",
                                                value: comPort,
                                                onChange: (e)=>setComPort(e.target.value.toUpperCase()),
                                                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comPortInput || "")
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 146,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Enter WS Port (e.g., 8001)",
                                                value: wsPort,
                                                onChange: (e)=>setWsPort(e.target.value),
                                                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comPortInput || "")
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 153,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleSavePorts,
                                                className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].comPortButton || ""),
                                                children: "Save Ports"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/index.js",
                                                lineNumber: 160,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleToggleSession,
                                        disabled: sessionStatus === "stopped" && (!savedComPort || !savedWsPort),
                                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sessionButton || ""),
                                        children: sessionStatus === "running" ? "Stop Simulation" : "Start Simulation"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this),
                                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].error || ""),
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/pages/index.js",
                                        lineNumber: 175,
                                        columnNumber: 23
                                    }, this),
                                    savedComPort && savedWsPort && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-9de421a33172ef0" + " " + (__TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$rtm$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].status || "")
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(RealTimeMonitoring, "nN1ogkRiESLpLLlLUHZzAU1Aa2Y=");
_c1 = RealTimeMonitoring;
var _c, _c1;
__turbopack_context__.k.register(_c, "MapSection");
__turbopack_context__.k.register(_c1, "RealTimeMonitoring");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/index.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/pages/index (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__21409bac._.js.map