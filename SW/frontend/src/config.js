// ============================================================
//  CENTRAL BACKEND CONFIGURATION
//  Change ONLY this file when deploying to a new server.
// ============================================================
const configuredApiUrl = process.env.REACT_APP_API_URL;
const configuredWsUrl = process.env.REACT_APP_WS_URL;

export const API_BASE_URL =
  configuredApiUrl || "http://127.0.0.1:8000";

export const WS_BASE_URL =
  configuredWsUrl || "ws://127.0.0.1:8000";
