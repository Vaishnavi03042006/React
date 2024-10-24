import React from 'react';
import { AppBar, Toolbar, Button, Container, Grid, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ReceiptIcon from '@mui/icons-material/Receipt';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const handleViewAccounts = () => {
    navigate('/view-accounts');
  };

  const handleViewTransactions = () => {
    navigate('/view-transactions');
  };

  const handleViewInvoices = () => {
    navigate('/view-invoices');
  };

  return (
    <Container maxWidth="lg" className="homepage-container">
      <AppBar position="static" sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'blue' }}>
            Accounting System
          </Typography>
        </Toolbar>
      </AppBar>

      <Box className="intro-text" textAlign="center" my={4}>
        <Typography variant="h4" color="white" fontWeight="bold">
          Welcome to Accounting System
        </Typography>
        <Typography variant="h6" color="white" mt={2}>
          Accounting is not just about counting beans; it’s about making every bean count.
        </Typography>
      </Box>

      {/* Cards Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper className="card" elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <AccountBalanceIcon className="icon" fontSize="large" />
            <Typography variant="h5">Accounts Overview</Typography>
            <Typography variant="h6">Manage and view all your accounts</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleViewAccounts}
              sx={{ marginTop: 2 }}
            >
              View Accounts
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper className="card" elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <AttachMoneyIcon className="icon" fontSize="large" />
            <Typography variant="h5">Transactions</Typography>
            <Typography variant="h6">Track and manage transactions</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleViewTransactions}
              sx={{ marginTop: 2 }}
            >
              View Transactions
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper className="card" elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <TrendingUpIcon className="icon" fontSize="large" />
            <Typography variant="h5">Reports</Typography>
            <Typography variant="h6">Generate and view financial reports</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/reports')}
              sx={{ marginTop: 2 }}
            >
              View Reports
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper className="card" elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
            <ReceiptIcon className="icon" fontSize="large" />
            <Typography variant="h5">Invoices</Typography>
            <Typography variant="h6">Create and manage invoices</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleViewInvoices}
              sx={{ marginTop: 2 }}
            >
              View Invoices
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Homepage;
