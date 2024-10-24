import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register the components
Chart.register(...registerables);

const InvestmentPage = () => {
  const [investments, setInvestments] = useState([
    { id: 1, name: 'Tech Stocks', amount: 5000, returns: '15%', type: 'Stocks' },
    { id: 2, name: 'Real Estate Fund', amount: 10000, returns: '8%', type: 'Real Estate' },
    { id: 3, name: 'Mutual Fund', amount: 3000, returns: '10%', type: 'Funds' },
  ]);

  const [newInvestment, setNewInvestment] = useState({
    name: '',
    amount: '',
    returns: '',
    type: '',
  });

  const addInvestment = () => {
    setInvestments([...investments, { ...newInvestment, id: investments.length + 1 }]);
    setNewInvestment({ name: '', amount: '', returns: '', type: '' });
  };

  const data = {
    labels: investments.map(inv => inv.name),
    datasets: [
      {
        label: 'Investment Amount',
        data: investments.map(inv => inv.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ color: '#1976d2' }}>
          Investment Overview
        </Typography>
        <IconButton component={Link} to="/view-accounts" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="body1" mb={3} sx={{ color: '#1976d2' }}>
        Here you can view your investments and their performance.
      </Typography>

      <Box mb={4}>
        <Typography variant="h5">Investment Chart</Typography>
        <Bar data={data} options={{ responsive: true }} />
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Investment Name</TableCell>
              <TableCell>Amount Invested</TableCell>
              <TableCell>Estimated Returns</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investments.map((investment) => (
              <TableRow key={investment.id}>
                <TableCell>{investment.name}</TableCell>
                <TableCell>${investment.amount}</TableCell>
                <TableCell>{investment.returns}</TableCell>
                <TableCell>{investment.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={4}>
        <Typography variant="h5" mb={2}>Add New Investment</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Investment Name"
              variant="outlined"
              value={newInvestment.name}
              onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              type="number"
              value={newInvestment.amount}
              onChange={(e) => setNewInvestment({ ...newInvestment, amount: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Estimated Returns"
              variant="outlined"
              value={newInvestment.returns}
              onChange={(e) => setNewInvestment({ ...newInvestment, returns: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Type"
              variant="outlined"
              value={newInvestment.type}
              onChange={(e) => setNewInvestment({ ...newInvestment, type: e.target.value })}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          onClick={addInvestment}
          sx={{ marginTop: 2, backgroundColor: '#00796b', color: 'white', '&:hover': { backgroundColor: '#004d40' } }}
        >
          Add Investment
        </Button>
      </Box>

      <Box mt={4}>
        <Button variant="contained" component={Link} to="/view-accounts" sx={{ backgroundColor: '#00796b', color: 'white', '&:hover': { backgroundColor: '#004d40' } }}>
          Back to Accounts
        </Button>
      </Box>
    </Container>
  );
};

export default InvestmentPage;
