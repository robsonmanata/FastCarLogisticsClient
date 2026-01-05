import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OrdersStyles } from './ordersstyle';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getOrders } from '../actions/orders';
import AddOrderModal from '../AddOrderModal/AddOrderModal';
import Pagination from '../components/Pagination/Pagination';

const Orders = () => {
    const styles = new OrdersStyles();
    const dispatch = useDispatch();
    const { items: orders, meta } = useSelector((state) => state.orders);
    const [expandedRow, setExpandedRow] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [currentId, setCurrentId] = useState(null);
    const page = meta?.currentPage || 1;
    const totalCount = meta?.totalCount || 0;
    const numberOfPages = meta?.numberOfPages || 1;

    useEffect(() => {
        dispatch(getOrders(1));
    }, [dispatch]);

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
                            <input type="text" placeholder="Search orders..." style={styles.searchBar} />
                            <button style={styles.filterButton}>
                                <FilterListIcon /> Filter
                            </button>
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
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" style={{ ...styles.td, textAlign: 'center' }}>No orders found.</td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
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
                                                    <td colSpan="7">
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
                    {orders?.length > 0 && (
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
