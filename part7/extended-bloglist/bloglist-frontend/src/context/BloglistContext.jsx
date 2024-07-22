import { createContext, useReducer, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import notificationReducer from './../reducers/notificationReducer';
import authReducer from './../reducers/authReducer';

const queryClient = new QueryClient();

const BloglistContext = createContext();

export const BloglistContextProvider = (props) => {

  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    {}
  );

  const [user, userDispatch] = useReducer(
    authReducer,
    null
  );

  return (
      <QueryClientProvider client={queryClient}>
        <BloglistContext.Provider value={[notification, notificationDispatch, user, userDispatch]}>
          {props.children}
        </BloglistContext.Provider>
      </QueryClientProvider>
  );

};

export const useNotificationValue = () => {
  const stateAndDispatch = useContext(BloglistContext);
  return stateAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const stateAndDispatch = useContext(BloglistContext);
  return stateAndDispatch[1];
};

export const useUserValue = () => {
  const stateAndDispatch = useContext(BloglistContext);
  return stateAndDispatch[2];
};

export const useUserDispatch = () => {
  const stateAndDispatch = useContext(BloglistContext);
  return stateAndDispatch[3];
};

export default BloglistContext;
