import { Routes, Route } from "react-router-dom";
import AgentRoom from "./components/agent/AgentRoom";
import UserChatRoom from "./components/agent/user/UserChatRoom";
import Home from "./components/Home";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/chats" element={<UserChatRoom />} />
        <Route path="/conversations/incoming" element={<AgentRoom />} />
      </Routes>
  );
}

export default App;
