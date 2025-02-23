import io from 'socket.io-client';
const SOCKET_SERVER_URL = import.meta.env.VITE_PROXY_URL || "http://localhost:3000";

class SocketService {
    constructor() {
        this.socket = null;
    }

    connect() {
        if(!this.socket) {
            this.socket = io(SOCKET_SERVER_URL);

            this.socket.on("connect", () => {
                console.log("Connected to WebSocket server");
            });

            this.socket.on("disconnect", () => {
                console.log("Disconnected from WebSocket server");
            });
        }
    }

    disconnect() {
        if(this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export default new SocketService();


