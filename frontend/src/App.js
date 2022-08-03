import { Routes, Route } from "react-router-dom";
import UserChatRoom from "./components/agent/user/UserChatRoom";
import Home from "./components/Home";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/chats" element={<UserChatRoom />} />
        <Route path="/conversations/incoming" element={<Home />} />
        <Route path="/conversations/agent" element={<Home />} />
      </Routes>
  );
}

export default App;
