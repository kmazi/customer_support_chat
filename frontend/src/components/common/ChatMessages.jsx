import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ChatMessages = (props) => {
    const [messages, setMessages] = useState([]);

    const convId = props.convId;
    const userId = props.userId;
    const role = props.role;

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

        let timer = setInterval(loadMessages, 5000);
        return (() => {
            clearInterval(timer);
            timer = null;
        });
    }, [convId]);

    return (
        <div style={{ paddingBottom: '10px', minHeight: '450px' }}>
            <ul>
                {
                    messages.map(message => (
                        <li style={{ margin: '0 4px 5px', background: message.agentId === null? '#c5d6fc' : '#cfe8ff', padding: '2px 5px 5px' }} key={message.id}>
                            <div>
                                <p style={{ padding: '0 5px 5px' }}>{message.body}</p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ChatMessages;