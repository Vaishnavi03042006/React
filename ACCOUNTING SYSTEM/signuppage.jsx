import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

function Sign() {
  const navigate = useNavigate(); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const statesAndCities = {
    "TamilNadu": ["Chennai", "Madurai", "Trichy"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    "Karnataka": ["Bangalore", "Mysore", "Hubili"]
  };

  const isFormValid = () => {
    const currentErrors = {};
    if (!firstName) currentErrors.firstName = "Please enter your First Name.";
    if (!lastName) currentErrors.lastName = "Please enter your Last Name.";
    if (!state) currentErrors.state = "Please select a State.";
    if (!city) currentErrors.city = "Please select a City.";
    if (!phoneNumber) currentErrors.phoneNumber = "Please enter your Phone Number.";
    if (!email) currentErrors.email = "Please enter your Email Address.";
    
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (isFormValid()) {
      navigate('/'); // Navigate to the homepage
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Sign Up</h1>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '500px', 
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        <form onSubmit={handleSubmit}> {/* Wrap fields in a form */}
          {[
            { label: 'First Name', value: firstName, setter: setFirstName, placeholder: 'Enter your First Name', error: errors.firstName },
            { label: 'Last Name', value: lastName, setter: setLastName, placeholder: 'Enter your Last Name', error: errors.lastName },
            { label: 'Phone Number', value: phoneNumber, setter: setPhoneNumber, placeholder: 'Enter your Phone Number', error: errors.phoneNumber },
            { label: 'Email Address', value: email, setter: setEmail, placeholder: 'Enter your Email Address', error: errors.email },
          ].map((field, index) => (
            <Box key={index} mb={2}>
              <TextField
                label={field.placeholder}
                variant="outlined"
                size="small"
                fullWidth
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                error={Boolean(field.error)}
                helperText={field.error}
              />
            </Box>
          ))}
          <Box mb={2}>
            <TextField
              select
              label="Select State"
              variant="outlined"
              size="small"
              fullWidth
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setCity(''); 
              }}
              error={Boolean(errors.state)}
              helperText={errors.state}
            >
              {Object.keys(statesAndCities).map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mb={2}>
            <TextField
              select
              label="Select City"
              variant="outlined"
              size="small"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!state}
              error={Boolean(errors.city)}
              helperText={errors.city}
            >
              {state ? statesAndCities[state].map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              )) : <MenuItem value="">Select a state first</MenuItem>}
            </TextField>
          </Box>
          <Button 
            type="submit" // Set type to submit
            variant="contained" 
            color="primary" 
            style={{ marginTop: '20px', width: '100%' }}
          >
            Sign Up
          </Button>
        </form>
        <Box mt={2} display="flex" justifyContent="center" flexDirection="column" alignItems="center">
          <p style={{ margin: 0 }}>Already have an account?</p>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={() => navigate('/login')} 
            style={{ marginTop: '10px', width: '100%' }}
          >
            Back to Login
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default Sign;
