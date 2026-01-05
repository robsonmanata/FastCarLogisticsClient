import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../actions/orders';
import { getProducts } from '../actions/products';
import { ItemsOrderedStyles } from './ItemsOrderedStyles';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import Pagination from '../components/Pagination/Pagination';

const ItemsOrdered = () => {
    const dispatch = useDispatch();
    const { items: orders } = useSelector((state) => state.orders);
    const { items: products } = useSelector((state) => state.products);
    const [page, setPage] = useState(1);
    const LIMIT = 20;

    useEffect(() => {
        // Fetch all orders to aggregate items
        dispatch(getOrders('all'));
        // Fetch products to lookup images for historical orders
        dispatch(getProducts('all'));
    }, [dispatch]);

    // Create a lookup map for product images
    const productImages = products ? products.reduce((acc, curr) => {
        acc[curr._id] = curr.ProductImage;
        return acc;
    }, {}) : {};

    // Flatten all items from all orders into a single list
    const allOrderedItems = orders ? orders.flatMap(order =>
        (order.Items || []).map(item => ({
            ...item,
            // Use saved image or lookup from current products
            ResolvedImage: item.ProductImage || productImages[item.productId],
            orderNumber: order.OrderNumber,
            orderDate: order.OrderDate,
            customer: order.BilledTo
        }))
    ).sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) : [];

    // Paginate logic
    const totalCount = allOrderedItems.length;
    const numberOfPages = Math.ceil(totalCount / LIMIT);
    const displayedItems = allOrderedItems.slice((page - 1) * LIMIT, page * LIMIT);

    const styles = new ItemsOrderedStyles();

    return (
        <div style={styles.wrapper}>
            <TopBar />
            <div style={styles.contentWrapper}>
                <NavigationBar />
                <div style={styles.mainContent}>
                    <h1 style={styles.title}>Items Ordered History</h1>
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Date</th>
                                    <th style={styles.th}>Order #</th>
                                    <th style={styles.th}>Image</th>
                                    <th style={styles.th}>Product Name</th>
                                    <th style={styles.th}>Quantity</th>
                                    <th style={styles.th}>Accepted By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedItems.length > 0 ? (
                                    displayedItems.map((item, index) => (
                                        <tr key={index}>
                                            <td style={styles.td}>{new Date(item.orderDate).toLocaleDateString()}</td>
                                            <td style={styles.td}>{item.orderNumber}</td>
                                            <td style={styles.td}>
                                                {item.ResolvedImage ? (
                                                    <img src={item.ResolvedImage} alt={item.ProductName} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                                ) : (
                                                    <div style={{ width: '40px', height: '40px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}></div>
                                                )}
                                            </td>
                                            <td style={styles.td}>{item.ProductName}</td>
                                            <td style={styles.td}>{(Number(item.Quantity) || 0).toLocaleString('en-US').replace(/,/g, '\u00A0')}</td>
                                            <td style={styles.td}>{item.customer}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={styles.empty}>No items found in recent orders.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {allOrderedItems.length > 0 && (
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
    );
};

export default ItemsOrdered;
