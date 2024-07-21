import { createContext, useReducer, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import notificationReducer from './../reducers/notificationReducer';

const queryClient = new QueryClient();

const BloglistContext = createContext();

export const BloglistContextProvider = (props) => {

  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    {}
  );

  return (
      <QueryClientProvider client={queryClient}>
        <BloglistContext.Provider value={[notification, notificationDispatch]}>
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

export default BloglistContext;
