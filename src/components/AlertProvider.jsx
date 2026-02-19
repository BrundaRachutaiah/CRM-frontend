import { createContext, useCallback, useMemo, useRef, useState } from 'react';

export const AlertContext = createContext(null);

const DEFAULT_TIMEOUT = 4000;

export default function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const counter = useRef(0);

  const removeAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(item => item.id !== id));
  }, []);

  const addAlert = useCallback((type, message) => {
    const id = `${Date.now()}-${counter.current++}`;
    setAlerts(prev => [...prev, { id, type, message }]);
    setTimeout(() => removeAlert(id), DEFAULT_TIMEOUT);
  }, [removeAlert]);

  const api = useMemo(() => ({
    success: (message) => addAlert('success', message),
    error: (message) => addAlert('error', message),
    info: (message) => addAlert('info', message),
  }), [addAlert]);

  return (
    <AlertContext.Provider value={api}>
      {children}
      <div className="alert-stack" aria-live="polite">
        {alerts.map(item => (
          <div key={item.id} className={`alert-item alert-${item.type}`}>
            {item.message}
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
}
