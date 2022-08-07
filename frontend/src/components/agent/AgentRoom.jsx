import AgentConversation from "./AgentConversation";
import IncomingConversation from "./IncomingConversation";

const AgentRoom = () => {
    return (
        <div style={{ display: 'flex', width: '50%', padding: '10px', margin: '0 auto' }}>
            <IncomingConversation />
            <AgentConversation />
        </div>
    );
};

export default AgentRoom;