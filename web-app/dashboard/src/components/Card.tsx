/* eslint-disable no-undef,no-new */
// @ts-nocheck
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';

export const CardComponent = () => {
  useEffect(() => {
    // Pie Chart Data
    const pieChart1Data = {
      labels: ['SPY', 'VOO', 'IEF'],
      datasets: [{
        data: [30, 40, 30],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 205, 86, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 205, 86, 1)'],
        borderWidth: 1
      }]
    };

    const pieChart2Data = {
      labels: ['TSLA', 'NVDA', 'META'],
      datasets: [{
        data: [20, 60, 20],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1
      }]
    };

    // Histogram Data
    const histogram1Data = {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [{
        label: 'cash-flow',
        data: [10, 20, 5, 30, 15],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    const histogram2Data = {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [{
        label: 'cash-flow',
        data: [25, 15, 10, 5, 20],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    };

    // Create Pie Charts
    const ctxPieChart1 = document.getElementById('pieChart1').getContext('2d');
    new Chart(ctxPieChart1, {
      type: 'pie',
      data: pieChart1Data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    const ctxPieChart2 = document.getElementById('pieChart2').getContext('2d');
    new Chart(ctxPieChart2, {
      type: 'pie',
      data: pieChart2Data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // Create Histograms
    const ctxHistogram1 = document.getElementById('histogram1').getContext('2d');
    new Chart(ctxHistogram1, {
      type: 'bar',
      data: histogram1Data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const ctxHistogram2 = document.getElementById('histogram2').getContext('2d');
    new Chart(ctxHistogram2, {
      type: 'bar',
      data: histogram2Data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Simulate stock index data
    function generateRandomData(count) {
      const data = [];
      for (let i = 0; i < count; i++) {
        data.push(Math.random() * 1000);
      }
      return data;
    }

    // Stock Index Data
    const ctxStockIndex = document.getElementById('stockIndexChart').getContext('2d');
    new Chart(ctxStockIndex, {
      type: 'line',
      data: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: 'snp500',
            data: generateRandomData(6),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
          }]
      }
    });

    // chart 2 Data
    const ctxStockIndex2 = document.getElementById('chart2').getContext('2d');
    new Chart(ctxStockIndex2, {
      type: 'line',
      data: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: 'dj',
            data: generateRandomData(6),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
          }]
      }
    });
  }, []);

  return (
    <Container>
      <Grid container spacing={0} mt={1}>
        <Typography
          align="center"
          variant={'h4'}
        >
          Dashboard with Charts
        </Typography>
      </Grid>
      <Grid container spacing={0} mt={2}>
        <Grid
          spacing={1}
          className="box"
          xs={12}
          md={6}
          xl={4}
        >
          <h2>Main Portfolio</h2>
          <p>The main portfolio to reach the goals</p>
          <div className="chart-container">
            <canvas id="pieChart1" />
          </div>
        </Grid>
        <Grid
          spacing={1}
          className="box"
          xs={12}
          md={6}
          xl={4}
        >
          <h2>Risking Portfolio</h2>
          <p>The portfolio with risking instruments</p>
          <div className="chart-container">
            <canvas id="pieChart2" />
          </div>
        </Grid>
        <Grid
          spacing={1}
          className="box"
          xs={12}
          md={6}
          xl={4}
        >
          <h2>Main Portfolio Report</h2>
          <p>Cash Flow by years</p>
          <div className="chart-container">
            <canvas id="histogram1" />
          </div>
        </Grid>
        <Grid
          spacing={1}
          className="box"
          xs={12}
          md={6}
          xl={4}
        >
          <h2>Risking Portfolio Report</h2>
          <p>Cash Flow by years</p>
          <div className="chart-container">
            <canvas id="histogram2" />
          </div>
        </Grid>
        <Grid
          spacing={1}
          className="box chart-container line-chart"
          xs={12}
          md={6}
          xl={4}
        >
          <h2>SNP 500</h2>
          <p>SNP 500 by years</p>
          <canvas id="stockIndexChart" />
        </Grid>
        <Grid
          spacing={1}
          className="box chart-container line-chart"
          xs={12}
          md={6}
          xl={4}
        >
          <h2>Dow Jones index</h2>
          <p>Dow Jones index by years</p>
          <canvas id="chart2" />
        </Grid>
      </Grid>
    </Container>
  );
};
