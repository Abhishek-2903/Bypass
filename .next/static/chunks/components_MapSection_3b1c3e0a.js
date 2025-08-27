(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/MapSection.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>MapSection)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function MapSection({ soldiers = [], selectedSoldierId }) {
    _s();
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const outOfBoundsMarkersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const distanceLinesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const distanceLabelsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const trailsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])({}); // New ref to track all trail polylines
    const mapInitializedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const mbTilesLayerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [trailsData, setTrailsData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [colorMap, setColorMap] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [loader, setLoader] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [mapBounds, setMapBounds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mapLoaded, setMapLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [defaultZoomLevel, setDefaultZoomLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(15);
    const [showControls, setShowControls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [mapMetadataBounds, setMapMetadataBounds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [outOfBoundsSoldiers, setOutOfBoundsSoldiers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isFullscreen, setIsFullscreen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPathTracking, setShowPathTracking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const soldierColors = [
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF",
        "#FFA500",
        "#800080",
        "#FFFFFF",
        "#000000"
    ];
    function generateColorFromId(id) {
        if (!id || typeof id !== "string") {
            console.warn("Invalid soldier_id, using default color");
            return soldierColors[0]; // Fallback to the first color
        }
        let hash = 0;
        for(let i = 0; i < id.length; i++){
            const char = id.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        const index = Math.abs(hash) % soldierColors.length;
        return soldierColors[index];
    }
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3;
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    }
    function isWithinBounds(lat, lng, bounds) {
        if (!bounds) return true;
        return lat >= bounds.south && lat <= bounds.north && lng >= bounds.west && lng <= bounds.east;
    }
    function parseBounds(boundsString) {
        if (!boundsString) return null;
        const coords = boundsString.split(",").map(Number);
        if (coords.length === 4) {
            return {
                west: coords[0],
                south: coords[1],
                east: coords[2],
                north: coords[3]
            };
        }
        return null;
    }
    const toggleFullscreen = ()=>{
        const mapContainer = document.querySelector(".map-container");
        if (!document.fullscreenElement) {
            mapContainer?.requestFullscreen().then(()=>{
                setIsFullscreen(true);
                setTimeout(()=>{
                    if (mapRef.current) {
                        mapRef.current.invalidateSize();
                    }
                }, 100);
            }).catch((err)=>{
                console.error("Error attempting to enable fullscreen:", err);
            });
        } else {
            document.exitFullscreen().then(()=>{
                setIsFullscreen(false);
                setTimeout(()=>{
                    if (mapRef.current) {
                        mapRef.current.invalidateSize();
                    }
                }, 100);
            }).catch((err)=>{
                console.error("Error attempting to exit fullscreen:", err);
            });
        }
    };
    const togglePathTracking = ()=>{
        setShowPathTracking((prev)=>!prev);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapSection.useEffect": ()=>{
            console.log("Soldiers prop:", soldiers);
        }
    }["MapSection.useEffect"], [
        soldiers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapSection.useEffect": ()=>{
            const handleFullscreenChange = {
                "MapSection.useEffect.handleFullscreenChange": ()=>{
                    setIsFullscreen(!!document.fullscreenElement);
                    setTimeout({
                        "MapSection.useEffect.handleFullscreenChange": ()=>{
                            if (mapRef.current) {
                                mapRef.current.invalidateSize();
                            }
                        }
                    }["MapSection.useEffect.handleFullscreenChange"], 100);
                }
            }["MapSection.useEffect.handleFullscreenChange"];
            document.addEventListener("fullscreenchange", handleFullscreenChange);
            return ({
                "MapSection.useEffect": ()=>{
                    document.removeEventListener("fullscreenchange", handleFullscreenChange);
                }
            })["MapSection.useEffect"];
        }
    }["MapSection.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapSection.useEffect": ()=>{
            const timer = setTimeout({
                "MapSection.useEffect.timer": ()=>{
                    const container = document.getElementById("mapid");
                    if (!container) {
                        console.error("Map container not found");
                        setLoader("Error: Map container not found");
                        return;
                    }
                    if (mapInitializedRef.current || mapRef.current || container._leaflet_id || container.hasChildNodes()) {
                        return;
                    }
                    mapContainerRef.current = container;
                    const cssId = "leaflet-css";
                    if (!document.getElementById(cssId)) {
                        const link = document.createElement("link");
                        link.id = cssId;
                        link.rel = "stylesheet";
                        link.href = "/leaflet.css";
                        document.head.appendChild(link);
                    }
                    setLoader("Initializing map…");
                    try {
                        mapRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].map(container, {
                            center: [
                                28.5471399,
                                77.1945754
                            ],
                            zoom: 15,
                            minZoom: 10,
                            maxZoom: 21,
                            preferCanvas: true,
                            zoomControl: true,
                            attributionControl: false
                        });
                        class MBTilesLayer extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].TileLayer {
                            _db = null;
                            loadMBTilesFromArrayBuffer = ({
                                "MapSection.useEffect.timer": (buf)=>{
                                    try {
                                        console.log("Loading MBTiles from buffer, size:", buf.byteLength);
                                        this._db = new window.SQL.Database(new Uint8Array(buf));
                                        this._getMetadata();
                                        setLoader("");
                                        setProgress(100);
                                        setMapLoaded(true);
                                        setShowControls(false);
                                        this.redraw();
                                        console.log("MBTiles loaded successfully");
                                    } catch (error) {
                                        console.error("Error loading MBTiles:", error);
                                        setLoader(`Error loading MBTiles: ${error.message}`);
                                        setProgress(0);
                                    }
                                }
                            })["MapSection.useEffect.timer"];
                            _getMetadata = ({
                                "MapSection.useEffect.timer": ()=>{
                                    if (!this._db) return;
                                    try {
                                        const metaStmt = this._db.prepare("SELECT name, value FROM metadata");
                                        const metadata = {};
                                        while(metaStmt.step()){
                                            const row = metaStmt.getAsObject();
                                            metadata[row.name] = row.value;
                                        }
                                        metaStmt.free();
                                        console.log("MBTiles metadata:", metadata);
                                        if (metadata.bounds) {
                                            const bounds = parseBounds(metadata.bounds);
                                            setMapMetadataBounds(bounds);
                                            console.log("Map metadata bounds:", bounds);
                                        }
                                        const zoomStmt = this._db.prepare("SELECT DISTINCT zoom_level FROM tiles ORDER BY zoom_level");
                                        const zooms = [];
                                        while(zoomStmt.step()){
                                            zooms.push(zoomStmt.getAsObject().zoom_level);
                                        }
                                        zoomStmt.free();
                                        console.log("Available zoom levels:", zooms);
                                        const minZoom = Math.min(...zooms);
                                        const maxZoom = Math.max(...zooms);
                                        console.log(`Adjusting zoom range: ${minZoom} - ${maxZoom}`);
                                        this.options.minZoom = minZoom;
                                        this.options.maxZoom = Math.min(maxZoom, 21);
                                        if (mapRef.current) {
                                            mapRef.current.setMinZoom(minZoom);
                                            mapRef.current.setMaxZoom(Math.min(maxZoom, 21));
                                        }
                                        if (metadata.bounds) {
                                            const bounds = metadata.bounds.split(",").map(Number);
                                            if (bounds.length === 4) {
                                                const sw = [
                                                    bounds[1],
                                                    bounds[0]
                                                ];
                                                const ne = [
                                                    bounds[3],
                                                    bounds[2]
                                                ];
                                                const leafletBounds = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].latLngBounds(sw, ne);
                                                setMapBounds(leafletBounds);
                                                const idealZoom = mapRef.current.getBoundsZoom(leafletBounds);
                                                const clampedZoom = Math.max(minZoom, Math.min(idealZoom, maxZoom - 1));
                                                setDefaultZoomLevel(clampedZoom);
                                                setTimeout({
                                                    "MapSection.useEffect.timer": ()=>{
                                                        if (mapRef.current) {
                                                            mapRef.current.fitBounds(leafletBounds, {
                                                                maxZoom: clampedZoom,
                                                                padding: [
                                                                    10,
                                                                    10
                                                                ]
                                                            });
                                                        }
                                                    }
                                                }["MapSection.useEffect.timer"], 100);
                                            }
                                        }
                                        const countStmt = this._db.prepare("SELECT COUNT(*) as count FROM tiles");
                                        countStmt.step();
                                        const tileCount = countStmt.getAsObject().count;
                                        countStmt.free();
                                        console.log("Total tiles:", tileCount);
                                        const distStmt = this._db.prepare("SELECT zoom_level, COUNT(*) as count FROM tiles GROUP BY zoom_level ORDER BY zoom_level");
                                        console.log("Tile distribution:");
                                        while(distStmt.step()){
                                            const row = distStmt.getAsObject();
                                            console.log(`  Zoom ${row.zoom_level}: ${row.count} tiles`);
                                        }
                                        distStmt.free();
                                    } catch (error) {
                                        console.error("Error reading metadata:", error);
                                    }
                                }
                            })["MapSection.useEffect.timer"];
                            loadMBTilesFromPath = ({
                                "MapSection.useEffect.timer": (path)=>{
                                    setLoader(`Loading ${path}…`);
                                    setMapLoaded(false);
                                    setProgress(0);
                                    console.log("Loading MBTiles from path:", path);
                                    fetch(path, {
                                        method: "GET"
                                    }).then({
                                        "MapSection.useEffect.timer": async (response)=>{
                                            if (!response.ok) {
                                                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                                            }
                                            const contentLength = response.headers.get("Content-Length");
                                            const total = contentLength ? parseInt(contentLength, 10) : 0;
                                            let loaded = 0;
                                            const reader = response.body.getReader();
                                            const chunks = [];
                                            while(true){
                                                const { done, value } = await reader.read();
                                                if (done) break;
                                                chunks.push(value);
                                                loaded += value.length;
                                                if (total > 0) {
                                                    const percentage = Math.round(loaded / total * 100);
                                                    setProgress(percentage);
                                                    setLoader(`Loading map: ${percentage}%`);
                                                } else {
                                                    setLoader(`Loading map: ${Math.round(loaded / (1024 * 1024))} MB processed`);
                                                }
                                            }
                                            const buffer = new Uint8Array(loaded);
                                            let offset = 0;
                                            for (const chunk of chunks){
                                                buffer.set(chunk, offset);
                                                offset += chunk.length;
                                            }
                                            console.log("MBTiles file fetched successfully");
                                            this.loadMBTilesFromArrayBuffer(buffer.buffer);
                                        }
                                    }["MapSection.useEffect.timer"]).catch({
                                        "MapSection.useEffect.timer": (e)=>{
                                            console.error("Error loading MBTiles:", e);
                                            setLoader(`Error: ${e.message}`);
                                            setProgress(0);
                                            setMapLoaded(false);
                                        }
                                    }["MapSection.useEffect.timer"]);
                                }
                            })["MapSection.useEffect.timer"];
                            createTile(coords, done) {
                                const img = document.createElement("img");
                                if (!this._db) {
                                    console.warn("Database not loaded yet");
                                    img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=";
                                    setTimeout({
                                        "MapSection.useEffect.timer": ()=>done(null, img)
                                    }["MapSection.useEffect.timer"], 100);
                                    return img;
                                }
                                const z = coords.z;
                                const x = coords.x;
                                const y = Math.pow(2, z) - coords.y - 1;
                                try {
                                    const stmt = this._db.prepare("SELECT tile_data FROM tiles WHERE zoom_level=? AND tile_column=? AND tile_row=?");
                                    stmt.bind([
                                        z,
                                        x,
                                        y
                                    ]);
                                    if (stmt.step()) {
                                        const data = stmt.getAsObject().tile_data;
                                        if (data && data.length > 0) {
                                            const blob = new Blob([
                                                new Uint8Array(data)
                                            ], {
                                                type: "image/png"
                                            });
                                            const url = URL.createObjectURL(blob);
                                            img.onload = ({
                                                "MapSection.useEffect.timer": ()=>{
                                                    URL.revokeObjectURL(url);
                                                    done(null, img);
                                                }
                                            })["MapSection.useEffect.timer"];
                                            img.onerror = ({
                                                "MapSection.useEffect.timer": ()=>{
                                                    URL.revokeObjectURL(url);
                                                    console.warn(`Tile error for ${z}/${x}/${y}`);
                                                    img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=";
                                                    done(null, img);
                                                }
                                            })["MapSection.useEffect.timer"];
                                            img.src = url;
                                        } else {
                                            console.warn(`Empty tile data for ${z}/${x}/${y}`);
                                            img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=";
                                            done(null, img);
                                        }
                                    } else {
                                        if (z <= 12) {
                                            console.warn(`Missing tile at zoom ${z}: ${x}/${y} (critical for zoom out)`);
                                        }
                                        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=";
                                        done(null, img);
                                    }
                                    stmt.free();
                                } catch (error) {
                                    console.error(`Error getting tile ${z}/${x}/${y}:`, error);
                                    img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=";
                                    done(null, img);
                                }
                                return img;
                            }
                        }
                        mbTilesLayerRef.current = new MBTilesLayer({
                            minZoom: 1,
                            maxZoom: 21,
                            tms: true,
                            errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWNgAAIAAAUAAY27m/MAAAAASUVORK5CYII=",
                            bounds: null,
                            noWrap: false,
                            keepBuffer: 2,
                            updateWhenIdle: false,
                            updateWhenZooming: true
                        });
                        mbTilesLayerRef.current.addTo(mapRef.current);
                        setLoader("Please load Map file");
                        mapInitializedRef.current = true;
                        const script = document.createElement("script");
                        script.src = "/sqljs/sql-wasm.js";
                        script.onload = ({
                            "MapSection.useEffect.timer": ()=>{
                                window.initSqlJs({
                                    locateFile: {
                                        "MapSection.useEffect.timer": ()=>"/sqljs/sql-wasm.wasm"
                                    }["MapSection.useEffect.timer"]
                                }).then({
                                    "MapSection.useEffect.timer": (SQL)=>{
                                        window.SQL = SQL;
                                    }
                                }["MapSection.useEffect.timer"]).catch({
                                    "MapSection.useEffect.timer": (error)=>{
                                        console.error("SQL.js initialization failed:", error);
                                        setLoader(`SQL.js Error: ${error.message}`);
                                    }
                                }["MapSection.useEffect.timer"]);
                            }
                        })["MapSection.useEffect.timer"];
                        script.onerror = ({
                            "MapSection.useEffect.timer": ()=>{
                                console.error("Failed to load SQL.js script");
                                setLoader("Error: Failed to load SQL.js");
                            }
                        })["MapSection.useEffect.timer"];
                        document.body.appendChild(script);
                    } catch (error) {
                        console.error("Error creating map:", error);
                        setLoader(`Map Error: ${error.message}`);
                    }
                }
            }["MapSection.useEffect.timer"], 0);
            return ({
                "MapSection.useEffect": ()=>{
                    clearTimeout(timer);
                    if (mapRef.current) {
                        try {
                            mapRef.current.remove();
                        } catch (e) {
                            console.warn("Error removing map:", e);
                        }
                        mapRef.current = null;
                    }
                    if (mapContainerRef.current && mapContainerRef.current._leaflet_id) {
                        delete mapContainerRef.current._leaflet_id;
                    }
                    markersRef.current = {};
                    outOfBoundsMarkersRef.current = {};
                    distanceLinesRef.current = {};
                    distanceLabelsRef.current = {};
                    trailsRef.current = {};
                    mbTilesLayerRef.current = null;
                    mapInitializedRef.current = false;
                    mapContainerRef.current = null;
                    setMapLoaded(false);
                    setProgress(0);
                }
            })["MapSection.useEffect"];
        }
    }["MapSection.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapSection.useEffect": ()=>{
            setColorMap({
                "MapSection.useEffect": (prev)=>{
                    const next = {
                        ...prev
                    };
                    let added = false;
                    soldiers.forEach({
                        "MapSection.useEffect": (soldier)=>{
                            if (soldier && soldier.soldier_id && typeof soldier.soldier_id === "string") {
                                if (!next[soldier.soldier_id]) {
                                    next[soldier.soldier_id] = generateColorFromId(soldier.soldier_id);
                                    added = true;
                                }
                            } else {
                                console.warn("Skipping soldier with invalid soldier_id:", soldier);
                            }
                        }
                    }["MapSection.useEffect"]);
                    return added ? next : prev;
                }
            }["MapSection.useEffect"]);
        }
    }["MapSection.useEffect"], [
        soldiers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapSection.useEffect": ()=>{
            if (!mapInitializedRef.current) return;
            setTrailsData({
                "MapSection.useEffect": (prev)=>{
                    const next = {
                        ...prev
                    };
                    let updated = false;
                    soldiers.forEach({
                        "MapSection.useEffect": (soldier)=>{
                            if (soldier && soldier.soldier_id && typeof soldier.soldier_id === "string" && soldier.gps && typeof soldier.gps.latitude === "number" && typeof soldier.gps.longitude === "number") {
                                const { soldier_id, gps } = soldier;
                                if (!next[soldier_id]) {
                                    next[soldier_id] = [];
                                }
                                const lastPoint = next[soldier_id][next[soldier_id].length - 1];
                                const newPoint = [
                                    gps.latitude,
                                    gps.longitude
                                ];
                                if (!lastPoint || lastPoint[0] !== newPoint[0] || lastPoint[1] !== newPoint[1]) {
                                    next[soldier_id] = [
                                        ...next[soldier_id],
                                        newPoint
                                    ];
                                    updated = true;
                                }
                            } else {
                                console.warn("Skipping invalid soldier for trails:", soldier);
                            }
                        }
                    }["MapSection.useEffect"]);
                    return updated ? next : prev;
                }
            }["MapSection.useEffect"]);
        }
    }["MapSection.useEffect"], [
        soldiers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapSection.useEffect": ()=>{
            if (!mapMetadataBounds) {
                setOutOfBoundsSoldiers({});
                return;
            }
            const outOfBounds = {};
            soldiers.forEach({
                "MapSection.useEffect": (soldier)=>{
                    if (soldier && soldier.soldier_id && typeof soldier.soldier_id === "string" && soldier.gps && typeof soldier.gps.latitude === "number" && typeof soldier.gps.longitude === "number") {
                        const { soldier_id, gps } = soldier;
                        if (!isWithinBounds(gps.latitude, gps.longitude, mapMetadataBounds)) {
                            outOfBounds[soldier_id] = {
                                originalLat: gps.latitude,
                                originalLng: gps.longitude,
                                soldier: soldier
                            };
                            console.log(`Soldier ${soldier_id} is out of bounds:`, gps);
                        }
                    }
                }
            }["MapSection.useEffect"]);
            setOutOfBoundsSoldiers(outOfBounds);
        }
    }["MapSection.useEffect"], [
        soldiers,
        mapMetadataBounds
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapSection.useEffect": ()=>{
            if (!mapInitializedRef.current || !mapRef.current) return;
            Object.values(outOfBoundsMarkersRef.current).forEach({
                "MapSection.useEffect": (marker)=>{
                    mapRef.current.removeLayer(marker);
                }
            }["MapSection.useEffect"]);
            outOfBoundsMarkersRef.current = {};
            Object.entries(outOfBoundsSoldiers).forEach({
                "MapSection.useEffect": ([soldier_id, data])=>{
                    const { soldier } = data;
                    const base = colorMap[soldier_id] || generateColorFromId(soldier_id);
                    const color = soldier.hit_status ? "#ff4444" : base;
                    const yaw = soldier.imu?.yaw || 0;
                    const svg = `
        <svg width="30" height="30">
          <circle cx="15" cy="15" r="12" fill="${color}" opacity="0.8" 
                  stroke="#ff0000" stroke-width="3" stroke-dasharray="2,2">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="15" cy="15" r="8" fill="${color}" opacity="0.9"/>
          <line x1="15" y1="15" x2="15" y2="3"
                stroke="#000" stroke-width="2"
                transform="rotate(${yaw},15,15)"/>
          <text x="15" y="25" text-anchor="middle" fill="#ff0000" font-size="8" font-weight="bold">OUT</text>
        </svg>`;
                    const mapCenter = mapRef.current.getCenter();
                    const icon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].divIcon({
                        className: "out-of-bounds-marker",
                        html: svg,
                        iconSize: [
                            30,
                            30
                        ],
                        iconAnchor: [
                            15,
                            15
                        ]
                    });
                    const marker = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].marker([
                        mapCenter.lat,
                        mapCenter.lng
                    ], {
                        icon
                    });
                    marker.bindPopup(`<b>${soldier_id} - OUT OF BOUNDS</b><br/>
         Original Lat: ${data.originalLat}<br/>
         Original Lng: ${data.originalLng}<br/>
         Color: ${base}<br/>
         <span style="color: #ff0000; font-weight: bold;">Location outside map area!</span>`);
                    marker.addTo(mapRef.current);
                    outOfBoundsMarkersRef.current[soldier_id] = marker;
                }
            }["MapSection.useEffect"]);
            soldiers.forEach({
                "MapSection.useEffect": (soldier)=>{
                    if (!soldier || !soldier.soldier_id || typeof soldier.soldier_id !== "string" || !soldier.gps || typeof soldier.gps.latitude !== "number" || typeof soldier.gps.longitude !== "number") {
                        console.warn("Skipping invalid soldier for markers:", soldier);
                        return;
                    }
                    const { soldier_id, gps, hit_status, imu } = soldier;
                    if (outOfBoundsSoldiers[soldier_id]) {
                        if (markersRef.current[soldier_id]) {
                            mapRef.current.removeLayer(markersRef.current[soldier_id]);
                            delete markersRef.current[soldier_id];
                        }
                        return;
                    }
                    const base = colorMap[soldier_id] || generateColorFromId(soldier_id);
                    const color = hit_status ? "#ff4444" : base;
                    const yaw = imu?.yaw || 0;
                    const svg = `
        <svg width="20" height="20">
          <circle cx="10" cy="10" r="8" fill="${color}" opacity="0.8"/>
          <line x1="10" y1="10" x2="10" y2="0"
                stroke="#000" stroke-width="2"
                transform="rotate(${yaw},10,10)"/>
        </svg>`;
                    if (!markersRef.current[soldier_id]) {
                        const icon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].divIcon({
                            className: "custom-marker",
                            html: svg,
                            iconSize: [
                                20,
                                20
                            ],
                            iconAnchor: [
                                10,
                                10
                            ]
                        });
                        const m = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].marker([
                            gps.latitude,
                            gps.longitude
                        ], {
                            icon
                        });
                        m.bindPopup(`<b>${soldier_id}</b><br/>Lat: ${gps.latitude}<br/>Lng: ${gps.longitude}<br/>Color: ${base}`);
                        m.addTo(mapRef.current);
                        markersRef.current[soldier_id] = m;
                    } else {
                        const m = markersRef.current[soldier_id];
                        m.setLatLng([
                            gps.latitude,
                            gps.longitude
                        ]);
                        const icon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].divIcon({
                            className: "custom-marker",
                            html: svg,
                            iconSize: [
                                20,
                                20
                            ],
                            iconAnchor: [
                                10,
                                10
                            ]
                        });
                        m.setIcon(icon);
                        m.setPopupContent(`<b>${soldier_id}</b><br/>Lat: ${gps.latitude}<br/>Lng: ${gps.longitude}<br/>Color: ${base}`);
                    }
                }
            }["MapSection.useEffect"]);
        }
    }["MapSection.useEffect"], [
        soldiers,
        colorMap,
        outOfBoundsSoldiers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapSection.useEffect": ()=>{
            if (!mapInitializedRef.current || !mapRef.current) return;
            const map = mapRef.current;
            // Clear all existing trails, distance lines, and labels
            Object.values(trailsRef.current).forEach({
                "MapSection.useEffect": (trail)=>{
                    map.removeLayer(trail);
                }
            }["MapSection.useEffect"]);
            trailsRef.current = {};
            Object.values(distanceLinesRef.current).forEach({
                "MapSection.useEffect": (line)=>{
                    map.removeLayer(line);
                }
            }["MapSection.useEffect"]);
            Object.values(distanceLabelsRef.current).forEach({
                "MapSection.useEffect": (label)=>{
                    map.removeLayer(label);
                }
            }["MapSection.useEffect"]);
            distanceLinesRef.current = {};
            distanceLabelsRef.current = {};
            // Only render trails and distance lines if path tracking is enabled
            if (showPathTracking) {
                // Render distance lines and labels
                const commandCenter = soldiers.find({
                    "MapSection.useEffect.commandCenter": (soldier)=>soldier && soldier.soldier_id === "1" && soldier.gps && typeof soldier.gps.latitude === "number" && typeof soldier.gps.longitude === "number"
                }["MapSection.useEffect.commandCenter"]);
                if (commandCenter) {
                    const commandCenterCoords = [
                        commandCenter.gps.latitude,
                        commandCenter.gps.longitude
                    ];
                    soldiers.forEach({
                        "MapSection.useEffect": (soldier)=>{
                            if (soldier && soldier.soldier_id && typeof soldier.soldier_id === "string" && soldier.soldier_id !== "1" && soldier.gps && typeof soldier.gps.latitude === "number" && typeof soldier.gps.longitude === "number") {
                                const { soldier_id, gps } = soldier;
                                if (outOfBoundsSoldiers[soldier_id]) {
                                    return;
                                }
                                const soldierCoords = [
                                    gps.latitude,
                                    gps.longitude
                                ];
                                const distance = calculateDistance(commandCenterCoords[0], commandCenterCoords[1], soldierCoords[0], soldierCoords[1]);
                                const color = colorMap[soldier_id] || generateColorFromId(soldier_id);
                                const line = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].polyline([
                                    commandCenterCoords,
                                    soldierCoords
                                ], {
                                    color: color,
                                    weight: 2,
                                    opacity: 0.5,
                                    dashArray: "2,4"
                                });
                                line.addTo(map);
                                distanceLinesRef.current[soldier_id] = line;
                                const midLat = (commandCenterCoords[0] + soldierCoords[0]) / 2;
                                const midLon = (commandCenterCoords[1] + soldierCoords[1]) / 2;
                                let distanceText;
                                if (distance < 1000) {
                                    distanceText = `${Math.round(distance)} m`;
                                } else {
                                    distanceText = `${(distance / 1000).toFixed(2)} km`;
                                }
                                const label = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].divIcon({
                                    className: "distance-label",
                                    html: `
                <div style="
                  background: rgba(0, 20, 40, 0.8);
                  color: #66fcf1;
                  font-family: 'Courier New', monospace;
                  font-size: 12px;
                  font-weight: bold;
                  padding: 8px 18px;
                  border: 1px solid #00ffff;
                  border-radius: 4px;
                  white-space: nowrap;
                  text-align: center;
                  min-width: 60px;
                ">
                  ${distanceText}
                </div>
              `,
                                    iconSize: [
                                        60,
                                        24
                                    ],
                                    iconAnchor: [
                                        30,
                                        12
                                    ]
                                });
                                const marker = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].marker([
                                    midLat,
                                    midLon
                                ], {
                                    icon: label
                                });
                                marker.addTo(map);
                                distanceLabelsRef.current[soldier_id] = marker;
                            } else {
                                console.warn("Skipping invalid soldier for distance lines:", soldier);
                            }
                        }
                    }["MapSection.useEffect"]);
                }
                // Render trails
                if (!selectedSoldierId) {
                    Object.entries(trailsData).forEach({
                        "MapSection.useEffect": ([id, coords])=>{
                            if (coords.length < 2 || outOfBoundsSoldiers[id]) return;
                            const color = colorMap[id] || generateColorFromId(id);
                            const pl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].polyline(coords, {
                                color: color,
                                weight: 2,
                                opacity: 1,
                                dashArray: "4,6"
                            });
                            pl.addTo(map);
                            trailsRef.current[id] = pl;
                        }
                    }["MapSection.useEffect"]);
                } else {
                    const coords = trailsData[selectedSoldierId] || [];
                    if (coords.length > 1 && !outOfBoundsSoldiers[selectedSoldierId]) {
                        const color = colorMap[selectedSoldierId] || generateColorFromId(selectedSoldierId);
                        const pl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].polyline(coords, {
                            color: color,
                            weight: 3,
                            opacity: 1,
                            dashArray: "4,2"
                        });
                        pl.addTo(map);
                        trailsRef.current[selectedSoldierId] = pl;
                    }
                }
                // Adjust marker opacity based on selection
                Object.values(markersRef.current).forEach({
                    "MapSection.useEffect": (m)=>m.setOpacity(1)
                }["MapSection.useEffect"]);
                Object.values(outOfBoundsMarkersRef.current).forEach({
                    "MapSection.useEffect": (m)=>m.setOpacity(1)
                }["MapSection.useEffect"]);
                if (selectedSoldierId) {
                    Object.entries(markersRef.current).forEach({
                        "MapSection.useEffect": ([id, m])=>m.setOpacity(id === selectedSoldierId ? 1 : 0.3)
                    }["MapSection.useEffect"]);
                    Object.entries(outOfBoundsMarkersRef.current).forEach({
                        "MapSection.useEffect": ([id, m])=>m.setOpacity(id === selectedSoldierId ? 1 : 0.3)
                    }["MapSection.useEffect"]);
                    const selectedMarker = markersRef.current[selectedSoldierId] || outOfBoundsMarkersRef.current[selectedSoldierId];
                    if (selectedMarker) {
                        map.setView(selectedMarker.getLatLng(), map.getZoom());
                    }
                }
            } else {
                // Log for debugging
                console.log("Path tracking disabled, clearing all trails and distance lines");
                map.eachLayer({
                    "MapSection.useEffect": (layer)=>{
                        if (layer instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].Polyline) {
                            console.log("Removing polyline layer:", layer);
                            map.removeLayer(layer);
                        }
                    }
                }["MapSection.useEffect"]);
                // Ensure all markers are fully visible
                Object.values(markersRef.current).forEach({
                    "MapSection.useEffect": (m)=>m.setOpacity(1)
                }["MapSection.useEffect"]);
                Object.values(outOfBoundsMarkersRef.current).forEach({
                    "MapSection.useEffect": (m)=>m.setOpacity(1)
                }["MapSection.useEffect"]);
            }
        }
    }["MapSection.useEffect"], [
        soldiers,
        trailsData,
        selectedSoldierId,
        colorMap,
        outOfBoundsSoldiers,
        showPathTracking
    ]);
    const onPath = ()=>{
        const v = document.getElementById("filepath")?.value;
        if (v && mbTilesLayerRef.current) {
            console.log("Loading MBTiles from path:", v);
            mbTilesLayerRef.current.loadMBTilesFromPath(v);
        }
    };
    const onFile = (e)=>{
        const f = e.target.files?.[0];
        if (f && mbTilesLayerRef.current) {
            console.log("Loading MBTiles from file:", f.name);
            setLoader(`Loading ${f.name}…`);
            setProgress(0);
            const r = new FileReader();
            r.onprogress = (event)=>{
                if (event.lengthComputable) {
                    const percentage = Math.round(event.loaded / event.total * 100);
                    setProgress(percentage);
                    setLoader(`Loading ${f.name}: ${percentage}%`);
                } else {
                    setLoader(`Loading ${f.name}: ${Math.round(event.loaded / (1024 * 1024))} MB processed`);
                }
            };
            r.onload = ()=>mbTilesLayerRef.current.loadMBTilesFromArrayBuffer(r.result);
            r.onerror = ()=>{
                setLoader(`Error loading ${f.name}`);
                setProgress(0);
            };
            r.readAsArrayBuffer(f);
        }
    };
    const onFitBounds = ()=>{
        if (mapBounds && mapRef.current) {
            mapRef.current.fitBounds(mapBounds, {
                maxZoom: 18,
                padding: [
                    20,
                    20
                ]
            });
        }
    };
    const onDebugTiles = ()=>{
        if (mbTilesLayerRef.current && mbTilesLayerRef.current._db) {
            const db = mbTilesLayerRef.current._db;
            const zoomStmt = db.prepare("SELECT zoom_level, COUNT(*) as count FROM tiles GROUP BY zoom_level ORDER BY zoom_level");
            console.log("=== MBTiles Debug Info ===");
            console.log("Tile distribution by zoom level:");
            while(zoomStmt.step()){
                const row = zoomStmt.getAsObject();
                console.log(`  Zoom ${row.zoom_level}: ${row.count} tiles`);
            }
            zoomStmt.free();
            const minZoomStmt = db.prepare("SELECT MIN(zoom_level) as min_zoom, MAX(zoom_level) as max_zoom FROM tiles");
            minZoomStmt.step();
            const zoomRange = minZoomStmt.getAsObject();
            minZoomStmt.free();
            console.log(`Zoom range: ${zoomRange.min_zoom} - ${zoomRange.max_zoom}`);
            if (mapRef.current) {
                console.log(`Current map zoom: ${mapRef.current.getZoom()}`);
                console.log(`Map zoom limits: ${mapRef.current.getMinZoom()} - ${mapRef.current.getMaxZoom()}`);
                console.log(`Current map bounds:`, mapRef.current.getBounds());
            }
            console.log("Current soldiers:", soldiers.length);
            console.log("Trails data:", Object.keys(trailsData).length, "soldiers have trails");
            Object.entries(trailsData).forEach(([id, coords])=>{
                console.log(`Soldier ${id}: ${coords.length} GPS points`);
            });
            console.log("=== Distance Debug Info ===");
            const commandCenter = soldiers.find((soldier)=>soldier && soldier.soldier_id === "1" && soldier.gps && typeof soldier.gps.latitude === "number" && typeof soldier.gps.longitude === "number");
            if (commandCenter) {
                console.log(`Command Center (Soldier 1): Lat ${commandCenter.gps.latitude}, Lng ${commandCenter.gps.longitude}`);
                soldiers.forEach((soldier)=>{
                    if (soldier && soldier.soldier_id && typeof soldier.soldier_id === "string" && soldier.soldier_id !== "1" && soldier.gps && typeof soldier.gps.latitude === "number" && typeof soldier.gps.longitude === "number") {
                        const distance = calculateDistance(commandCenter.gps.latitude, commandCenter.gps.longitude, soldier.gps.latitude, soldier.gps.longitude);
                        console.log(`Distance to Soldier ${soldier.soldier_id}: ${Math.round(distance)} meters`);
                    }
                });
            }
            console.log("=== Out of Bounds Debug Info ===");
            console.log("Map metadata bounds:", mapMetadataBounds);
            console.log("Out of bounds soldiers:", Object.keys(outOfBoundsSoldiers));
            Object.entries(outOfBoundsSoldiers).forEach(([id, data])=>{
                console.log(`Soldier ${id} out of bounds: Lat ${data.originalLat}, Lng ${data.originalLng}`);
            });
            console.log("=== Path Tracking Status ===");
            console.log("Path tracking enabled:", showPathTracking);
            console.log("Current trails in trailsRef:", Object.keys(trailsRef.current));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            height: "100%",
            width: "100%"
        },
        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
            [
                "82e4888967881265",
                [
                    showPathTracking ? "#4CAF50" : "#f44336",
                    showPathTracking ? "#2E7D32" : "#c62828",
                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                    showPathTracking ? "#4CAF50" : "#f44336",
                    showPathTracking ? "#4CAF50" : "#f44336",
                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                ]
            ]
        ]) + " " + "map-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "82e4888967881265",
                dynamic: [
                    showPathTracking ? "#4CAF50" : "#f44336",
                    showPathTracking ? "#2E7D32" : "#c62828",
                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                    showPathTracking ? "#4CAF50" : "#f44336",
                    showPathTracking ? "#4CAF50" : "#f44336",
                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                ],
                children: `.scifi-panel.__jsx-style-dynamic-selector{z-index:1000;backdrop-filter:blur(10px);background:linear-gradient(135deg,#001428f2 0%,#002850f2 100%);border:2px solid #0ff;border-radius:12px;min-width:400px;padding:24px;animation:2s ease-in-out infinite alternate glow;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);box-shadow:0 0 20px #00ffff4d,inset 0 0 20px #00ffff1a}@keyframes glow{0%{box-shadow:0 0 20px #00ffff4d,inset 0 0 20px #00ffff1a}to{box-shadow:0 0 30px #00ffff80,inset 0 0 30px #0ff3}}@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}.scifi-title.__jsx-style-dynamic-selector{color:#0ff;text-align:center;text-shadow:0 0 10px #0ffc;letter-spacing:2px;margin-bottom:20px;font-family:Courier New,monospace;font-size:18px;font-weight:700}.scifi-input-group.__jsx-style-dynamic-selector{margin-bottom:16px}.scifi-label.__jsx-style-dynamic-selector{color:#66fcf1;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;font-family:Courier New,monospace;font-size:12px;display:block}.scifi-input.__jsx-style-dynamic-selector{color:#66fcf1;box-sizing:border-box;background:#001428cc;border:1px solid #0ff;border-radius:6px;outline:none;width:100%;padding:10px 12px;font-family:Courier New,monospace;font-size:14px;transition:all .3s}.scifi-input.__jsx-style-dynamic-selector:focus{border-color:#66fcf1;box-shadow:0 0 10px #66fcf14d}.scifi-input.__jsx-style-dynamic-selector::placeholder{color:#66fcf180}.scifi-button.__jsx-style-dynamic-selector{color:#012;text-transform:uppercase;letter-spacing:1px;cursor:pointer;background:linear-gradient(135deg,#0ff 0%,#0080ff 100%);border:none;border-radius:6px;width:100%;margin-bottom:8px;padding:10px 20px;font-family:Courier New,monospace;font-size:12px;font-weight:700;transition:all .3s}.scifi-button.__jsx-style-dynamic-selector:hover{background:linear-gradient(135deg,#66fcf1 0%,#0af 100%);transform:translateY(-1px);box-shadow:0 0 15px #00ffff80}.scifi-button.__jsx-style-dynamic-selector:active{transform:translateY(0)}.scifi-file-input.__jsx-style-dynamic-selector{color:#66fcf1;cursor:pointer;text-align:center;background:#001428cc;border:1px dashed #0ff;border-radius:6px;padding:12px;font-family:Courier New,monospace;font-size:12px;transition:all .3s;position:relative;overflow:hidden}.scifi-file-input.__jsx-style-dynamic-selector:hover{background:#002850cc;border-color:#66fcf1}.scifi-file-input.__jsx-style-dynamic-selector input[type=file].__jsx-style-dynamic-selector{opacity:0;cursor:pointer;width:100%;height:100%;position:absolute;top:0;left:0}.loader-panel.__jsx-style-dynamic-selector{z-index:1000;color:#66fcf1;background:#001428f2;border:1px solid #0ff;border-radius:8px;padding:12px 20px;font-family:Courier New,monospace;font-size:14px;position:absolute;top:20px;left:50%;transform:translate(-50%);box-shadow:0 0 15px #00ffff4d}.progress-bar.__jsx-style-dynamic-selector{background:#001428cc;border:1px solid #0ff;border-radius:4px;width:100%;height:8px;margin-top:8px;overflow:hidden}.progress-fill.__jsx-style-dynamic-selector{background:linear-gradient(90deg,#0ff,#66fcf1);height:100%;transition:width .3s}.status-panel.__jsx-style-dynamic-selector{z-index:1000;color:#66fcf1;background:#001428f2;border:1px solid #66fcf1;border-radius:8px;max-width:200px;padding:12px;font-family:Courier New,monospace;font-size:11px;position:absolute;top:10px;right:10px;box-shadow:0 0 10px #66fcf133}.status-title.__jsx-style-dynamic-selector{color:#0ff;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;font-weight:700}.soldier-item.__jsx-style-dynamic-selector{align-items:center;gap:6px;margin-bottom:4px;display:flex}.soldier-dot.__jsx-style-dynamic-selector{border:1px solid #0ff;border-radius:50%;flex-shrink:0;width:10px;height:10px}.out-of-bounds-indicator.__jsx-style-dynamic-selector{color:#f44;margin-left:4px;font-size:9px;font-weight:700;animation:1s ease-in-out infinite pulse}.close-button.__jsx-style-dynamic-selector{color:#f44;cursor:pointer;background:0 0;border:none;justify-content:center;align-items:center;width:24px;height:24px;padding:0;font-family:Courier New,monospace;font-size:20px;transition:all .3s;display:flex;position:absolute;top:8px;right:12px}.close-button.__jsx-style-dynamic-selector:hover{color:#f66;text-shadow:0 0 10px #f44c;transform:scale(1.1)}.toggle-controls.__jsx-style-dynamic-selector{z-index:1000;color:#012;cursor:pointer;background:linear-gradient(135deg,#0ff 0%,#0080ff 100%);border:none;border-radius:50%;justify-content:center;align-items:center;width:48px;height:48px;padding:12px;font-size:16px;transition:all .3s;display:flex;position:absolute;bottom:20px;left:20px;box-shadow:0 0 15px #00ffff4d}.toggle-controls.__jsx-style-dynamic-selector:hover{transform:scale(1.1);box-shadow:0 0 20px #00ffff80}.fullscreen-button.__jsx-style-dynamic-selector{z-index:1000;color:#fff;cursor:pointer;background:linear-gradient(135deg,#ff9800 0%,#ff5722 100%);border:none;border-radius:50%;justify-content:center;align-items:center;width:48px;height:48px;padding:12px;font-size:16px;transition:all .3s;display:flex;position:absolute;top:70px;right:270px;box-shadow:0 0 15px #ff98004d}.fullscreen-button.__jsx-style-dynamic-selector:hover{transform:scale(1.1);box-shadow:0 0 20px #ff980080}.path-tracking-button.__jsx-style-dynamic-selector{z-index:1000;background:linear-gradient(135deg,${showPathTracking ? "#4CAF50" : "#f44336"} 0%,${showPathTracking ? "#2E7D32" : "#c62828"} 100%);color:#fff;cursor:pointer;width:48px;height:48px;box-shadow:0 0 15px ${showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)"};border:none;border-radius:50%;justify-content:center;align-items:center;padding:12px;font-size:16px;transition:all .3s;display:flex;position:absolute;bottom:80px;left:20px}.path-tracking-button.__jsx-style-dynamic-selector:hover{box-shadow:0 0 20px ${showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)"};transform:scale(1.1)}.map-container.__jsx-style-dynamic-selector:fullscreen{background:#000}.map-container.__jsx-style-dynamic-selector:fullscreen .fullscreen-button.__jsx-style-dynamic-selector{background:linear-gradient(135deg,#4caf50 0%,#2e7d32 100%);box-shadow:0 0 15px #4caf504d}.map-container.__jsx-style-dynamic-selector:fullscreen .fullscreen-button.__jsx-style-dynamic-selector:hover{box-shadow:0 0 20px #4caf5080}.offline-indicator.__jsx-style-dynamic-selector{z-index:1000;color:#0ff;text-transform:uppercase;letter-spacing:1px;background:#001428f2;border:1px solid #0ff;border-radius:8px;padding:8px 12px;font-family:Courier New,monospace;font-size:10px;position:absolute;bottom:20px;right:20px;box-shadow:0 0 10px #0ff3}.bounds-info.__jsx-style-dynamic-selector{z-index:1000;color:#ff9800;background:#001428f2;border:1px solid #ff9800;border-radius:8px;max-width:200px;padding:8px 12px;font-family:Courier New,monospace;font-size:9px;position:absolute;bottom:140px;right:20px;box-shadow:0 0 10px #ff980033}.bounds-title.__jsx-style-dynamic-selector{color:#ff9800;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;font-weight:700}.path-tracking-status.__jsx-style-dynamic-selector{z-index:1000;border:1px solid ${showPathTracking ? "#4CAF50" : "#f44336"};color:${showPathTracking ? "#4CAF50" : "#f44336"};text-transform:uppercase;letter-spacing:1px;box-shadow:0 0 10px ${showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"};background:#001428f2;border-radius:8px;padding:8px 12px;font-family:Courier New,monospace;font-size:10px;position:absolute;bottom:140px;left:20px}.out-of-bounds-marker.__jsx-style-dynamic-selector{animation:1s ease-in-out infinite flicker!important}@keyframes flicker{0%,to{opacity:1}50%{opacity:.3}}`
            }, void 0, false, void 0, this),
            loader && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "82e4888967881265",
                        [
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#2E7D32" : "#c62828",
                            showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                            showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                        ]
                    ]
                ]) + " " + "loader-panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            animation: loader.includes("Error") ? "none" : "pulse 1.5s ease-in-out infinite"
                        },
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]),
                        children: loader
                    }, void 0, false, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1462,
                        columnNumber: 11
                    }, this),
                    progress > 0 && progress < 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]) + " " + "progress-bar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: `${progress}%`
                            },
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                [
                                    "82e4888967881265",
                                    [
                                        showPathTracking ? "#4CAF50" : "#f44336",
                                        showPathTracking ? "#2E7D32" : "#c62828",
                                        showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                        showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                        showPathTracking ? "#4CAF50" : "#f44336",
                                        showPathTracking ? "#4CAF50" : "#f44336",
                                        showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                    ]
                                ]
                            ]) + " " + "progress-fill"
                        }, void 0, false, {
                            fileName: "[project]/components/MapSection.js",
                            lineNumber: 1473,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1472,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapSection.js",
                lineNumber: 1461,
                columnNumber: 9
            }, this),
            showControls && !mapLoaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "82e4888967881265",
                        [
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#2E7D32" : "#c62828",
                            showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                            showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                        ]
                    ]
                ]) + " " + "scifi-panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowControls(false),
                        title: "Close Panel",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]) + " " + "close-button",
                        children: "×"
                    }, void 0, false, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1484,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]) + " " + "scifi-title",
                        children: "SELECT MAP"
                    }, void 0, false, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1492,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]) + " " + "scifi-input-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                    [
                                        "82e4888967881265",
                                        [
                                            showPathTracking ? "#4CAF50" : "#f44336",
                                            showPathTracking ? "#2E7D32" : "#c62828",
                                            showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                            showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                            showPathTracking ? "#4CAF50" : "#f44336",
                                            showPathTracking ? "#4CAF50" : "#f44336",
                                            showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                        ]
                                    ]
                                ]) + " " + "scifi-label",
                                children: "Map File Path"
                            }, void 0, false, {
                                fileName: "[project]/components/MapSection.js",
                                lineNumber: 1495,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "filepath",
                                placeholder: "Enter path to .mbtiles file",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                    [
                                        "82e4888967881265",
                                        [
                                            showPathTracking ? "#4CAF50" : "#f44336",
                                            showPathTracking ? "#2E7D32" : "#c62828",
                                            showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                            showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                            showPathTracking ? "#4CAF50" : "#f44336",
                                            showPathTracking ? "#4CAF50" : "#f44336",
                                            showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                        ]
                                    ]
                                ]) + " " + "scifi-input"
                            }, void 0, false, {
                                fileName: "[project]/components/MapSection.js",
                                lineNumber: 1496,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1494,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onPath,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]) + " " + "scifi-button",
                        children: "Load From Path"
                    }, void 0, false, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1503,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]) + " " + "scifi-input-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                    [
                                        "82e4888967881265",
                                        [
                                            showPathTracking ? "#4CAF50" : "#f44336",
                                            showPathTracking ? "#2E7D32" : "#c62828",
                                            showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                            showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                            showPathTracking ? "#4CAF50" : "#f44336",
                                            showPathTracking ? "#4CAF50" : "#f44336",
                                            showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                        ]
                                    ]
                                ]) + " " + "scifi-label",
                                children: "Upload Map File"
                            }, void 0, false, {
                                fileName: "[project]/components/MapSection.js",
                                lineNumber: 1508,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                    [
                                        "82e4888967881265",
                                        [
                                            showPathTracking ? "#4CAF50" : "#f44336",
                                            showPathTracking ? "#2E7D32" : "#c62828",
                                            showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                            showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                            showPathTracking ? "#4CAF50" : "#f44336",
                                            showPathTracking ? "#4CAF50" : "#f44336",
                                            showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                        ]
                                    ]
                                ]) + " " + "scifi-file-input",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: ".mbtiles",
                                        onChange: onFile,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                            [
                                                "82e4888967881265",
                                                [
                                                    showPathTracking ? "#4CAF50" : "#f44336",
                                                    showPathTracking ? "#2E7D32" : "#c62828",
                                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                                    showPathTracking ? "#4CAF50" : "#f44336",
                                                    showPathTracking ? "#4CAF50" : "#f44336",
                                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                                ]
                                            ]
                                        ])
                                    }, void 0, false, {
                                        fileName: "[project]/components/MapSection.js",
                                        lineNumber: 1510,
                                        columnNumber: 15
                                    }, this),
                                    "Select .mbtiles file from device"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/MapSection.js",
                                lineNumber: 1509,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1507,
                        columnNumber: 11
                    }, this),
                    mapBounds && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onFitBounds,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]) + " " + "scifi-button",
                        children: "Fit to Map Bounds"
                    }, void 0, false, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1516,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onDebugTiles,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]) + " " + "scifi-button",
                        children: "Debug Tiles"
                    }, void 0, false, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1521,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapSection.js",
                lineNumber: 1483,
                columnNumber: 9
            }, this),
            !showControls && !mapLoaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setShowControls(true),
                title: "Open Map Controls",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "82e4888967881265",
                        [
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#2E7D32" : "#c62828",
                            showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                            showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                        ]
                    ]
                ]) + " " + "toggle-controls",
                children: "⚙"
            }, void 0, false, {
                fileName: "[project]/components/MapSection.js",
                lineNumber: 1528,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleFullscreen,
                title: isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "82e4888967881265",
                        [
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#2E7D32" : "#c62828",
                            showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                            showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                        ]
                    ]
                ]) + " " + "fullscreen-button",
                children: isFullscreen ? "⬜" : "⛶"
            }, void 0, false, {
                fileName: "[project]/components/MapSection.js",
                lineNumber: 1537,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: togglePathTracking,
                title: showPathTracking ? "Disable Path Tracking & Distance" : "Enable Path Tracking & Distance",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "82e4888967881265",
                        [
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#2E7D32" : "#c62828",
                            showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                            showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                        ]
                    ]
                ]) + " " + "path-tracking-button",
                children: showPathTracking ? "🛤" : "📍"
            }, void 0, false, {
                fileName: "[project]/components/MapSection.js",
                lineNumber: 1545,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "82e4888967881265",
                        [
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#2E7D32" : "#c62828",
                            showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                            showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                        ]
                    ]
                ]) + " " + "path-tracking-status",
                children: [
                    "Path Tracking: ",
                    showPathTracking ? "ON" : "OFF"
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapSection.js",
                lineNumber: 1557,
                columnNumber: 7
            }, this),
            soldiers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "82e4888967881265",
                        [
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#2E7D32" : "#c62828",
                            showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                            showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                        ]
                    ]
                ]) + " " + "status-panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]) + " " + "status-title",
                        children: [
                            "Active Units: ",
                            soldiers.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1563,
                        columnNumber: 11
                    }, this),
                    Object.entries(colorMap).map(([id, color])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                [
                                    "82e4888967881265",
                                    [
                                        showPathTracking ? "#4CAF50" : "#f44336",
                                        showPathTracking ? "#2E7D32" : "#c62828",
                                        showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                        showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                        showPathTracking ? "#4CAF50" : "#f44336",
                                        showPathTracking ? "#4CAF50" : "#f44336",
                                        showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                    ]
                                ]
                            ]) + " " + "soldier-item",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        backgroundColor: color,
                                        border: outOfBoundsSoldiers[id] ? "2px solid #ff0000" : "1px solid #00ffff"
                                    },
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                        [
                                            "82e4888967881265",
                                            [
                                                showPathTracking ? "#4CAF50" : "#f44336",
                                                showPathTracking ? "#2E7D32" : "#c62828",
                                                showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                                showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                                showPathTracking ? "#4CAF50" : "#f44336",
                                                showPathTracking ? "#4CAF50" : "#f44336",
                                                showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                            ]
                                        ]
                                    ]) + " " + "soldier-dot"
                                }, void 0, false, {
                                    fileName: "[project]/components/MapSection.js",
                                    lineNumber: 1566,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                        [
                                            "82e4888967881265",
                                            [
                                                showPathTracking ? "#4CAF50" : "#f44336",
                                                showPathTracking ? "#2E7D32" : "#c62828",
                                                showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                                showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                                showPathTracking ? "#4CAF50" : "#f44336",
                                                showPathTracking ? "#4CAF50" : "#f44336",
                                                showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                            ]
                                        ]
                                    ]),
                                    children: id
                                }, void 0, false, {
                                    fileName: "[project]/components/MapSection.js",
                                    lineNumber: 1575,
                                    columnNumber: 15
                                }, this),
                                outOfBoundsSoldiers[id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                        [
                                            "82e4888967881265",
                                            [
                                                showPathTracking ? "#4CAF50" : "#f44336",
                                                showPathTracking ? "#2E7D32" : "#c62828",
                                                showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                                showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                                showPathTracking ? "#4CAF50" : "#f44336",
                                                showPathTracking ? "#4CAF50" : "#f44336",
                                                showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                            ]
                                        ]
                                    ]) + " " + "out-of-bounds-indicator",
                                    children: "OUT"
                                }, void 0, false, {
                                    fileName: "[project]/components/MapSection.js",
                                    lineNumber: 1577,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "#888",
                                        fontSize: "10px"
                                    },
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                                        [
                                            "82e4888967881265",
                                            [
                                                showPathTracking ? "#4CAF50" : "#f44336",
                                                showPathTracking ? "#2E7D32" : "#c62828",
                                                showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                                showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                                showPathTracking ? "#4CAF50" : "#f44336",
                                                showPathTracking ? "#4CAF50" : "#f44336",
                                                showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                            ]
                                        ]
                                    ]),
                                    children: [
                                        "(",
                                        trailsData[id]?.length || 0,
                                        " pts)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/MapSection.js",
                                    lineNumber: 1579,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, id, true, {
                            fileName: "[project]/components/MapSection.js",
                            lineNumber: 1565,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapSection.js",
                lineNumber: 1562,
                columnNumber: 9
            }, this),
            mapMetadataBounds && Object.keys(outOfBoundsSoldiers).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "82e4888967881265",
                        [
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#2E7D32" : "#c62828",
                            showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                            showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                        ]
                    ]
                ]) + " " + "bounds-info",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]) + " " + "bounds-title",
                        children: "Map Bounds"
                    }, void 0, false, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1589,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]),
                        children: [
                            "N: ",
                            mapMetadataBounds.north.toFixed(6)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1590,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]),
                        children: [
                            "S: ",
                            mapMetadataBounds.south.toFixed(6)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1591,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]),
                        children: [
                            "E: ",
                            mapMetadataBounds.east.toFixed(6)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1592,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]),
                        children: [
                            "W: ",
                            mapMetadataBounds.west.toFixed(6)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1593,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: "#ff4444",
                            marginTop: "4px",
                            fontWeight: "bold"
                        },
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "82e4888967881265",
                                [
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#2E7D32" : "#c62828",
                                    showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                                    showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "#4CAF50" : "#f44336",
                                    showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                                ]
                            ]
                        ]),
                        children: [
                            Object.keys(outOfBoundsSoldiers).length,
                            " OUT OF BOUNDS"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MapSection.js",
                        lineNumber: 1594,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/MapSection.js",
                lineNumber: 1588,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "mapid",
                style: {
                    height: "100%",
                    width: "100%",
                    border: "1px solid #66fcf1",
                    borderRadius: 8,
                    background: "#0a0a0a"
                },
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "82e4888967881265",
                        [
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#2E7D32" : "#c62828",
                            showPathTracking ? "rgba(76, 175, 80, 0.3)" : "rgba(244, 67, 54, 0.3)",
                            showPathTracking ? "rgba(76, 175, 80, 0.5)" : "rgba(244, 67, 54, 0.5)",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "#4CAF50" : "#f44336",
                            showPathTracking ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)"
                        ]
                    ]
                ])
            }, void 0, false, {
                fileName: "[project]/components/MapSection.js",
                lineNumber: 1602,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/MapSection.js",
        lineNumber: 1030,
        columnNumber: 5
    }, this);
}
_s(MapSection, "u6MnUTIFMxwLKRXgZIp4jVsZrnY=");
_c = MapSection;
var _c;
__turbopack_context__.k.register(_c, "MapSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/MapSection.js [client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/components/MapSection.js [client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=components_MapSection_3b1c3e0a.js.map