import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Alert, AlertDescription } from '../components/ui/alert.jsx';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle } from 'lucide-react';
import '../styles/RegisterPage.css';
import loginIllustration from '../assets/logotitle.svg';
import { register } from '../utils/network-data'; 
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Full name is required';
    } else if (formData.username.trim().length < 2) {
      newErrors.username = 'Name must be at least 2 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSuccessMessage('');
    setErrors({})

    try {
      const { error } = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      if(!error){
        setSuccessMessage('Account created successfully! Please login.');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        console.log('Navigating to /login...');
        
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
      navigate('/login')
    }
  };

  const handleGoogleRegister = () => {
    console.log('Google registration clicked');
  };

  return (
    <div className="register-container-split">
      <div className="brand-section-split">
        <div className="brand-content-split">
          <div className="register-illustration">
            <img 
              src={loginIllustration} 
              alt="Register Illustration" 
              className="illustration-image"
            />
          </div>
          
          <div className="brand-description">
            <p>Permudah tugas dan tingkatkan produktivitasmu.</p>
            <br></br>
            <p>Mulai sekarang, gratis!</p>
          </div>
        </div>
      </div>

      <div className="form-section-split">
        <div className="form-container-split">
          <Card className="register-card-split">
            <CardHeader className="register-header-split">
              <CardTitle className="register-title-split">Buat Akunmu Sekarang!</CardTitle>
              {/* <CardDescription className="register-subtitle-split">
                atau daftar dengan akun Google mu.
              </CardDescription> */}
            </CardHeader>
            
            <CardContent className="register-content-split">
              {successMessage && (
                <Alert className="success-alert mb-4">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              {errors.general && (
                <Alert className="error-alert mb-4">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              {/* <Button 
                type="button"
                variant="outline"
                className="google-button-split"
                onClick={handleGoogleRegister}
              >
                <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Masuk dengan Google
              </Button> */}

              <form onSubmit={handleRegister} className="register-form-split">
                <div className="form-group-split">
                  <Label htmlFor="name" className="form-label-split">Username</Label>
                  <div className="input-wrapper-split">
                    <Input
                      id="name"
                      name="username"
                      type="text"
                      placeholder=""
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`input-split ${errors.username ? 'error' : ''}`}
                    />
                  </div>
                  {errors.username && <span className="error-text-split">{errors.username}</span>}
                </div>

                <div className="form-group-split">
                  <Label htmlFor="email" className="form-label-split">Email</Label>
                  <div className="input-wrapper-split">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder=""
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`input-split ${errors.email ? 'error' : ''}`}
                    />
                  </div>
                  {errors.email && <span className="error-text-split">{errors.email}</span>}
                </div>

                <div className="password-row-split">
                  <div className="form-group-split password-field-split">
                    <Label htmlFor="password" className="form-label-split">Password</Label>
                    <div className="input-wrapper-split password-wrapper-split">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder=""
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`input-split ${errors.password ? 'error' : ''}`}
                      />
                      <button
                        type="button"
                        className="password-toggle-split"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.password && <span className="error-text-split">{errors.password}</span>}
                  </div>

                  <div className="form-group-split password-field-split">
                    <Label htmlFor="confirmPassword" className="form-label-split">Confirm password</Label>
                    <div className="input-wrapper-split password-wrapper-split">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder=""
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`input-split ${errors.confirmPassword ? 'error' : ''}`}
                      />
                      <button
                        type="button"
                        className="password-toggle-split"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {errors.confirmPassword && <span className="error-text-split">{errors.confirmPassword}</span>}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="submit-button-split"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Daftar'}
                </Button>

                <div className="login-link-split">
                  <span>Sudah punya Akun? </span>
                  <Link to="/login" className="link-split">Masuk disini</Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;