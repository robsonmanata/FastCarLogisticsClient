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
    scales: {
        x: {
            ticks: {
                autoSkip: false,
                maxRotation: 45,
                minRotation: 45
            }
        }
    }
};

const BarGraph = ({ data }) => {
    // If no data provided, default to empty structure to prevent errors
    const chartData = data || {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: []
    };

    // Update chart title if year is available
    const chartYear = chartData.year || '';
    const titleText = `Items Ordered vs Items Used ${chartYear ? `(${chartYear})` : ''}`;

    // Clone options to avoid mutating global reference if using strict mode or reuse
    const chartOptions = {
        ...options,
        plugins: {
            ...options.plugins,
            title: {
                ...options.plugins.title,
                text: titleText
            }
        }
    };

    const finalData = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Items Ordered',
                data: chartData.datasets.itemsOrdered || [],
                backgroundColor: '#244373', // Blue
            },
            {
                label: 'Items Used',
                data: chartData.datasets.itemsUsed || [],
                backgroundColor: '#f77529', // Orange
            },
        ],
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginTop: '2rem' }}>
            <Bar options={chartOptions} data={finalData} />
        </div>
    );
};

export default BarGraph;
