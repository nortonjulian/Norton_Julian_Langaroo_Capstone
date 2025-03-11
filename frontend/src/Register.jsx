import { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Register = ({ setUserAuth }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState('');
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword } = credentials;

    //validation
    if (!username || !email || !password || !confirmPassword) {
      setFormError('All fields are required');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address');
      return false;
    }

    // Passwords check
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }

    setFormError('');
    return true;
  };

 
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!validateForm()) return

    //register logic here
    let res = await axios.post("http://localhost:8080/api/auth/register",credentials)
    console.log("res",res)
    setUserAuth(res.data._doc)
    setCredentials({ username: '', email: '', password: '', confirmPassword: '' })
    navigate('/profile')
  };

  return (
    <div>
      <h1>Langaroo</h1>
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
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;