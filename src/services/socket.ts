import { io, type Socket } from "socket.io-client";

// ---------------------------------------------------------------------------
// Socket.io Client Configuration
// ---------------------------------------------------------------------------

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000";

let socket: Socket | null = null;

/**
 * Get or create a Socket.io client connection.
 * Uses a singleton pattern to prevent multiple connections.
 */
export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 10000,
      timeout: 20000,
      transports: ["websocket", "polling"],
    });
  }

  return socket;
}

/**
 * Connect to the socket server with optional auth token.
 */
export function connectSocket(token?: string): Socket {
  const s = getSocket();

  if (token) {
    s.auth = { token };
  }

  if (!s.connected) {
    s.connect();
  }

  return s;
}

/**
 * Disconnect from the socket server and clean up.
 */
export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

/**
 * Check if the socket is currently connected.
 */
export function isSocketConnected(): boolean {
  return socket?.connected ?? false;
}
