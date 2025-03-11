import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUserAuth, error }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [formError, setFormError] = useState('');
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const validateForm = () => {
    const { username, password } = credentials;

    //Validation
    if (!username || !password) {
      setFormError('Username and password are required');
      return false;
    }

    setFormError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      localStorage.setItem("user", JSON.stringify(credentials))
      setUserAuth(credentials);
      setCredentials({ username: '', password: '' })
      navigate('/profile')
    }
  };

  return (
    <div>
      <h1>Langaroo</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
