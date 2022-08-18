import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ChatMessages = (props) => {
    const [messages, setMessages] = useState([]);

    const convId = props.convId;
    const userId = props.userId;
    const role = props.role;
    let margin1, margin2, bg1, bg2 = null;

    switch (role) {
        case 'customer':
            margin1 = '0 5px 5px 94px';
            margin2 = '0 94px 5px 5px';
            bg1 = '#c5d6fc';
            bg2 = '#cfe8ff';
            break;
        case 'agent':
            margin1 = '0 94px 5px 5px';
            margin2 = '0 5px 5px 94px';
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
    });

    return (
        <div style={{ paddingBottom: '10px', minHeight: '450px' }}>

            {
                messages.map(message => (

                    <div style={{ margin: message.agentId === null ? margin1 : margin2, background: message.agentId === null ? bg1 : bg2, padding: '2px 5px' }} key={message.id}>
                        <p style={{ padding: '0 5px 5px' }}>{message.body}</p>
                    </div>

                ))
            }
        </div>
    );
};

export default ChatMessages;