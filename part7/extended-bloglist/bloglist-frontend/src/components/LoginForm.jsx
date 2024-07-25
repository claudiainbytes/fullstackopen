import { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { useNotificationDispatch } from '../context/BloglistContext';
import { useUserDispatch } from '../context/BloglistContext';

const LoginForm = () => {
  const notificationDispatch = useNotificationDispatch();

  const userDispatch = useUserDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'LOGIN', payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  const handleUsername = ({ target }) => setUsername(target.value);

  const handlePassword = ({ target }) => setPassword(target.value);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      userDispatch({ type: 'LOGIN', payload: user });
      setUsername('');
      setPassword('');
    } catch (exception) {
      notificationDispatch({ type: 'LOGIN_ERR' });
      setTimeout(() => {
        notificationDispatch({ type: 'EMPTY' });
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username &nbsp;</label>
        <input
          type="text"
          value={username}
          name="username"
          id="username"
          onChange={handleUsername}
        />
      </div>
      <div>
        <label htmlFor="password">Password &nbsp;</label>
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          onChange={handlePassword}
        />
      </div>
      <button type="submit" id="login-button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
