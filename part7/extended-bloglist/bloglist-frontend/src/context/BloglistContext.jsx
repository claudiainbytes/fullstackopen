import { createContext, useReducer, useContext } from 'react';
import notificationReducer from './../reducers/notificationReducer';

const BloglistContext = createContext();

export const BloglistContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    {}
  );

  return (
    <BloglistContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </BloglistContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(BloglistContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(BloglistContext);
  return notificationAndDispatch[1];
};

export default BloglistContext;
