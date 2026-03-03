import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { OrdersStyles } from './ordersstyle';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import { getOrders } from '../actions/orders';
import AddOrderModal from '../AddOrderModal/AddOrderModal';
import Pagination from '../components/Pagination/Pagination';

const Orders = () => {
    const styles = new OrdersStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const { items: orders, meta } = useSelector((state) => state.orders);
    const [expandedRow, setExpandedRow] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [currentId, setCurrentId] = useState(null);
    const page = meta?.currentPage || 1;
    const totalCount = meta?.totalCount || 0;
    const numberOfPages = meta?.numberOfPages || 1;

    // Search and Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterDate, setFilterDate] = useState({ start: '', end: '' });
    const [filterTotal, setFilterTotal] = useState({ min: '', max: '' });

    useEffect(() => {
        dispatch(getOrders(1));
        if (location.state?.openAddModal) {
            setIsAddModalOpen(true);
            // Optional: clear state so it doesn't reopen if they refresh
            window.history.replaceState({}, document.title)
        }
    }, [dispatch, location.state]);

    console.log('Orders state:', orders);

    const toggleRow = (id) => {
        if (expandedRow === id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(id);
        }
    };

    const handleEdit = (id) => {
        setCurrentId(id);
        setIsAddModalOpen(true);
    };

    const filteredOrders = orders?.filter((order) => {
        // Search matching
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            (order.OrderNumber && order.OrderNumber.toLowerCase().includes(searchLower)) ||
            (order.BilledTo && order.BilledTo.toLowerCase().includes(searchLower)) ||
            (order.Items && order.Items.some(item =>
                (item.ProductName && item.ProductName.toLowerCase().includes(searchLower)) ||
                (item.ProductSKU && item.ProductSKU.toLowerCase().includes(searchLower)) ||
                (item.ProductBarcode && item.ProductBarcode.toLowerCase().includes(searchLower))
            ));

        // Date matching
        const orderDate = new Date(order.OrderDate);
        const matchesDate =
            (filterDate.start === '' || orderDate >= new Date(filterDate.start)) &&
            (filterDate.end === '' || orderDate <= new Date(filterDate.end));

        // Total matching
        const total = Number(order.Total) || 0;
        const matchesTotal =
            (filterTotal.min === '' || total >= Number(filterTotal.min)) &&
            (filterTotal.max === '' || total <= Number(filterTotal.max));

        return matchesSearch && matchesDate && matchesTotal;
    }) || [];

    if (!orders) {
        return (
            <div style={styles.wrapper}>
                <TopBar />
                <div style={styles.contentWrapper}>
                    <NavigationBar />
                    <div style={styles.mainContent}>
                        <h1>Loading orders...</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            <TopBar />
            <div style={styles.contentWrapper}>
                <NavigationBar />
                <div style={styles.mainContent} className="main-content">
                    <div style={styles.header}>
                        <div style={styles.titleGroup}>
                            <h1 style={styles.title}>Orders</h1>
                            <span style={styles.subtitle}>Manage your orders</span>
                        </div>
                        <div style={styles.actionsGroup}>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                <SearchIcon style={{ position: 'absolute', left: '10px', color: '#9ca3af', width: '20px', height: '20px' }} />
                                <input
                                    type="text"
                                    placeholder="Search orders, customers, items..."
                                    style={{ ...styles.searchBar, paddingLeft: '2.5rem' }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div style={{ position: 'relative' }}>
                                <button style={styles.filterButton} onClick={() => setIsFilterOpen(!isFilterOpen)}>
                                    <FilterListIcon /> Filter
                                </button>
                                {isFilterOpen && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        right: '0',
                                        marginTop: '0.5rem',
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                        border: '1px solid #e5e7eb',
                                        padding: '1rem',
                                        zIndex: 10,
                                        width: '300px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem'
                                    }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Date Added</label>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <input
                                                    type="date"
                                                    value={filterDate.start}
                                                    onChange={(e) => setFilterDate({ ...filterDate, start: e.target.value })}
                                                    style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', width: '100%' }}
                                                />
                                                <input
                                                    type="date"
                                                    value={filterDate.end}
                                                    onChange={(e) => setFilterDate({ ...filterDate, end: e.target.value })}
                                                    style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', width: '100%' }}
                                                />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#374151' }}>Total Range</label>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={filterTotal.min}
                                                    onChange={(e) => setFilterTotal({ ...filterTotal, min: e.target.value })}
                                                    style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', width: '100%' }}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={filterTotal.max}
                                                    onChange={(e) => setFilterTotal({ ...filterTotal, max: e.target.value })}
                                                    style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', width: '100%' }}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setFilterDate({ start: '', end: '' });
                                                setFilterTotal({ min: '', max: '' });
                                            }}
                                            style={{
                                                padding: '0.5rem',
                                                backgroundColor: '#f3f4f6',
                                                border: '1px solid #d1d5db',
                                                borderRadius: '6px',
                                                color: '#374151',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                fontWeight: '500',
                                                marginTop: '0.5rem'
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
                                            onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                )}
                            </div>
                            <button style={styles.addOrderButton} onClick={() => { setCurrentId(null); setIsAddModalOpen(true); }}>
                                <AddIcon /> Add Order
                            </button>
                        </div>
                    </div>

                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}></th>
                                    <th style={styles.th}>ORDER #</th>
                                    <th style={styles.th}>ORDER DATE</th>
                                    <th style={styles.th}>ACCEPTED BY</th>
                                    <th style={styles.th}>TOTAL</th>
                                    <th style={styles.th}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ ...styles.td, textAlign: 'center' }}>No orders found matching your criteria.</td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order) => (
                                        <React.Fragment key={order._id}>
                                            <tr style={styles.tr}>
                                                <td style={styles.td}>
                                                    <div onClick={() => toggleRow(order._id)} style={{ cursor: 'pointer' }}>
                                                        {expandedRow === order._id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </div>
                                                </td>
                                                <td style={styles.td}>{order.OrderNumber}</td>
                                                <td style={styles.td}>{new Date(order.OrderDate).toLocaleDateString()}</td>
                                                <td style={styles.td}>{order.BilledTo}</td>
                                                <td style={styles.td}>${(Number(order.Total) || 0).toLocaleString('en-US').replace(/,/g, '\u00A0')}</td>
                                                <td style={styles.td}>
                                                    <button style={styles.actionButton} onClick={() => handleEdit(order._id)}>
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                            {expandedRow === order._id && (
                                                <tr style={styles.expandedRow}>
                                                    <td colSpan="6">
                                                        <div style={styles.detailsContainer}>
                                                            <h3 style={styles.detailsTitle}>Order Details</h3>
                                                            <table style={styles.itemsTable}>
                                                                <thead>
                                                                    <tr>
                                                                        <th style={styles.itemTh}>Product Name</th>
                                                                        <th style={styles.itemTh}>Quantity</th>
                                                                        <th style={styles.itemTh}>Price</th>
                                                                        <th style={styles.itemTh}>Total</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {order.Items && order.Items.length > 0 ? (
                                                                        order.Items.map((item, index) => (
                                                                            <tr key={index}>
                                                                                <td style={styles.itemTd}>{item.ProductName}</td>
                                                                                <td style={styles.itemTd}>{(Number(item.Quantity) || 0).toLocaleString('en-US').replace(/,/g, '\u00A0')}</td>
                                                                                <td style={styles.itemTd}>${(Number(item.Price) || 0).toLocaleString('en-US').replace(/,/g, '\u00A0')}</td>
                                                                                <td style={styles.itemTd}>${(Number(item.Quantity * item.Price) || 0).toLocaleString('en-US').replace(/,/g, '\u00A0')}</td>
                                                                            </tr>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="4" style={styles.itemTd}>No items in this order</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {filteredOrders?.length > 0 && orders?.length > 0 && (
                        <Pagination
                            page={Number(page)}
                            count={numberOfPages}
                            total={totalCount}
                            onChange={(val) => dispatch(getOrders(val))}
                        />
                    )}
                </div>
            </div>
            {isAddModalOpen && <AddOrderModal currentId={currentId} setCurrentId={setCurrentId} onClose={() => { setIsAddModalOpen(false); setCurrentId(null); }} />}
        </div >
    );
};

export default Orders;
