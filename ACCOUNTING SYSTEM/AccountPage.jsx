// AccountingPage.js
import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container, Paper, Box } from '@mui/material';

const AccountingPage = ({ navigateTo }) => {
  return (
    <Container>
      <AppBar position="static" sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'blue' }}>
            Accounting Page
          </Typography>
          <Button sx={{ color: 'blue' }} onClick={() => navigateTo('homepage')}>
            Back to Home
          </Button>
        </Toolbar>
      </AppBar>

      <Box mt={5}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Accounts Overview
          </Typography>
          <Typography variant="body1">
            This section contains detailed insights into your financial accounts.
          </Typography>
          <Typography variant="body2" mt={2}>
            Manage your transactions, generate reports, and view invoices from here.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AccountingPage;
