import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './App';

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

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!validateForm()) return
    try {
     let res = await axios.post(`${BASE_URL}/api/auth/login`,credentials)
     console.log("res",res) 
     let user = res.data.user
     user.token = res.data.token
     
     localStorage.setItem("user", JSON.stringify(user))
       setUserAuth(user);
       setCredentials({ username: '', password: '' })
       navigate('/profile')
    
      } catch (error) {
        if (error.response && error.response.data) {
          if (error.response.data.message === "User not registered") {
            setFormError("User not registered. Please check your username.");
          } else if (error.response.data.message === "Incorrect password") {
            setFormError("Incorrect password. Please try again.");
          } else {
            setFormError("Invalid username or password.");
          }
        } else {
          setFormError("Something went wrong. Please try again later.");
        }
        console.log("error", error);
    }
  };

  return (
    <div>
      <h1>Langaroo</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className='login-links'>Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label className='login-links'>Password:</label>
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
