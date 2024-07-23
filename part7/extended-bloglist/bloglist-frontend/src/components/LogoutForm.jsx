import { useUserValue, useUserDispatch } from '../context/BloglistContext';

const LogoutForm = () => {
  
  const user = useUserValue();
  const userDispatch = useUserDispatch();

  const handleLogout = async (event) => {
    event.preventDefault();
    userDispatch({ type: 'LOGOUT'});
    window.localStorage.removeItem('loggedBlogAppUser');
  };
  
  return (
    <div>
      <p>
        Welcome {user.name}&nbsp;
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </p>
    </div>
)}

export default LogoutForm;
