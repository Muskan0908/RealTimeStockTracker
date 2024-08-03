import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/store';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, TimeScale);

const CryptoChart: React.FC = () => {
  const data = useSelector((state: AppState) => state.cryptoStock.data);
  const selected = useSelector((state: AppState) => state.cryptoStock.selected);

  const filteredData = data.filter((item) => item.symbol === selected);
  const prices = filteredData.map(item => item.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const chartData = {
    datasets: [{
      label: selected,
      data: filteredData.map((item) => ({ x: item.timestamp, y: item.price })),
      borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16), 
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.raw.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const,
        },
      },
      y: {
        beginAtZero: false,
        min: minPrice * 0.98,  // 2% below the minimum price
        max: maxPrice * 1.02,  // 2% above the maximum price
        ticks: {
          stepSize: (maxPrice - minPrice) / 10,  // 10 steps on the y-axis
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div>
      <h2>{selected} Prices Over Time</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default CryptoChart;
