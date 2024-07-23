import { useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import Togglable from './components/Togglable';
import Users from './components/Users';
import { useNotificationValue } from './context/BloglistContext';
import { useUserValue } from './context/BloglistContext';

const App = () => {

  const notification = useNotificationValue();
  const user = useUserValue();

  const blogFormRef = useRef();

  const padding = {
    padding: 5
  }

  return (
    <Router>
      {user !== null && (
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
      )}
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
          <Routes>
            <Route path="/" element={<BlogList user={user} />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
