import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ChatMessages = (props) => {
    const [messages, setMessages] = useState([]);

    const userId = localStorage.getItem('chatUserId');
    const convId = localStorage.getItem('chatConvId');
    const agentId = props.agentId;

    

    useEffect(() => {
        const loadMessages = async () => {
            let urlPath = '';
            const baseUrl = 'http://0.0.0.0:3001';
            let url = '';
            if (localStorage.getItem('chatUserRole') === 'customer') {
                urlPath = `message/customer/${userId}`;
            } else {
                urlPath = `message/conversation/${convId}`;
            }
            url = `${baseUrl}/${urlPath}`;

            const res = await fetch(url);
            if (res.status === 200) {
                const data = await res.json();
                console.log(data);
                setMessages(data);
            }
        };

        loadMessages();
    }, [userId, agentId]);

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