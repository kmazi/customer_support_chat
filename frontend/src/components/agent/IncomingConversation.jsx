import { useEffect } from "react";
import { useState } from "react";

const IncomingConversation = () => {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const loadIncomingConversations = async () => {
            const conv = await fetch('http://0.0.0.0:3001/conversation?unattended=true');
            const res = await conv.json();
 
            if (conv.status === 200) {
                setConversations(res);
            }
        };

        loadIncomingConversations()
    });

    return (
        <div className='bgColor' style={{ flexDirection: 'column', width: '50%', padding: '10px', margin: '0 auto' }}>
            <h3>Incoming Messages</h3>
            {
                conversations.map((conversation) => (
                    <div key={conversation.id}>
                        <p>{conversation.subject}</p>
                        <button>reply</button>
                        <label style={{ float: 'right' }} htmlFor="">{new Date(conversation.createdAt).getMinutes()} mins</label>
                    </div>
                ))
            }
        </div>
    );
};

export default IncomingConversation;