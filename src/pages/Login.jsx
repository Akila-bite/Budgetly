import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MoneyToast from '../components/MoneyToast';
import './login.css';

const Login = () => {
  // Form state for email and password
  const [formData, setFormData] = useState({ email: '', password: '' });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access Redux auth state
  const { user, loading, error } = useSelector((state) => state.auth);

  // Handle form input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success(<MoneyToast message="Welcome back! 💰" />);
          navigate("/dashboard"); // or another secure route
        }
      });
  };

  return (
    <>
      <div className="login-background" />
      <div className="overlay"></div> {/* glass effect layer */}
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>

          {error && <p className="login-error">{error}</p>}
          {user && <p className="login-success">Login successful!</p>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="login-switch">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;


