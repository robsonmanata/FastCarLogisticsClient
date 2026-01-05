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

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Items Ordered vs Items Used',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
        {
            label: 'Items Order',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: '#244373', // Blue
        },
        {
            label: 'Items Used',
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: '#f77529', // Orange
        },
    ],
};

const BarGraph = () => {
    return (
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginTop: '2rem' }}>
            <Bar options={options} data={data} />
        </div>
    );
};

export default BarGraph;
