import React from 'react';
import './utils/classNameGenerator';
import { CardComponent } from './components/Card';
import useScript from './hooks/useScript';


const App = () => {
  const isLoad = useScript('https://cdn.jsdelivr.net/npm/chart.js')

  return (
    <div>
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            font-family: Arial, sans-serif;
          }
          .dashboard {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 20px;
          margin: 20px;
        }
          .box {
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            padding: 20px;
            text-align: center;
            box-shadow: 2px 2px 5px #888888;
        }
          .chart-container {
            height: 200px;
        }
          .line-chart{
             height: 400px;
          }
        `
      }}>
      </style>
      {isLoad && <CardComponent />}
    </div>)
}


export default App;
