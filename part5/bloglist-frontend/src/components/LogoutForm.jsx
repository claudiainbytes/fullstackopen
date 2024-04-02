const LogoutForm = ({ user, handleLogout }) => (
  <div>
    <p>Welcome {user.name }&nbsp;<button type="button" onClick={handleLogout}>Logout</button></p>
  </div>
)

export default LogoutForm