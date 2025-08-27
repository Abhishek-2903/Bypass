const WS_CONFIG = {
  BASE_URL: 'ws://localhost',
  HTTP_BASE_URL: 'http://localhost',
  RTM_PORTS: { SOLDIER_DATA: 8001, KILL_FEED: 8002, STATS: 8003 },
  AAR_PORTS: { SOLDIER_DATA: 8765, KILL_FEED: 8766, STATS: 8767 },
  API_PORTS: { REPLAY_INIT: 8000 },
  PORTS: { SOLDIER_DATA: 8001, KILL_FEED: 8002, STATS: 8003 }
};

WS_CONFIG.getSoldierWsUrl    = () => `${WS_CONFIG.BASE_URL}:${WS_CONFIG.RTM_PORTS.SOLDIER_DATA}/ws`;
WS_CONFIG.getKillFeedWsUrl   = () => `${WS_CONFIG.BASE_URL}:${WS_CONFIG.RTM_PORTS.KILL_FEED}/ws`;
WS_CONFIG.getStatsWsUrl      = () => `${WS_CONFIG.BASE_URL}:${WS_CONFIG.RTM_PORTS.STATS}/ws`;
WS_CONFIG.getAARSoldierWsUrl = () => `${WS_CONFIG.BASE_URL}:${WS_CONFIG.AAR_PORTS.SOLDIER_DATA}/ws`;
WS_CONFIG.getAARKillFeedWsUrl= () => `${WS_CONFIG.BASE_URL}:${WS_CONFIG.AAR_PORTS.KILL_FEED}/ws`;
WS_CONFIG.getAARStatsWsUrl   = () => `${WS_CONFIG.BASE_URL}:${WS_CONFIG.AAR_PORTS.STATS}/ws`;
WS_CONFIG.getReplayInitUrl   = () => `${WS_CONFIG.HTTP_BASE_URL}:${WS_CONFIG.API_PORTS.REPLAY_INIT}/initialize-replay`;

WS_CONFIG.getAllWebSocketUrls = () => [
  WS_CONFIG.getSoldierWsUrl(),
  WS_CONFIG.getKillFeedWsUrl(),
  WS_CONFIG.getStatsWsUrl(),
  WS_CONFIG.getAARSoldierWsUrl(),
  WS_CONFIG.getAARKillFeedWsUrl(),
  WS_CONFIG.getAARStatsWsUrl()
];
WS_CONFIG.getAllHttpApiUrls = () => [ WS_CONFIG.getReplayInitUrl() ];

module.exports = { WS_CONFIG };

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
console.log('HTTP API URLs:', { replayInit: WS_CONFIG.getReplayInitUrl() });
console.log('All WebSocket URLs for CSP:', WS_CONFIG.getAllWebSocketUrls());
