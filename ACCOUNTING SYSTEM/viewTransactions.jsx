// import React, { useEffect, useState } from 'react';
// import { Container, Typography, Paper, List, ListItem, ListItemText, Box, Button, CircularProgress } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const ViewTransactionsPage = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [accountBalance] = useState(500);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/transactionsData');
//         const data = await response.json();

//         const validTransactions = data.filter(txn => txn.amount <= accountBalance);
//         setTransactions(validTransactions);
//       } catch (error) {
//         console.error('Error fetching transactions:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [accountBalance]);

//   return (
//     <Container maxWidth="sm">
//       <Box textAlign="center" my={4}>
//         <Typography variant="h4" fontWeight="bold">Transactions</Typography>
//         <Typography variant="h6" color="textSecondary" mt={2}>
//           Account Balance: ${accountBalance}
//         </Typography>
//       </Box>

//       <Paper elevation={3} sx={{ padding: 2 }}>
//         {loading ? (
//           <Box textAlign="center" my={4}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <List>
//             {transactions.length > 0 ? (
//               transactions.map(transaction => (
//                 <ListItem key={transaction.id} divider>
//                   <ListItemText
//                     primary={transaction.recipient}  // Changed to recipient for clarity
//                     secondary={`Amount: $${transaction.amount} | Date: ${new Date(transaction.date).toLocaleDateString()}`}  // Assuming a date field exists
//                   />
//                 </ListItem>
//               ))
//             ) : (
//               <Typography>No valid transactions available.</Typography>
//             )}
//           </List>
//         )}
//       </Paper>

//       <Box textAlign="center" mt={4}>
//         <Button variant="contained" onClick={() => navigate('/')}>
//           Back to Homepage
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default ViewTransactionsPage;
/*import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, Box, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ViewTransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountBalance] = useState(500); // Adjust as necessary
  const navigate = useNavigate();

  useEffect(() => {
    const loadTransactions = () => {
      const storedTransactions = localStorage.getItem('transactions');
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    };

    loadTransactions();
    setLoading(false); // Set loading to false after fetching
  }, []);

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" my={4}>
        <Typography variant="h4" fontWeight="bold">Transactions</Typography>
        <Typography variant="h6" color="textSecondary" mt={2}>
          Account Balance: ${accountBalance}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ padding: 2 }}>
        {loading ? (
          <Box textAlign="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {transactions.length > 0 ? (
              transactions.map((transaction, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={`${transaction.type} to ${transaction.recipient}`}
                    secondary={`Amount: ₹${transaction.amount} | Date: ${transaction.date}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No valid transactions available.</Typography>
            )}
          </List>
        )}
      </Paper>

      <Box textAlign="center" mt={4}>
        <Button variant="contained" onClick={() => navigate('/')}>
          Back to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default ViewTransactionsPage;*/
// src/login/ViewTransactionsPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, Box, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from './TransactionContext'; // Import the transaction context

const ViewTransactionsPage = () => {
  const { transactions } = useTransactions(); // Get transactions from context
  const [loading, setLoading] = useState(true);
  const [accountBalance] = useState(500); // You might want to fetch this dynamically
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading with a timeout
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust the timeout as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" my={4}>
        <Typography variant="h4" fontWeight="bold">Transactions</Typography>
        <Typography variant="h6" color="textSecondary" mt={2}>
          Account Balance: ${accountBalance}
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ padding: 2 }}>
        {loading ? (
          <Box textAlign="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {transactions.length > 0 ? (
              transactions.map(transaction => (
                <ListItem key={transaction.id} divider>
                  <ListItemText
                    primary={transaction.recipient} // Assuming recipient is part of the transaction
                    secondary={`Amount: $${transaction.amount} | Date: ${new Date(transaction.date).toLocaleDateString()}`} // Ensure date is included
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No valid transactions available.</Typography>
            )}
          </List>
        )}
      </Paper>

      <Box textAlign="center" mt={4}>
        <Button variant="contained" onClick={() => navigate('/')}>
          Back to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default ViewTransactionsPage;

