import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const IncomingConversation = () => {
    const [conversations, setConversations] = useState([]);

    const location = useLocation();

    useEffect(() => {
        const loadIncomingConversations = async () => {
            const conv = await fetch('http://0.0.0.0:3001/conversation?unattended=true');
            const res = await conv.json();
 
            if (conv.status === 200) {
                setConversations(res);
            }
        };

        let timer = setInterval(loadIncomingConversations, 5000);
        return () => {
            clearInterval(timer);
            timer = null;
        };
    });

    const joinAgentToConversation = async (e) => {
        const conversationId = e.currentTarget.name;
        const agentId = location.state.chatAgentId;

        const update = await fetch(`http://0.0.0.0:3001/conversation/${conversationId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ agentId }, null, 2)
        });

        if (update.status === 200) {
            const updatedConversation = conversations.filter(conv => conv.id !== conversationId);
            setConversations(updatedConversation);
        } else {
            alert('An error occurred while joining the conversation.');
        }
    };

    return (
        <div className='bgColor' style={{ flexDirection: 'column', width: '50%', padding: '10px', margin: '0 auto' }}>
            <h3>Incoming Messages</h3>
            {
                conversations.map((conversation, index) => (
                    <div style={{ margin: '0 4px 5px', background: '#c5d6fc', padding: '0 5px 5px' }} key={conversation.id}>
                        <p>{conversation.subject}</p>
                        <button id={index} name={conversation.id} onClick={joinAgentToConversation}>Join conversation</button>
                    </div>
                ))
            }
        </div>
    );
};

export default IncomingConversation;