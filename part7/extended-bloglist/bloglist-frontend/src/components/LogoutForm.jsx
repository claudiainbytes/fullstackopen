import { useUserValue, useUserDispatch } from '../context/BloglistContext';

const LogoutForm = () => {
  const user = useUserValue();
  const userDispatch = useUserDispatch();

  const handleLogout = async (event) => {
    event.preventDefault();
    userDispatch({ type: 'LOGOUT' });
    window.localStorage.removeItem('loggedBlogAppUser');
  };

  return (
    <>
      <div className="nav-item d-flex" role="logout">
        <div className="nav-link">Welcome {user.name}&nbsp;</div>
        <button
          className="btn btn-secondary my-2 my-sm-0"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default LogoutForm;
