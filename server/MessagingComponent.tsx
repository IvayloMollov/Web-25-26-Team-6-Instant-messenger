import { useState } from 'react';
import useWebSocket from "./useWebSocket";

const MessagingComponent: React.FC = () => {
    const [messages, setMessages] = useState<Array<{ id: number; content: string; authorId: number }>>([]);
    const [input, setInput] = useState<string>('');
    const sendMessage
        = useWebSocket((message) => setMessages((prev) => [...prev, { id: Date.now(), ...message }]));

    const handleSend = () => {
        const newMessage = { authorId: 1, content: input }; // Replace with actual IDs
        sendMessage(newMessage);
        setInput('');
    };

    return (
        <div>
            <div>
                {messages.map((msg) => (
                    <div key={msg.id}>
                        {msg.content} (from {msg.authorId})
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default MessagingComponent;
