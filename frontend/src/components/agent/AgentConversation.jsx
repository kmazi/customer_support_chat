import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AgentConversation = () => {
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const agentId = location.state.chatAgentId;
    const role = location.state.chatUserRole;

    useEffect(() => {        
        const loadAgentConversations = async () => {
            const conv = await fetch(`http://0.0.0.0:3001/conversation/agent/${agentId}?closed=false`);
            const res = await conv.json();
            if (conv.status === 200) {
                setConversations(res);
            }
            
        };

        loadAgentConversations()
    });

    const startConversation = (e) => {
        const btn = e.currentTarget;
        navigate('/user/chats', {state: {
            chatConvId: JSON.parse(btn.name),
            chatUserId: JSON.parse(btn.id),
            chatAgentId: agentId,
            chatUserRole: role
        }});
    };

    const closeConversation = async (e) => {
        const btn = e.currentTarget;
        const convId = JSON.parse(btn.name);

        const update = await fetch(`http://0.0.0.0:3001/conversation/${convId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ closed: true }, null, 2)
        });

        if (update.status === 200) {
            const updatedConversation = conversations.filter(conv => conv.id !== convId);
            setConversations(updatedConversation);
        } else {
            alert('An error occurred while closing the conversation.');
        }
    };

    return (
        <div className='bgColor' style={{ flexDirection: 'column', width: '50%', padding: '10px', margin: '0 auto' }}>
            <h3>Agent's Conversations</h3>
            {
                conversations.map((conversation) => (
                    <div style={{ margin: '0 4px 5px', background: '#c5d6fc', margin: '0 0 8px', padding: '2px 5px 10px' }} key={conversation.id}>
                        <p>{conversation.subject}</p>
                        <button style={{ marginRight: '5px'}} id={conversation.customerId} name={conversation.id} onClick={ startConversation }>reply</button>
                        <button style={{ marginLeft: '5px'}} id={conversation.customerId} name={conversation.id} onClick={ closeConversation }>close</button>
                    </div>
                ))
            }
        </div>
    );
};

export default AgentConversation;