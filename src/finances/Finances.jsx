import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FinancesStyles } from './FinancesStyles';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import FinanceBarGraph from './FinanceBarGraph';
import { getFinanceStats } from '../actions/finances';

const Finances = () => {
    const styles = new FinancesStyles();
    const dispatch = useDispatch();
    const { data: stats, isLoading } = useSelector((state) => state.finances);

    useEffect(() => {
        dispatch(getFinanceStats());
    }, [dispatch]);

    // Helper to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
    };

    return (
        <div style={styles.wrapper}>
            <TopBar />
            <div style={styles.contentWrapper}>
                <NavigationBar />
                <div style={styles.mainContent}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>Financial Overview</h1>
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
                            <div style={styles.cardLabel}>Stuck Inventory Value (> 1 Year)</div>
                        </div>
                    </div>

                    <div style={styles.graphContainer}>
                        {stats?.graphData ? (
                            <FinanceBarGraph data={stats.graphData} />
                        ) : (
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Loading Graph Data...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Finances;
