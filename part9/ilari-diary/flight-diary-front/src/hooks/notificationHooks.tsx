import { useContext } from 'react';
import { NotificationType } from './../types';
import FlightdiariesContext  from '../context/FlightdiaryContext';

export const useNotificationValue = () : NotificationType | unknown => {
    const notificationAndDispatch = useContext(FlightdiariesContext);
    return notificationAndDispatch?.notification;
  };
  
export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(FlightdiariesContext);
    return notificationAndDispatch?.notificationDispatch;
};