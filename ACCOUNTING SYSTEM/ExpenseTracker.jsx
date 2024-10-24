import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, TextField, Button, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Select, MenuItem, InputLabel, FormControl, IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const ExpenseTracker = () => {
  const location = useLocation();
  const { name, accountNumber, pin, totalBalance: initialBalance = 0 } = location.state || {};

  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [date, setDate] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [checkingAccountBalance, setCheckingAccountBalance] = useState(initialBalance); // State for checking account balance
  const [isEditMode, setIsEditMode] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(null);

  const expenseNames = ['Groceries', 'Utilities', 'Rent', 'Entertainment', 'Others'];
  const categories = {
    Groceries: ['Fruits', 'Vegetables', 'Snacks'],
    Utilities: ['Electricity', 'Water', 'Internet'],
    Rent: ['Monthly Rent', 'Security Deposit', 'Other Fees'],
    Entertainment: ['Movies', 'Games', 'Travel'],
    Others: ['Donations', 'Gifts', 'Miscellaneous'],
  };

  useEffect(() => {
    calculateExpenses(); // Automatically recalculate totals when expenses change
  }, [expenses]);

  const calculateExpenses = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    let monthlyTotal = 0;
    let yearlyTotal = 0;

    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);

      if (expenseDate.getFullYear() === currentYear) {
        yearlyTotal += expense.amount;
        if (expenseDate.getMonth() === currentMonth) {
          monthlyTotal += expense.amount;
        }
      }
    });

    return { monthlyTotal, yearlyTotal };
  };

  const { monthlyTotal, yearlyTotal } = calculateExpenses();

  const handleAddOrUpdateExpense = () => {
    const amount = parseFloat(expenseAmount);

    // Validate input amounts
    if (expenseName === 'Rent') {
      alert('Rent should be recorded as a monthly expense, not a daily expense.');
      return;
    }

    if (isNaN(amount) || amount <= 0 || amount > checkingAccountBalance) {
      alert('Invalid expense amount or exceeds available balance!');
      return;
    }

    const newExpense = {
      sNo: isEditMode ? editExpenseId : expenses.length + 1,
      name: expenseName,
      amount,
      date,
      category: expenseCategory,
    };

    const updatedExpenses = isEditMode
      ? expenses.map((exp) => (exp.sNo === editExpenseId ? newExpense : exp))
      : [...expenses, newExpense];

    setExpenses(updatedExpenses);
    const newBalance = isEditMode ? checkingAccountBalance : checkingAccountBalance - amount;
    setCheckingAccountBalance(newBalance); // Update checking account balance
    clearForm();
  };

  const handleEditExpense = (expense) => {
    setIsEditMode(true);
    setEditExpenseId(expense.sNo);
    setExpenseName(expense.name);
    setExpenseAmount(expense.amount);
    setDate(expense.date);
    setExpenseCategory(expense.category);
  };

  const handleDeleteExpense = (sNo) => {
    const filteredExpenses = expenses.filter((expense) => expense.sNo !== sNo);
    const deletedExpense = expenses.find(expense => expense.sNo === sNo);
    
    if (deletedExpense) {
      setCheckingAccountBalance(prev => prev + deletedExpense.amount); // Restore balance when an expense is deleted
    }

    setExpenses(filteredExpenses);
  };

  const clearForm = () => {
    setExpenseName('');
    setExpenseAmount('');
    setDate('');
    setExpenseCategory('');
    setIsEditMode(false);
  };

  return (
    <Container maxWidth="md" sx={{ padding: 4, minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#000' }}>Welcome, {name}!</Typography>

      <Paper elevation={3} sx={{ padding: 3, borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <Typography variant="h5" gutterBottom>Account Details</Typography>
        <Box>
          <Typography>Account Number: {accountNumber}</Typography>
          <Typography>PIN: {pin}</Typography>
          <Typography>Checking Account Balance: ${checkingAccountBalance.toFixed(2)}</Typography> {/* Display checking account balance */}
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3, marginTop: 4, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <Typography variant="h5">Add / Edit Expense</Typography>
        <Box mt={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Expense Name</InputLabel>
            <Select
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              label="Expense Name"
            >
              {expenseNames.map((name) => (
                <MenuItem key={name} value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              label="Category"
              disabled={!expenseName}
            >
              {categories[expenseName]?.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />

          <TextField
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <Typography mt={2}>
            <strong>Monthly Expenses:</strong> ${monthlyTotal.toFixed(2)} | 
            <strong> Yearly Expenses:</strong> ${yearlyTotal.toFixed(2)}
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleAddOrUpdateExpense}
          sx={{ marginTop: 2, backgroundColor: '#00796b' }}
        >
          {isEditMode ? 'Update Expense' : 'Add Expense'}
        </Button>
      </Paper>

      <Typography variant="h5" mt={4}>Expenses</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.sNo}>
                <TableCell>{expense.sNo}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.name}</TableCell>
                <TableCell>${expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditExpense(expense)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteExpense(expense.sNo)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ExpenseTracker;
