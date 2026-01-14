import { useEffect, useState, useRef } from "react";
import '../App.css';

function Messages() {
    const [uzenetek, setUzenetek] = useState([]);
    const [ujUzenet, setUjUzenet] = useState("");
    const messagesEndRef = useRef(null);

    const user = JSON.parse(localStorage.getItem("user"));

    const uzenetekLekerese = async () => {
        const res = await fetch("/api/Messages/messages");
        if (res.ok) {
            const adat = await res.json();
            setUzenetek(adat);
        }
    };

    useEffect(() => {
        uzenetekLekerese();
        const interval = setInterval(uzenetekLekerese, 3000);
        return () => clearInterval(interval);
    }, []);

    const kuldes = async () => {
    if (!ujUzenet.trim()) return;

    if (!user || !user.id) {
        alert("Hiba: Nem vagy bejelentkezve vagy hiányzik az ID!");
        return;
    }

    try {
        const response = await fetch("/api/Messages/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sender_id: user.id,
                sender_name: user.username,
                content: ujUzenet
            })
        });

        const válaszAdat = await response.json();

        if (response.ok) {
            setUjUzenet("");
            uzenetekLekerese();
        } else {
            console.error("Szerver hiba:", válaszAdat.hiba);
            alert("Szerver hiba: " + válaszAdat.hiba);
        }
    } catch (error) {
        console.error("Hálózati hiba:", error);
        alert("Nem sikerült elérni a szervert.");
    }
};

    return (
        <div className="messages">
            <h2>Üzenetek</h2>
            <div id="messages-div" className="chat-window">
                {uzenetek.map((msg) => (
                    <div key={msg.id} className={`bubble ${msg.sender_id === user.id ? "sajat" : "mas"}`}>
                        <small className="nev">{msg.sender_name}</small>
                        <p>{msg.content}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            
            <div className="input-sor">
                <input 
                    placeholder="Új üzenet..." 
                    value={ujUzenet}
                    onChange={(e) => setUjUzenet(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && kuldes()} 
                />
                <button id="Messages-button" onClick={kuldes}>Küldés</button>
            </div>
        </div>
    );
}

export default Messages;