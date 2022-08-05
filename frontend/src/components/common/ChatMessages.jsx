import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ChatMessages = (props) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const loadMessages = async () => {
            let urlPath = '';
            const baseUrl = 'http://0.0.0.0:3001/';
            let url = '';
            if (props.userId && props.agentId === null) {
                urlPath = `message/sustomer/${props.userId}`;
            } else {
                urlPath = `message/conversation/${props.convId | 6}`;
            }
            url = `http://0.0.0.0:3001/${urlPath}`;
    
            const res = await fetch(url);
            if (res.status === 200) {
                const data = await res.json();
                console.log(data);
                setMessages(data);
            }
        };
        loadMessages();
    }, []);

    return (
        <div style={{ paddingBottom: '10px', minHeight: '450px' }}>
            <ul>
                {
                    messages.map(message => (
                        <li key={message.id}>
                            <div>
                                <p>{message.body}</p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ChatMessages;