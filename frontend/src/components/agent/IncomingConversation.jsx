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
        loadIncomingConversations();
    }, []);

    useEffect(() => {
        const eventSource = new EventSource('http://0.0.0.0:3001/ssevent/conversation/unattended');
        // Sub event listener for attended conversations.
        eventSource.addEventListener('sub', (e) => {
            const data = JSON.parse(e.data);
            console.log('Delete data of id -------------', data.id);
            setConversations((c) => (c.filter(
                v => v.id !== data.id
            )));
        });

        // Add event listner for unattended conversations.
        eventSource.addEventListener('add', (e) => {
            const data = JSON.parse(e.data);
            console.log('Incoming data is -------------', data);
            setConversations((c) => ([...c, data]));
        });

        return () => {
            eventSource.close();
        }
    });

    const joinAgentToConversation = async (e) => {
        const conversationId = e.currentTarget.name;
        const agentId = location.state.chatAgentId;

        const update = await fetch(`http://0.0.0.0:3001/conversation/${conversationId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ agentId }, null, 2)
        });

        if (!(update.status === 200)) {
            alert('An error occurred while joining the conversation.');
        }
    };

    return (
        <div className='bgColor' style={{ flexDirection: 'column', width: '50%', padding: '10px', margin: '0 auto' }}>
            <h3>Incoming Messages</h3>
            {
                conversations.map((conversation, index) => (
                    <div style={{ background: '#c5d6fc', margin: '0 0 8px', padding: '2px 5px 10px' }} key={conversation.id}>
                        <p>{conversation.subject}</p>
                        <button id={index} name={conversation.id} onClick={joinAgentToConversation}>Join conversation</button>
                    </div>
                ))
            }
        </div>
    );
};

export default IncomingConversation;