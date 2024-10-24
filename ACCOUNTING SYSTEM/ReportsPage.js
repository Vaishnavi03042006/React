import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { saveAs } from 'file-saver';
Chart.register(...registerables);

const ReportsPage = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: []
  });

  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
  });

  useEffect(() => {
    // Simulated data fetching
    const fetchData = async () => {
      // Simulate fetching data from an API
      const fetchedData = {
        labels: [
          'January', 'February', 'March', 'April', 'May', 
          'June', 'July', 'August', 'September', 'October', 
          'November', 'December'
        ],
        datasets: [
          {
            label: 'Monthly Revenue',
            data: [1200, 1900, 3000, 500, 2500, 4000, 3500, 4500, 3000, 3800, 5000, 6000],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
          {
            label: 'Monthly Expenses',
            data: [800, 1600, 2500, 2000, 1800, 3000, 2500, 2200, 2000, 2100, 2800, 3200],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
        ],
      };
      
      // Set data
      setData(fetchedData);

      // Calculate summary statistics
      const totalRevenue = fetchedData.datasets[0].data.reduce((a, b) => a + b, 0);
      const totalExpenses = fetchedData.datasets[1].data.reduce((a, b) => a + b, 0);
      setSummary({ totalRevenue, totalExpenses });
    };

    fetchData();
  }, []);

  const handleExportCSV = () => {
    const csvData = [
      ['Month', 'Revenue', 'Expenses'],
      ...data.labels.map((label, index) => [
        label,
        data.datasets[0].data[index],
        data.datasets[1].data[index]
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      csvData.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "monthly_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      <Typography variant="h4" color="black" fontWeight="bold" mb={3}>
        Financial Reports
      </Typography>
      <Box mb={4}>
        <Typography variant="h6">Monthly Revenue and Expenses (Last 12 Months)</Typography>
        <Bar data={data} options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }} />
      </Box>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">Summary Statistics</Typography>
            <Typography>Total Revenue: ${summary.totalRevenue}</Typography>
            <Typography>Total Expenses: ${summary.totalExpenses}</Typography>
            <Typography>
              Profit: ${summary.totalRevenue - summary.totalExpenses}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleExportCSV}
        sx={{ marginBottom: 2 }}
      >
        Export Report as CSV
      </Button>
    </Container>
  );
};

export default ReportsPage;
