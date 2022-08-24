import React from "react";
import { useState, useEffect } from "react";

const ChatMessages = ({ convId, userId, role, newMessage }) => {
    const [messages, setMessages] = useState([]);

    let margin1, margin2, bg1, bg2, float1, float2 = null;

    switch (role) {
        case 'customer':
            margin1 = '0 5px 5px 94px';
            margin2 = '0 94px 5px 5px';
            float1 = 'right';
            float2 = 'left';
            bg1 = '#c5d6fc';
            bg2 = '#cfe8ff';
            break;
        case 'agent':
            margin1 = '0 94px 5px 5px';
            margin2 = '0 5px 5px 94px';
            float2 = 'right';
            float1 = 'left';
            bg2 = '#c5d6fc';
            bg1 = '#cfe8ff';
        default:
            break;
    }

    useEffect(() => {
        const loadMessages = async () => {
            let urlPath = '';
            const baseUrl = 'http://0.0.0.0:3001';
            let url = '';
            if (role === 'customer') {
                urlPath = `message/customer/${userId}`;
            } else {
                urlPath = `message/conversation/${convId}`;
            }
            url = `${baseUrl}/${urlPath}`;

            const res = await fetch(url);
            if (res.status === 200) {
                const data = await res.json();
                setMessages(data);
            }
        };
        loadMessages();
    }, []);

    useEffect(() => {
        if(Object.keys(newMessage).length > 0) {
            setMessages(m => [...m, newMessage]);
        } 
    }, [newMessage]);

    return (
        <div style={{ paddingBottom: '10px', minHeight: '450px' }}>

            {
                messages.map(message => (

                    <div key={message.id}>
                        <p style={{ margin: message.agentId === null ? margin1 : margin2, display: 'inline-block', 
                            float: message.agentId === null ? float1 : float2, clear: 'both', 
                            background: message.agentId === null ? bg1 : bg2, padding: '12px 5px' }}>{message.body}</p>
                    </div>

                ))
            }
        </div>
    );
};

export default ChatMessages;