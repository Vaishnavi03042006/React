import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
  Grid,
  Paper,
} from '@mui/material';
import { useAccount } from './AccountContext'; 

const CheckingAccount = () => {
  const { savingsBalance, setSavingsBalance } = useAccount();
  const [savingsAccountInput, setSavingsAccountInput] = useState('');
  const [amount, setAmount] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isAccountValid, setIsAccountValid] = useState(false);
  const savingsAccountNumber = '123456789'; 
  const validateAccount = () => {
    if (savingsAccountInput === savingsAccountNumber) {
      setIsAccountValid(true);
      setSnackbar({ open: true, message: 'Account validated successfully!', severity: 'success' });
    } else {
      setIsAccountValid(false);
      setSnackbar({ open: true, message: 'Invalid savings account number!', severity: 'error' });
    }
  };
  const handleDeposit = () => {
    const amt = parseFloat(amount);
    if (amt <= 0) {
      setSnackbar({ open: true, message: 'Deposit amount must be greater than zero!', severity: 'error' });
      return;
    }

    setSavingsBalance((prev) => prev + amt);
    setSnackbar({ open: true, message: `Deposited $${amt.toFixed(2)} successfully!`, severity: 'success' });
    setAmount(''); 
  };
 
  const handleWithdraw = () => {
    const amt = parseFloat(amount);
    if (amt <= 0) {
      setSnackbar({ open: true, message: 'Withdrawal amount must be greater than zero!', severity: 'error' });
      return;
    }
    if (amt > savingsBalance) {
      setSnackbar({ open: true, message: 'Insufficient funds for withdrawal!', severity: 'error' });
      return;
    }

    setSavingsBalance((prev) => prev - amt);
    setSnackbar({ open: true, message: `Withdrew $${amt.toFixed(2)} successfully!`, severity: 'success' });
    setAmount(''); // Reset amount input
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Container maxWidth="sm" sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checking Account
      </Typography>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <TextField
          fullWidth
          label="Savings Account Number"
          value={savingsAccountInput}
          onChange={(e) => setSavingsAccountInput(e.target.value)}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={validateAccount}
          sx={{ marginBottom: 2 }}
        >
          Validate Account
        </Button>

        {isAccountValid && (
          <>
            <Typography variant="h6" gutterBottom>
              Current Balance: ${savingsBalance.toFixed(2)}
            </Typography>
            <TextField
              fullWidth
              type="number"
              label="Transaction Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              variant="outlined"
              sx={{ marginTop: 2, marginBottom: 2 }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDeposit}
                  disabled={!amount}
                >
                  Make a Deposit
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleWithdraw}
                  disabled={!amount}
                >
                  Withdraw Funds
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CheckingAccount;
