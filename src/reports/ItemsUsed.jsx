import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ItemsUsedStyles } from './ItemsUsedStyles';
import NavigationBar from '../navigationbar/navigationbar';
import { getProducts } from '../actions/products';
import TopBar from '../topBar/topbar';
import Pagination from '../components/Pagination/Pagination';

const ItemsUsed = () => {
    const dispatch = useDispatch();
    const { items: products } = useSelector((state) => state.products);

    // We need all products to calculate usage correctly, so we fetch 'all'
    useEffect(() => {
        dispatch(getProducts('all'));
    }, [dispatch]);

    // Filter products that have been used
    const itemsUsed = products ? products.filter(p => (Number(p.ProductQuantityUsed) || 0) > 0) : [];

    // Paginate logic
    const [page, setPage] = useState(1);
    const LIMIT = 20;

    const totalCount = itemsUsed.length;
    const numberOfPages = Math.ceil(totalCount / LIMIT);
    const displayedItems = itemsUsed.slice((page - 1) * LIMIT, page * LIMIT);

    const styles = new ItemsUsedStyles();

    return (
        <div style={styles.wrapper}>
            <TopBar />
            <div style={styles.contentWrapper}>
                <NavigationBar />
                <div style={styles.mainContent}>
                    <h1 style={styles.title}>Items Used Report</h1>
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Image</th>
                                    <th style={styles.th}>Product Name</th>
                                    <th style={styles.th}>SKU</th>
                                    <th style={styles.th}>Category</th>
                                    <th style={styles.th}>Total Used</th>
                                    <th style={styles.th}>Current Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedItems.length > 0 ? (
                                    displayedItems.map((item) => (
                                        <tr key={item._id}>
                                            <td style={styles.td}>
                                                <img src={item.ProductImage} alt={item.ProductName} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                            </td>
                                            <td style={styles.td}>{item.ProductName}</td>
                                            <td style={styles.td}>{item.ProductSKU}</td>
                                            <td style={styles.td}>{item.ProductCategory}</td>
                                            <td style={styles.td}>{(Number(item.ProductQuantityUsed) || 0).toLocaleString('en-US').replace(/,/g, '\u00A0')}</td>
                                            <td style={styles.td}>{(Number(item.ProductQuantity) || 0).toLocaleString('en-US').replace(/,/g, '\u00A0')}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={styles.empty}>No items have been used yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {itemsUsed.length > 0 && (
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

export default ItemsUsed;
