// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import classNames from 'classnames';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="login-container min-h-screen flex items-center justify-center bg-white">
      <form
        className={classNames('login-form bg-white p-8 rounded shadow-md w-full max-w-sm')}
        onSubmit={handleSubmit}
      >
        <h2 className="text-black text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {user && <p className="text-green-600 text-sm mb-4">Login successful!</p>}

        <label className="text-black block mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-black rounded"
          required
        />

        <label className="text-black block mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-6 border border-black rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={classNames(
            'w-full text-white p-2 rounded',
            loading ? 'bg-gray-600' : 'bg-black hover:bg-gray-800'
          )}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;

