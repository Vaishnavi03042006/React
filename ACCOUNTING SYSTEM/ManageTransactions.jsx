import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import { useTransactions } from './TransactionContext'; // Import the transaction context

const ManageTransactions = () => {
  const [balance, setBalance] = useState(5000); // Initial balance
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const { transactions, setTransactions } = useTransactions(); // Use transaction context
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editingIndex, setEditingIndex] = useState(null); // Index of the transaction being edited

  // Handle sending money
  const handleSendMoney = () => {
    const amt = parseFloat(amount);
    if (amt > balance) {
      setSnackbar({ open: true, message: 'Insufficient Balance!', severity: 'error' });
      return;
    }

    const newTransaction = {
      type: 'Send',
      recipient,
      amount: amt,
      date: new Date().toLocaleString(),
    };

    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions); // Update context
    setBalance((prev) => prev - amt);
    setSnackbar({ open: true, message: 'Money Sent Successfully!', severity: 'success' });

    // Reset fields
    setAmount('');
    setRecipient('');
  };

  // Handle requesting money
  const handleRequestMoney = () => {
    const amt = parseFloat(amount);

    const newTransaction = {
      type: 'Request',
      recipient,
      amount: amt,
      date: new Date().toLocaleString(),
    };

    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions); // Update context
    setBalance((prev) => prev + amt);
    setSnackbar({ open: true, message: 'Money Received!', severity: 'success' });

    // Reset fields
    setAmount('');
    setRecipient('');
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Container maxWidth="md" sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2, color: '#00796b' }}>
        Manage Transactions
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Current Balance: ₹{balance.toFixed(2)}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSendMoney}
              disabled={!recipient || !amount || parseFloat(amount) <= 0}
            >
              Send Money
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleRequestMoney}
              disabled={!recipient || !amount || parseFloat(amount) <= 0}
            >
              Request Money
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" sx={{ marginBottom: 2, color: '#00796b' }}>
        Transaction History
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <List>
          {transactions.length === 0 ? (
            <Typography variant="body1" color="textSecondary">
              No transactions yet.
            </Typography>
          ) : (
            transactions.map((txn, index) => (
              <ListItem key={index} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                <ListItemText
                  primary={`${txn.type} ₹${txn.amount?.toFixed(2) || '0.00'} to ${txn.recipient}`}
                  secondary={`Date: ${txn.date}`}
                />
              </ListItem>
            ))
          )}
        </List>
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

export default ManageTransactions;
