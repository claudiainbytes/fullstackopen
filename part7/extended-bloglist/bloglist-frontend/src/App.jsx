import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import Users from './components/Users';
import User from './components/User';
import BlogDetails from './components/BlogDetails';
import Page404 from './components/Page404';
import { useNotificationValue } from './context/BloglistContext';
import { useUserValue } from './context/BloglistContext';

const App = () => {
  const notification = useNotificationValue();
  const user = useUserValue();

  const padding = {
    padding: 5,
  };

  return (
    <Router>
      {user !== null && (
        <nav className="navbar navbar-expand-lg bg-primary">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    users
                  </Link>
                </li>
                <li className="nav-item">
                  <LogoutForm />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      <main className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="py-2 text-primary-emphasis">Blogs App</h1>
            <Notification notification={notification} />
            {user === null && <LoginForm />}
            {user !== null && (
              <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/blogs" element={<BlogList />} />
                <Route path="/blogs/:id" element={<BlogDetails />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/error-404" element={<Page404 />} />
              </Routes>
            )}
          </div>
        </div>
      </main>
    </Router>
  );
};

export default App;
