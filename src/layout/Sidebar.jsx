import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Anvaya CRM</h3>
      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/leads" end>Leads</NavLink>
      <NavLink to="/agents" end>Agents</NavLink>
      <NavLink to="/reports" end>Reports</NavLink>
      <NavLink to="/reports/status">Leads by Status</NavLink>
      <NavLink to="/reports/agent">Leads by Agent</NavLink>
      <NavLink to="/settings" end>Settings</NavLink>
    </aside>
  );
}
