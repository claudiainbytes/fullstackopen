import { createContext, useReducer, ReactNode } from 'react';

import { notificationReducer } from '../reducers/notificationReducer';

import { FlightdiariesContextType, notificationInitialState } from '../types';

const FlightdiariesContext = createContext< FlightdiariesContextType | null >(null);

export const FlightdiariesContextProvider = ( {children} : {children: ReactNode} )  => {

    const [notification, notificationDispatch] = useReducer(notificationReducer, notificationInitialState);

    return (
        <FlightdiariesContext.Provider value={{ notification, notificationDispatch} }>
          { children }
        </FlightdiariesContext.Provider>
    );
};

export default FlightdiariesContext;
