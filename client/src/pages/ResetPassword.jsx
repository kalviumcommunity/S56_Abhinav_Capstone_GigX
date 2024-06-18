import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Grid, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Styles/ResetPassword.css';

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); 

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/forgetpassword`, { email });
      toast.success(response.data);
      setStep(2);
    } catch (error) {
      toast.error('Error sending email. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.put(`${API}/resetpassword`, { email, otp, password });
      toast.success(response.data);
      if (response.data === 'Password reset successfully') {
        setStep(1);
        setEmail('');
        setOtp('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          navigate('/');
        }, 3000); 
      }
    } catch (error) {
      toast.error('Error resetting password. Please try again.');
    }
  };

  return (
    <div className="reset-password-page">
      <ToastContainer /> 
      <Link to="/" className="close-icon">
        <FaTimes />
      </Link>
      <Container maxWidth="sm" className="reset-password-container">
        <Paper elevation={3} className="reset-password-box">
          <Typography variant="h4" align="center" gutterBottom>
            {step === 1 ? 'Reset Password' : 'Enter OTP and New Password'}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Please enter your registered email to receive an OTP and reset your password.
          </Typography>
          <form onSubmit={step === 1 ? handleEmailSubmit : handleResetPassword}>
            <Grid container spacing={2}>
              {step === 1 ? (
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Grid>
              ) : (
                <>
                  <Grid item xs={12}>
                    <TextField
                      label="OTP"
                      type="text"
                      fullWidth
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="New Password"
                      type="password"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Confirm Password"
                      type="password"
                      fullWidth
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                {step === 1 ? 'Send OTP' : 'Reset Password'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default ResetPassword;
