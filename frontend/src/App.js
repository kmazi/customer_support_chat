import './App.css';
import Home from './components/Home';
import AgentRoom from './components/agent/AgentRoom';
import CustomerRoom from './components/customer/CustomerRoom';
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="agent/room" element={<AgentRoom />} />
        <Route path="customer/room" element={<CustomerRoom />} />
      </Routes>
    </div>
  );
}

export default App;
