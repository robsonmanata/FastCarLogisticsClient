import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const FinanceBarGraph = ({ data }) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Money Spent (Orders) vs Money Value Used',
            },
        },
    };

    const chartData = {
        labels: data?.labels || [],
        datasets: [
            {
                label: 'Money Spent (Orders)',
                data: data?.datasets?.orders || [],
                backgroundColor: '#244373', // Blue
            },
            {
                label: 'Value of Items Used',
                data: data?.datasets?.usage || [],
                backgroundColor: '#f77529', // Orange
            },
        ],
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Bar options={options} data={chartData} />
        </div>
    );
};

export default FinanceBarGraph;
