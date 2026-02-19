import { useContext } from 'react';
import { AlertContext } from '../components/AlertProvider';

export const useAlert = () => {
  const alert = useContext(AlertContext);
  if (!alert) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return alert;
};
