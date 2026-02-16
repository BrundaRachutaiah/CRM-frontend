import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ padding: '24px', width: '100%' }}>
        {children}
      </main>
    </div>
  );
}
