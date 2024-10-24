import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Paper, FormHelperText } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const SavingsAccountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [name, setName] = useState(location.state?.name || ''); // Pre-fill name from the state
  const [accountNumber, setAccountNumber] = useState('');
  const [accountPIN, setAccountPIN] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    name: '',
    accountNumber: '',
    accountPIN: '',
  });

  const handleLogin = () => {
    // Reset error messages
    setErrorMessages({
      name: '',
      accountNumber: '',
      accountPIN: '',
    });
    let hasError = false;

    if (!name) {
      setErrorMessages(prev => ({ ...prev, name: 'Please enter your name.' }));
      hasError = true;
    }

    if (!accountNumber) {
      setErrorMessages(prev => ({ ...prev, accountNumber: 'Please enter your Account Number.' }));
      hasError = true;
    }

    if (!accountPIN) {
      setErrorMessages(prev => ({ ...prev, accountPIN: 'Please enter your Account PIN.' }));
      hasError = true;
    }

    // Validate account number and PIN format
    const isAccountNumberValid = accountNumber.length === 14 && /^\d+$/.test(accountNumber);
    const isPinValid = accountPIN.length === 4 && /^\d+$/.test(accountPIN);

    if (!isAccountNumberValid) {
      setErrorMessages(prev => ({ ...prev, accountNumber: 'Account Number must be 14 digits long.' }));
      hasError = true;
    }

    if (!isPinValid) {
      setErrorMessages(prev => ({ ...prev, accountPIN: 'PIN must be 4 digits long.' }));
      hasError = true;
    }

    // Navigate to the expense tracker if all validations pass
    if (!hasError) {
      navigate('/expense-tracker', { state: { name, accountNumber, pin: accountPIN, totalBalance: 10000 } });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 4, minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: '12px', backgroundColor: '#e0f7fa' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#00796b' }}>
          Savings Account Login
        </Typography>

        <Box mt={3}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorMessages(prev => ({ ...prev, name: '' })); // Clear error on change
            }}
            error={!!errorMessages.name} // Set error state if there's a message
          />
          <FormHelperText error>{errorMessages.name}</FormHelperText>

          <TextField
            label="Account Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
              setErrorMessages(prev => ({ ...prev, accountNumber: '' })); // Clear error on change
            }}
            error={!!errorMessages.accountNumber} 
          />
          <FormHelperText error>{errorMessages.accountNumber}</FormHelperText>

          <TextField
            label="Account PIN"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={accountPIN}
            onChange={(e) => {
              setAccountPIN(e.target.value);
              setErrorMessages(prev => ({ ...prev, accountPIN: '' })); // Clear error on change
            }}
            error={!!errorMessages.accountPIN}
          />
          <FormHelperText error>{errorMessages.accountPIN}</FormHelperText>
        </Box>

        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{ marginTop: 2, backgroundColor: '#00796b', color: 'white', '&:hover': { backgroundColor: '#004d40' } }}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default SavingsAccountPage;
