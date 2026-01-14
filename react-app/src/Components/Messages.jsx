import { useEffect, useState, useRef } from "react";
import '../App.css';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchMessages = async () => {
        const res = await fetch("/api/Messages/messages");
        if (res.ok) {
            const data = await res.json();
            setMessages(data);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, []);

    const sendMessage = async () => {
    if (!newMessage.trim()) return;

    if (!user || !user.id) {
        alert("Error: You are not logged in or missing ID");
        return;
    }

    try {
        const response = await fetch("/api/Messages/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sender_id: user.id,
                sender_name: user.username,
                content: newMessage
            })
        });

        const responseData = await response.json();
        if (response.ok) {
            setNewMessage("");
            fetchMessages();
        } else {
            console.error("Server error:", responseData.error);
            alert("Server error: " + responseData.error);
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Failed to reach the server.");
    }
};

    return (
        <div className="messages">
            <h2>Messages</h2>
            <div id="messages-div" className="chat-window">
                {messages.map((msg) => (
                    <div key={msg.id} className={`bubble ${msg.sender_id === user.id ? "own" : "other"}`}>
                        <small className="uName">{msg.sender_name}</small>
                        <p>{msg.content}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            
            <div className="input-row">
                <input 
                    placeholder="New message..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()} 
                />
                <button id="Messages-button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Messages;