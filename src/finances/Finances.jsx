import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FinancesStyles } from './FinancesStyles';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import FinanceBarGraph from './FinanceBarGraph';
import { getFinanceStats } from '../actions/finances';
import Pagination from '../components/Pagination/Pagination';

const Finances = () => {
    const styles = new FinancesStyles();
    const dispatch = useDispatch();
    const { data: stats, isLoading } = useSelector((state) => state.finances);

    // Pagination state
    const [page, setPage] = React.useState(1);
    const LIMIT = 6;

    // Year selection state
    const [selectedYear, setSelectedYear] = React.useState('');

    useEffect(() => {
        dispatch(getFinanceStats(selectedYear));
    }, [dispatch, selectedYear]);

    // Sync state with backend response
    useEffect(() => {
        if (!selectedYear && stats?.graphData?.year) {
            setSelectedYear(stats.graphData.year);
        }
    }, [stats?.graphData?.year]);

    console.log('Finances Stats:', stats);

    // Helper to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
            .format(amount || 0)
            .replace(/,/g, '\u00A0');
    };

    // Prepare table data safely
    const tableRows = React.useMemo(() => {
        if (!stats?.graphData?.labels || !stats?.graphData?.datasets) return [];

        const labels = stats.graphData.labels;
        const ordersData = stats.graphData.datasets.orders || [];
        const usageData = stats.graphData.datasets.usage || [];

        return labels.map((month, index) => ({
            month,
            orders: ordersData[index] || 0,
            usage: usageData[index] || 0
        })).reverse();
    }, [stats]);

    // Slice data for pagination
    const totalCount = tableRows.length;
    const numberOfPages = Math.ceil(totalCount / LIMIT);
    const displayedRows = tableRows.slice((page - 1) * LIMIT, page * LIMIT);

    return (
        <div style={styles.wrapper}>
            <TopBar />
            <div style={styles.contentWrapper}>
                <NavigationBar />
                <div style={styles.mainContent}>
                    <div style={{ ...styles.header, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1 style={styles.title}>Financial Overview</h1>
                        {/* Year Selector */}
                        {stats?.graphData?.availableYears?.length > 0 && (
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    border: '1px solid #d1d5db',
                                    backgroundColor: 'white',
                                    color: '#374151',
                                    fontSize: '0.875rem',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {stats.graphData.availableYears.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div style={styles.cardsGrid}>
                        <div style={styles.card}>
                            <div style={styles.cardValue}>{formatCurrency(stats?.totalSpent)}</div>
                            <div style={styles.cardLabel}>Total Spent on Orders</div>
                        </div>
                        <div style={styles.card}>
                            <div style={styles.cardValue}>{formatCurrency(stats?.totalUsedValue)}</div>
                            <div style={styles.cardLabel}>Total Value Used</div>
                        </div>
                        <div style={styles.card}>
                            <div style={{ ...styles.cardValue, color: '#ef4444' }}>{formatCurrency(stats?.stuckInventoryValue)}</div>
                            <div style={styles.cardLabel}>Stuck Inventory Value (&gt; 1 Year)</div>
                        </div>
                    </div>

                    <div style={styles.graphContainer}>
                        {stats?.graphData ? (
                            <FinanceBarGraph data={stats.graphData} />
                        ) : (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Loading Graph Data...</div>
                        )}
                    </div>

                    <div style={styles.tableContainer}>
                        <h3 style={{ ...styles.title, fontSize: '1.5rem', marginBottom: '1.5rem' }}>Monthly Breakdown</h3>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Month</th>
                                    <th style={styles.th}>Total Spent on Orders</th>
                                    <th style={styles.th}>Value of Items Used</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedRows.length > 0 ? (
                                    displayedRows.map((row, index) => (
                                        <tr key={index}>
                                            <td style={styles.td}>{row.month}</td>
                                            <td style={styles.td}>{formatCurrency(row.orders)}</td>
                                            <td style={styles.td}>{formatCurrency(row.usage)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" style={{ ...styles.td, textAlign: 'center', color: '#6b7280' }}>
                                            {isLoading ? 'Loading Data...' : 'No data available'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {tableRows.length > 0 && (
                            <Pagination
                                page={page}
                                count={numberOfPages}
                                total={totalCount}
                                onChange={(val) => setPage(val)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Finances;
