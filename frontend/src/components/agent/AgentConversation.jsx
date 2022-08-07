import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AgentConversation = () => {
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const agentId = JSON.parse(localStorage.getItem('chatAgentId'));
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
        localStorage.setItem('chatConvId', btn.name);
        localStorage.setItem('chatUserId', btn.id)
        navigate('/user/chats');
    };

    return (
        <div className='bgColor' style={{ flexDirection: 'column', width: '50%', padding: '10px', margin: '0 auto' }}>
            <h3>Agent's Conversations</h3>
            {
                conversations.map((conversation) => (
                    <div key={conversation.id}>
                        <p>{conversation.subject}</p>
                        <button id={conversation.customerId} name={conversation.id} onClick={ startConversation }>reply</button>
                        <label style={{ float: 'right' }} htmlFor="">{new Date(conversation.createdAt).getMinutes()} mins</label>
                    </div>
                ))
            }
        </div>
    );
};

export default AgentConversation;