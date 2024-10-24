import React, { useState } from 'react';
import {
  Container,
  Typography,
  IconButton,
  Box,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BusinessAccountPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(50000); // Initial balance
  const [showTransactions, setShowTransactions] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    recipient: '',
    purpose: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch Transactions from JSON Server
  const handleViewTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/BusinessTransaction');
      setTransactions(response.data);
      setShowTransactions(true);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Handle Dialog Open/Close
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  // Handle Input Change for New Transactions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
  };

  // Add New Transaction and Update Balance
  const handleAddTransaction = async () => {
    try {
      const { amount } = newTransaction;
      const parsedAmount = parseFloat(amount);

      // Update balance
      setBalance((prevBalance) => prevBalance - parsedAmount);

      // Save new transaction to JSON server
      const response = await axios.post('http://localhost:3000/BusinessTransaction', newTransaction);

      setTransactions((prev) => [...prev, response.data]);
      setNewTransaction({ amount: '', recipient: '', purpose: '' });
      handleCloseDialog();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: '100vh', padding: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ color: '#1976d2' }}>
          Business Account
        </Typography>
        <IconButton component={Link} to="/view-accounts" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#e0f7fa', marginBottom: 2 }}>
        <Typography variant="h6" color="primary">
          Current Balance: ${balance.toLocaleString()}
        </Typography>

        <Button
          variant="contained"
          sx={{ marginTop: 2, backgroundColor: '#00796b', '&:hover': { backgroundColor: '#004d40' } }}
          onClick={handleViewTransactions}
        >
          View Transactions
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginLeft: 2, marginTop: 2 }}
          onClick={handleOpenDialog}
        >
          Add Transaction
        </Button>
      </Paper>

      {showTransactions && (
        <TableContainer component={Paper} elevation={3} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Recipient</TableCell>
                <TableCell>Purpose</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>{transaction.recipient}</TableCell>
                  <TableCell>{transaction.purpose}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            value={newTransaction.amount}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="recipient"
            label="Recipient"
            type="text"
            fullWidth
            value={newTransaction.recipient}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="purpose"
            label="Purpose"
            type="text"
            fullWidth
            value={newTransaction.purpose}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTransaction} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BusinessAccountPage;
