import React, { useEffect, useState } from 'react';
import './LineChart.css';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    if (historicalData && historicalData.prices) {
      const dataCopy = [["Date", "Prices"]];
      historicalData.prices.forEach((item) => {
        dataCopy.push([new Date(item[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), item[1]]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <div className="line-chart">
      <Chart
        chartType="LineChart"
        data={data}
        options={{
          title: 'Price Trends',
          hAxis: { title: 'Date' },
          vAxis: { title: 'Price' },
          legend: 'none',
        }}
        width="100%"
        height="400px"
      />
    </div>
  );
};

export default LineChart;
