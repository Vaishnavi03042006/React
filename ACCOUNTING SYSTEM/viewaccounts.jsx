import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  IconButton,
  Box,
  Grid,
  Paper,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SavingsIcon from '@mui/icons-material/Savings';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FolderIcon from '@mui/icons-material/Folder';
import PeopleAltIcon from '@mui/icons-material/People';

const ViewAccountsPage = () => {
  const [showOriginalCards, setShowOriginalCards] = useState(false);
  const navigate = useNavigate();

  const handleCustomizeClick = () => {
    setShowOriginalCards(true);
  };

  const accountTypes = [
    {
      icon: <SavingsIcon fontSize="large" />,
      title: 'Savings Account',
      description: 'Manage your savings efficiently.',
      buttonText: 'VIEW SAVINGS',
      onClick: () => navigate('/savings-account'),
    },
    {
      icon: <CreditCardIcon fontSize="large" />,
      title: 'Checking Account',
      description: 'Access your daily funds easily.',
      buttonText: 'VIEW CHECKING',
      onClick: () => navigate('/checking-account'),
    },
    {
      icon: <AccountBalanceIcon fontSize="large" />,
      title: 'Business Account',
      description: 'Tailored for business needs.',
      buttonText: 'VIEW BUSINESS',
      onClick: () => navigate('/business-account'),
    },
    {
      icon: <MonetizationOnIcon fontSize="large" />,
      title: 'Investment Account',
      description: 'Grow your investments.',
      buttonText: 'VIEW INVESTMENT',
      onClick: () => navigate('/investment-account'),
    },
  ];

  const actionCards = [
    {
      icon: <AccountBalanceIcon fontSize="large" />,
      title: 'Import data automatically',
      onClick: () => navigate('/import-accounts'),
    },
    {
      icon: <FolderIcon fontSize="large" />,
      title: 'Manage transactions',
      onClick: () => navigate('/manage-transactions'),
    },
    {
      icon: <PeopleAltIcon fontSize="large" />,
      title: 'Hire an expert',
      onClick: () => navigate('/chatbot'),
    },
    {
      icon: <SavingsIcon fontSize="large" />,
      title: 'Customize accounts',
      onClick: handleCustomizeClick,
    },
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: 4,
        backgroundImage: `url('/images/backg 1.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" justifyContent="center" alignItems="center"  sx={{ color: 'white' }}>
          Accounts Overview
        </Typography>
        <IconButton component={Link} to="/" aria-label="close" sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="body1" justifyContent="center" mb={3} sx={{ color: 'white' }}>
        Here you can view all your accounts or perform related actions.
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="center" flexGrow={1}>
        {!showOriginalCards
          ? actionCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 3,
                    textAlign: 'center',
                    backgroundColor: '#e0f7fa',
                    color: '#00796b',
                    cursor: card.onClick ? 'pointer' : 'default',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                  onClick={card.onClick}
                >
                  {card.icon}
                  <Typography variant="h6" mt={2}>
                    {card.title}
                  </Typography>
                </Paper>
              </Grid>
            ))
          : accountTypes.map((account, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 3,
                    textAlign: 'center',
                    backgroundColor: '#e0f7fa',
                    color: '#00796b',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                  onClick={account.onClick}
                >
                  {account.icon}
                  <Typography variant="h5" mt={1}>
                    {account.title}
                  </Typography>
                  <Typography variant="body2" mt={1}>
                    {account.description}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: 2,
                      backgroundColor: '#00796b',
                      color: 'white',
                      '&:hover': { backgroundColor: '#004d40' },
                    }}
                    onClick={account.onClick}
                  >
                    {account.buttonText}
                  </Button>
                </Paper>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default ViewAccountsPage;
