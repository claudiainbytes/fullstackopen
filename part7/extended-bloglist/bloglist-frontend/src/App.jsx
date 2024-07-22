import { useRef } from 'react';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import Togglable from './components/Togglable';
import { useNotificationValue } from './context/BloglistContext';
import { useUserValue } from './context/BloglistContext';

const App = () => {

  const notification = useNotificationValue();
  const user = useUserValue();

  const blogFormRef = useRef();

  return (
    <div>
      <h1>Blogs App</h1>
      <Notification notification={notification} />
      {user === null && (
        <LoginForm />
      )}
      {user !== null && <LogoutForm />}
      { user !== null && (
        <Togglable buttonLabel="Create blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef}/>
        </Togglable>
      )}
      {user !== null && (
        <BlogList user={user} />
      )}
    </div>
  );
};

export default App;
