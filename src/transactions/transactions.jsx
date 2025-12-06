import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionsStyles } from './transactionsstyle';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import { getTransactions } from '../actions/transactions';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const Transactions = () => {
    const styles = new TransactionsStyles();
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions);

    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterType, setFilterType] = useState('');
    const [filterDate, setFilterDate] = useState({ start: '', end: '' });

    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch]);

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch = (transaction._id && transaction._id.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (transaction.User && transaction.User.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (transaction.Type && transaction.Type.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (transaction.Items && transaction.Items.some(item => item.ProductName && item.ProductName.toLowerCase().includes(searchQuery.toLowerCase())));

        const matchesType = filterType ? transaction.Type.includes(filterType) : true;

        const date = new Date(transaction.TransactionDate);
        const matchesDate = (filterDate.start === '' || date >= new Date(filterDate.start)) &&
            (filterDate.end === '' || date <= new Date(filterDate.end));

        return matchesSearch && matchesType && matchesDate;
    });

    // Get unique transaction types for filter dropdown
    const transactionTypes = [...new Set(transactions.map(t => t.Type))];

    return (
        <div style={styles.wrapper}>
            <TopBar />
            <div style={styles.contentWrapper}>
                <NavigationBar />
                <div style={styles.mainContent}>
                    <h1 style={styles.title}>Transactions</h1>
                    <span style={styles.subtitle}>View your transaction history</span>

                    <div style={styles.controls}>
                        <div style={styles.searchContainer}>
                            <SearchIcon style={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                style={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div style={styles.filterContainer}>
                            <button style={styles.filterButton} onClick={() => setIsFilterOpen(!isFilterOpen)}>
                                <FilterListIcon /> {filterType || 'Filter'}
                            </button>
                            {isFilterOpen && (
                                <div style={styles.filterDropdown}>
                                    <div style={styles.filterGroup}>
                                        <label style={styles.filterLabel}>Transaction Type</label>
                                        <select
                                            value={filterType}
                                            onChange={(e) => setFilterType(e.target.value)}
                                            style={styles.filterSelect}
                                        >
                                            <option value="" style={styles.filterOption}>All Types</option>
                                            {transactionTypes.map((type, index) => (
                                                <option key={index} value={type} style={styles.filterOption}>{type}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div style={styles.filterGroup}>
                                        <label style={styles.filterLabel}>Date Range</label>
                                        <div style={styles.filterDateGroup}>
                                            <input
                                                type="date"
                                                value={filterDate.start}
                                                onChange={(e) => setFilterDate({ ...filterDate, start: e.target.value })}
                                                style={styles.filterDateInput}
                                            />
                                            <input
                                                type="date"
                                                value={filterDate.end}
                                                onChange={(e) => setFilterDate({ ...filterDate, end: e.target.value })}
                                                style={styles.filterDateInput}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setFilterType('');
                                            setFilterDate({ start: '', end: '' });
                                        }}
                                        style={styles.clearFiltersButton}
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                <tr>
                                    <th style={{ padding: '1rem', fontWeight: '600', color: '#374151', fontSize: '0.875rem' }}>TRANSACTION ID</th>
                                    <th style={{ padding: '1rem', fontWeight: '600', color: '#374151', fontSize: '0.875rem' }}>DATE</th>
                                    <th style={{ padding: '1rem', fontWeight: '600', color: '#374151', fontSize: '0.875rem' }}>USER</th>
                                    <th style={{ padding: '1rem', fontWeight: '600', color: '#374151', fontSize: '0.875rem' }}>TYPE</th>
                                    <th style={{ padding: '1rem', fontWeight: '600', color: '#374151', fontSize: '0.875rem' }}>ITEMS MODIFIED</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No transactions found.</td>
                                    </tr>
                                ) : (
                                    filteredTransactions.map((transaction) => (
                                        <tr key={transaction._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                            <td style={{ padding: '1rem', color: '#111827', fontSize: '0.875rem' }}>{transaction._id}</td>
                                            <td style={{ padding: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>{new Date(transaction.TransactionDate).toLocaleString()}</td>
                                            <td style={{ padding: '1rem', color: '#111827', fontSize: '0.875rem' }}>{transaction.User || 'System'}</td>
                                            <td style={{ padding: '1rem', color: '#111827', fontSize: '0.875rem' }}>
                                                <span style={{
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '9999px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    backgroundColor: ['Restock', 'Delivery Accepted', 'Delivery Correction (Apply)', 'Product Created', 'Category Created', 'Warehouse Created'].some(type => transaction.Type.includes(type)) ? '#d1fae5' : '#fee2e2',
                                                    color: ['Restock', 'Delivery Accepted', 'Delivery Correction (Apply)', 'Product Created', 'Category Created', 'Warehouse Created'].some(type => transaction.Type.includes(type)) ? '#065f46' : '#991b1b'
                                                }}>
                                                    {transaction.Type}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', color: '#111827', fontSize: '0.875rem' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                                    {transaction.Items && transaction.Items.map((item, index) => (
                                                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                                                            <span>{item.ProductName || (item.ProductId && item.ProductId.ProductName) || 'Unknown Product'}</span>
                                                            {!['Category Created', 'Warehouse Created', 'Category Deleted', 'Warehouse Deleted'].includes(transaction.Type) && (
                                                                <span style={{ fontWeight: '600', color: item.Quantity > 0 ? '#059669' : '#dc2626', marginLeft: '1rem' }}>
                                                                    {item.Quantity > 0 ? '+' : ''}{item.Quantity}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
