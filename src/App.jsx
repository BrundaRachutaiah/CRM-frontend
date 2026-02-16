import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetails from './pages/LeadDetails';
import Agents from './pages/Agents';
import Reports from './pages/Reports';
import AddLead from './pages/AddLead';
import AddAgent from './pages/AddAgent';
import LeadsByStatus from './pages/LeadsByStatus';
import LeadsByAgent from './pages/LeadsByAgent';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/new" element={<AddLead />} />
        <Route path="/leads/:id" element={<LeadDetails />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agents/new" element={<AddAgent />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/status" element={<LeadsByStatus />} />
        <Route path="/reports/agent" element={<LeadsByAgent />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
