import Sidebar from './Sidebar';
import '../styles/layout.css';

export default function DashboardLayout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        {children}
      </main>
    </div>
  );
}
