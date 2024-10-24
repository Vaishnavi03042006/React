import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Make sure this import is included
import './LoginPage.css'; 

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();  // Define navigate here

  const validateLogin = () => {
    if (!username || !password) {
      setError('Please fill all the fields.');
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;

    if (!emailPattern.test(username)) {
      setError('Please enter a valid Gmail address.');
      return false;
    }

    if (!passwordPattern.test(password)) {
      setError('Password must contain at least one uppercase letter and one symbol.');
      return false;
    }

    setError('');
    return true;
  };

  const validateResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setError('Please fill all the fields.');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    setError('');
    return true;
  };

  const handleLogin = () => {
    if (validateLogin()) {
      onLoginSuccess(); // Update login state
      navigate('/'); // Navigate to homepage
    }
  };

  const handleChangePassword = () => {
    if (validateResetPassword()) {
      setShowForgotPassword(false);
      setNewPassword('');
      setConfirmPassword('');
      // Add logic for changing the password here if needed
      console.log('Password changed successfully'); 
    }
  };

  return (
    <Box className="login-container">
      <Box className="login-box">
        {!showForgotPassword ? (
          <>
            <Typography variant="h4">Login</Typography>
            <TextField
              label="Gmail Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button variant="contained" fullWidth onClick={handleLogin} sx={{ marginTop: 2 }}>
              Login
            </Button>
            <Link onClick={() => setShowForgotPassword(true)} sx={{ display: 'block', marginTop: 2, textAlign: 'center' }}>
              Forgot Password?
            </Link>
            <Link onClick={() => navigate('/signup')} sx={{ display: 'block', marginTop: 2, textAlign: 'center' }}>
              Don't have an account? Sign Up
            </Link>
          </>
        ) : (
          <>
            <Typography variant="h4">Reset Password</Typography>
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button variant="contained" fullWidth onClick={handleChangePassword} sx={{ marginTop: 2 }}>
              Change Password
            </Button>
            <Link onClick={() => setShowForgotPassword(false)} sx={{ display: 'block', marginTop: 2, textAlign: 'center' }}>
              Back to Login
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
