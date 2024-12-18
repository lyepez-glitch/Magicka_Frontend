import React, { useState } from 'react';
import { login } from './services/authService';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/userSlice';

const Login = ({setLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login({ username, password });
            console.log('data',data);
            // localStorage.setItem('authToken', data.token);
            localStorage.setItem('authToken', data.access);
            dispatch(setUser({ username,id:data.id }));
            setLogin(true);
            console.log('Login successful!');
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '400px', marginTop: '-120px' }}>
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              {/* Username Input */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>

              {/* Error Message */}
              {error && <p className="text-danger text-center mt-3">{error}</p>}
            </form>
          </div>
        </div>
      );
};

export default Login;
