import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import loginIllustration from '../assets/logoremove.svg';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { ImGoogle3 } from "react-icons/im";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo login logic - accept any username/password
    if (username && password) {
      // Simulate successful login
      localStorage.setItem('token', 'demo-token');
      console.log('Login successful with:', { username, password });
      navigate('/dashboard');
    } else {
      alert('Mohon isi username dan password');
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
    console.log('Google login clicked');
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="wave-pattern"></div>
        
        {/* Gambar Ilustrasi */}
        <div className="login-illustration">
          <img 
            src={loginIllustration} 
            alt="Login Illustration" 
            className="illustration-image"
          />
        </div>
        
        {/* Brand Text */}
        <div className="brand-text">
          <p>Permudah tugasmu dan tingkatkan produktivitas</p>
          <p>dengan StuffNudge. Mulai sekarang, gratis!</p>
        </div>
      </div>
      
      <div className="login-form-container">
        <div className="login-form">
          <h1 className="welcome-title">Welcome Back!</h1>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input password-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          
          <div className="divider">
            <span>Or continue with Google</span>
          </div>
          
          <button className="google-login-button" onClick={handleGoogleLogin}>
            <div className="google-icon"><ImGoogle3 /></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

