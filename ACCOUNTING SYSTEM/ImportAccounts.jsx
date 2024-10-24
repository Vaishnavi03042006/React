// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Button,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';

// const ImportAccounts = () => {
//   const [fileName, setFileName] = useState('');
//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFileName(file.name);
//       // Reset data when a new file is selected
//       setData([]);
//     }
//   };

//   const handleImport = () => {
//     const fileInput = document.getElementById('file-upload');
//     const file = fileInput.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const text = event.target.result;
//         // Parse CSV data
//         const rows = text.split('\n').map(row => row.split(','));
//         // Assuming the first row is the header
//         const header = rows[0];
//         const dataRows = rows.slice(1).map(row => {
//           const account = {};
//           header.forEach((col, index) => {
//             account[col.trim()] = row[index]?.trim();
//           });
//           return account;
//         });
//         setData(dataRows);
//       };
//       reader.readAsText(file);
//     }
//   };

//   const goToChat = () => {
//     navigate('/chat'); 
//   };

//   return (
//     <Container maxWidth="md" sx={{ padding: 4 }}>
//       <Typography variant="h4" sx={{ marginBottom: 2 }}>
//         Import Accounts
//       </Typography>
//       <Typography variant="body1" sx={{ marginBottom: 2 }}>
//         Upload your account data file below:
//       </Typography>

//       <Box mb={2}>
//         <input
//           accept=".csv"
//           style={{ display: 'none' }}
//           id="file-upload"
//           type="file"
//           onChange={handleFileChange}
//         />
//         <label htmlFor="file-upload">
//           <Button variant="contained" component="span" sx={{ mr: 2 }}>
//             Upload File
//           </Button>
//         </label>
//         <Typography variant="body2">{fileName}</Typography>
//       </Box>

//       <Button
//         variant="contained"
//         onClick={handleImport}
//         disabled={!fileName}
//         sx={{ marginRight: 2 }}
//       >
//         Import
//       </Button>

//       {data.length > 0 && (
//         <TableContainer component={Paper} sx={{ marginTop: 4 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Account Type</TableCell>
//                 <TableCell>Account Number</TableCell>
//                 <TableCell>Balance</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data.map((account, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{account['Account Type']}</TableCell>
//                   <TableCell>{account['Account Number']}</TableCell>
//                   <TableCell>{account['Balance']}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Container>
//   );
// };

// export default ImportAccounts;
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Typography,
//   Button,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Snackbar,
//   Alert,
// } from '@mui/material';

// const ImportAccounts = () => {
//   const [fileName, setFileName] = useState('');
//   const [data, setData] = useState([]);
//   const [error, setError] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const navigate = useNavigate();

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFileName(file.name);
//       // Reset data when a new file is selected
//       setData([]);
//       setError('');
//     }
//   };

//   const handleImport = () => {
//     const fileInput = document.getElementById('file-upload');
//     const file = fileInput.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const text = event.target.result;
//         const rows = text.split('\n').map(row => row.split(','));
//         const header = rows[0];
//         const dataRows = rows.slice(1).map(row => {
//           const account = {};
//           header.forEach((col, index) => {
//             account[col.trim()] = row[index]?.trim();
//           });
//           return account;
//         });
//         setData(dataRows);
//         setError('');
//       };
//       reader.onerror = () => {
//         setError('Failed to read file. Please try again.');
//         setOpenSnackbar(true);
//       };
//       reader.readAsText(file);
//     } else {
//       setError('Please select a file to import.');
//       setOpenSnackbar(true);
//     }
//   };

//   const handleSnackbarClose = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <Container
//       maxWidth="md"
//       sx={{
//         padding: 4,
//         minHeight: '100vh',
//         backgroundImage: `url('/images/image 14.jpg')`, 
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         color: 'black', 
//       }}
//     >
//       <Typography variant="h4" sx={{ marginBottom: 2 }}>
//         Import Accounts
//       </Typography>
//       <Typography variant="body1" sx={{ marginBottom: 2 }}>
//         Upload your account data file below:
//       </Typography>

//       <Box mb={2}>
//         <input
//           accept=".csv"
//           style={{ display: 'none' }}
//           id="file-upload"
//           type="file"
//           onChange={handleFileChange}
//         />
//         <label htmlFor="file-upload">
//           <Button variant="contained" component="span" sx={{ mr: 2 }}>
//             Upload File
//           </Button>
//         </label>
//         <Typography variant="body2">{fileName}</Typography>
//       </Box>

//       <Button
//         variant="contained"
//         onClick={handleImport}
//         disabled={!fileName}
//         sx={{ marginRight: 2 }}
//       >
//         Import
//       </Button>

//       {data.length > 0 && (
//         <TableContainer component={Paper} sx={{ marginTop: 4, backgroundColor: '#fff' }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Account Type</TableCell>
//                 <TableCell>Account Number</TableCell>
//                 <TableCell>Balance</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data.map((account, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{account['Account Type']}</TableCell>
//                   <TableCell>{account['Account Number']}</TableCell>
//                   <TableCell>{account['Balance']}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
//         <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
//           {error}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default ImportAccounts;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Snackbar,
  Alert,
} from '@mui/material';

const ImportAccounts = () => {
  const [fileName, setFileName] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      // Reset data when a new file is selected
      setData([]);
      setError('');
    }
  };

  const handleImport = () => {
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split('\n').map(row => row.split(','));
        const header = rows[0];
        const dataRows = rows.slice(1).map(row => {
          const account = {};
          header.forEach((col, index) => {
            account[col.trim()] = row[index]?.trim();
          });
          return account;
        }).filter(account => account['Account Type']); // Filter out empty accounts

        setData(dataRows);
        setError('');
      };
      reader.onerror = () => {
        setError('Failed to read file. Please try again.');
        setOpenSnackbar(true);
      };
      reader.readAsText(file);
    } else {
      setError('Please select a file to import.');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        padding: 4,
        minHeight: '100vh',
        position: 'relative',
        backgroundImage: `url('/images/image 14.jpg')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'black', 
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Import Accounts
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Upload your account data file below:
      </Typography>

      <Box mb={2}>
        <input
          accept=".csv"
          style={{ display: 'none' }}
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span" sx={{ mr: 2 }}>
            Upload File
          </Button>
        </label>
        <Typography variant="body2">{fileName}</Typography>
      </Box>

      <Button
        variant="contained"
        onClick={handleImport}
        disabled={!fileName}
        sx={{ marginRight: 2 }}
      >
        Import
      </Button>

      {data.length > 0 && (
        <TableContainer component={Paper} sx={{ marginTop: 4, backgroundColor: '#fff' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Account Type</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Account Holder</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((account, index) => (
                <TableRow key={index}>
                  <TableCell>{account['Account Type']}</TableCell>
                  <TableCell>{account['Account Number']}</TableCell>
                  <TableCell>{account['Balance']}</TableCell>
                  <TableCell>{account['Account Holder']}</TableCell>
                  <TableCell>{account['Email']}</TableCell>
                  <TableCell>{account['Phone Number']}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ImportAccounts;
