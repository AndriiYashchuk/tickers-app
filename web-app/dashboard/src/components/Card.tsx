// @ts-nocheck
import React, { useEffect } from 'react';


export const CardComponent = () => {
  useEffect(() => {
    // Pie Chart Data
    const pieChart1Data = {
      labels: ['Label A', 'Label B', 'Label C'],
      datasets: [{
        data: [30, 40, 30],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 205, 86, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 205, 86, 1)'],
        borderWidth: 1
      }]
    };

    const pieChart2Data = {
      labels: ['Label X', 'Label Y', 'Label Z'],
      datasets: [{
        data: [20, 60, 20],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1
      }]
    };

    // Histogram Data
    const histogram1Data = {
      labels: ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 5'],
      datasets: [{
        label: 'Histogram 1',
        data: [10, 20, 5, 30, 15],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };

    const histogram2Data = {
      labels: ['Value A', 'Value B', 'Value C', 'Value D', 'Value E'],
      datasets: [{
        label: 'Histogram 2',
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
    const pieChart2 = new Chart(ctxPieChart2, {
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
      for (let i = 0; i < count; i++)
      {
        data.push(Math.random() * 1000);
      }
      return data;
    }

    // Stock Index Data
    const ctxStockIndex = document.getElementById('stockIndexChart').getContext('2d');
    new Chart(ctxStockIndex, {
      type: 'line',
      data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
        datasets: [
          {
            label: 'Stock Index',
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
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
        datasets: [
          {
            label: 'Stock Index',
            data: generateRandomData(6),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
          }]
      }
    });
  }, []);

  return (
    <div>
      <title>Dashboard with Charts</title>
      <h1>Dashboard with Charts</h1>
      <div className="dashboard">
        <div className="box">
          <h2>Data 1</h2>
          <p>Some information or data here.</p>
          <div className="chart-container">
            <canvas id="pieChart1"></canvas>
          </div>
        </div>
        <div className="box">
          <h2>Data 2</h2>
          <p>More information or data here.</p>
          <div className="chart-container">
            <canvas id="pieChart2"></canvas>
          </div>
        </div>
        <div className="box">
          <h2>Data 3</h2>
          <p>Additional information or data here.</p>
          <div className="chart-container">
            <canvas id="histogram1"></canvas>
          </div>
        </div>
        <div className="box">
          <h2>Data 4</h2>
          <p>Even more information or data here.</p>
          <div className="chart-container">
            <canvas id="histogram2"></canvas>
          </div>
        </div>
        <div className="box chart-container line-chart">
          <h2>Stock Index</h2>
          <canvas id="stockIndexChart"></canvas>
        </div>
        <div className="box chart-container line-chart">
          <h2>Chart 2</h2>
          <canvas id="chart2"></canvas>
        </div>
      </div>
    </div>
  );
}
