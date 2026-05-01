import WebSocket, { WebSocketServer } from 'ws';
import {DB_Connection} from "./prisma";

const connection = DB_Connection.getInstance().getClient();
const wss = new WebSocketServer({port: 8080});

interface Message {
    authorId: number;
    content: string;
}

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', async (data: WebSocket.Data) => {
        const message: Message = JSON.parse(data.toString());

        // Save the message to the database
        const newMessage = await connection.message.create({
            data: {
                content: message.content,
                authorId: message.authorId,
            }
        });


        // Broadcast the message to the recipient
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN)
            {
                (client as any).userId === message.authorId &&
                client.send(JSON.stringify(newMessage));
            }
        });
    });

    // Manage user sessions here (e.g., user login)
    ws.on('close', () => {
        // Handle user disconnect
    });
});