import { useEffect, useRef } from 'react';

interface Message {
    authorId: number;
    content: string;
}

const useWebSocket = (onMessage: (message: Message) => void) => {
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:8080');

        socketRef.current.onmessage = (event: MessageEvent) => {
            const message: Message = JSON.parse(event.data);
            onMessage(message);
        };

        return () => {
            socketRef.current?.close();
        };
    }, [onMessage]);

    const sendMessage = (message: Message) => {
        if (socketRef.current) {
            socketRef.current.send(JSON.stringify(message));
        }
    };

    return sendMessage;
};

export default useWebSocket;
