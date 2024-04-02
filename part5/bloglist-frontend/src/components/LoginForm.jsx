import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, handleUsername, handlePassword, username, password }) => {

  return(
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username &nbsp;</label>
        <input
          type="text"
          value={username}
          name="username"
          onChange={handleUsername}
        />
      </div>
      <div>
        <label htmlFor="password">Password &nbsp;</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={handlePassword}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm