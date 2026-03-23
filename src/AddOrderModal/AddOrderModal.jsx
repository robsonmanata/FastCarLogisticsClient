import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, updateOrder, deleteOrder } from '../actions/orders';
import { openAddProductModal, setScannedBarcode } from '../actions/ui';
import { getProducts } from '../actions/products';
import { checkProductByBarcode } from '../api/index';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddOrderModalStyles } from './addordermodalstyle';

const AddOrderModal = ({ onClose, currentId, setCurrentId }) => {
    const styles = new AddOrderModalStyles();
    const dispatch = useDispatch();
    const { items: products } = useSelector((state) => state.products);
    const orderToEdit = useSelector((state) => {
        // Handle both old array state and new object state for robustness
        const ordersList = state.orders.items || (Array.isArray(state.orders) ? state.orders : []);
        return currentId ? ordersList.find((o) => o._id === currentId) : null;
    });

    useEffect(() => {
        dispatch(getProducts('all'));
    }, [dispatch]);

    useEffect(() => {
        if (orderToEdit) {
            setFormData({ ...orderToEdit, Items: orderToEdit.Items || [] });
        }
    }, [orderToEdit]);

    const user = JSON.parse(localStorage.getItem('profile'));
    const userName = user?.result?.name ? `${user.result.name} ${user.result.surname || ''}`.trim() : 'Unknown User';

    const [formData, setFormData] = useState({
        OrderNumber: '',
        BilledTo: userName,
        Items: []
    });

    const [currentItem, setCurrentItem] = useState({
        productId: '',
        Quantity: 1
    });

    const [scanInput, setScanInput] = useState('');

    useEffect(() => {
        if (scanInput && scanInput.trim() !== '') {
            const checkScan = async () => {
                try {
                    const { data } = await checkProductByBarcode(scanInput.trim());
                    if (data.exists && data.product) {
                        // Product exists, add it directly to standard order list
                        const product = data.product;
                        const newItem = {
                            productId: product._id,
                            ProductName: product.ProductName,
                            ProductImage: product.ProductImage,
                            Quantity: 1, // Default add 1
                            Price: product.ProductPrice
                        };

                        setFormData(prev => ({
                            ...prev,
                            Items: [...(prev.Items || []), newItem]
                        }));

                        setScanInput(''); // Clear input for next scan
                    } else {
                        // Product not found, redirect to Add Product
                        dispatch(setScannedBarcode(scanInput.trim()));
                        dispatch(openAddProductModal());
                        setScanInput(''); // Clear input for next scan
                    }
                } catch (error) {
                    console.error('Error checking barcode during order:', error);
                }
            };

            const timeoutId = setTimeout(() => {
                checkScan();
            }, 300); // 300ms is enough for most scanners

            return () => clearTimeout(timeoutId);
        }
    }, [scanInput, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        if (name === 'productId' && value === 'new_product') {
            dispatch(openAddProductModal());
            // Reset selection so the "Add New Product" option isn't stuck as selected
            setCurrentItem({ ...currentItem, productId: '' });
        } else {
            setCurrentItem({ ...currentItem, [name]: value });
        }
    };

    const addItem = () => {
        const product = Array.isArray(products) ? products.find(p => p && p._id === currentItem.productId) : null;
        if (product) {
            const newItem = {
                productId: product._id,
                ProductName: product.ProductName,
                ProductImage: product.ProductImage,
                Quantity: Number(currentItem.Quantity),
                Price: product.ProductPrice
            };
            setFormData({
                ...formData,
                Items: [...(formData.Items || []), newItem]
            });
            setCurrentItem({ productId: '', Quantity: 1 });
        }
    };

    const removeItem = (index) => {
        const newItems = (formData.Items || []).filter((_, i) => i !== index);
        setFormData({ ...formData, Items: newItems });
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const currentItems = formData.Items || [];
        const total = currentItems.reduce((acc, item) => acc + ((item?.Price || 0) * (item?.Quantity || 0)), 0);

        if (currentId) {
            await dispatch(updateOrder(currentId, { ...formData, Items: currentItems, Total: total }));
            setCurrentId(null);
        } else {
            await dispatch(createOrder({ ...formData, Items: currentItems, Total: total }));
        }
        setIsLoading(false);
        onClose();
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this order? This will revert the stock changes.')) {
            setIsLoading(true);
            await dispatch(deleteOrder(currentId));
            setIsLoading(false);
            setCurrentId(null);
            onClose();
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h2 style={styles.title}>{currentId ? 'Edit Order' : 'Add New Order'}</h2>
                    <button onClick={onClose} style={styles.closeButton}>
                        <CloseIcon />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Order Number</label>
                            <input
                                type="text"
                                name="OrderNumber"
                                value={formData.OrderNumber}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Accepted by</label>
                            <input
                                type="text"
                                name="BilledTo"
                                value={formData.BilledTo}
                                onChange={handleChange}
                                style={{ ...styles.input, backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
                                readOnly
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Add Items (Scan or Select)</label>

                        {/* Barcode Scanner Input */}
                        <div style={{ marginBottom: '0.75rem' }}>
                            <input
                                type="text"
                                placeholder="Scan Barcode Here to Add Item..."
                                value={scanInput}
                                onChange={(e) => setScanInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault(); // Prevent standard form submission
                                    }
                                }}
                                style={{
                                    ...styles.input,
                                    border: '2px solid #1d1d1d',
                                    backgroundColor: '#1d1d1d',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}
                                autoFocus
                            />
                        </div>

                        <div style={styles.addItemGroup}>
                            <select
                                name="productId"
                                value={currentItem.productId}
                                onChange={handleItemChange}
                                style={{ ...styles.select, flex: 2 }}
                            >
                                <option value="">Select Product Manually</option>
                                <option value="new_product" style={{ fontWeight: 'bold', color: '#2563eb' }}>+ Add New Product</option>
                                {Array.isArray(products) && [...products].filter(p => p && p.ProductName).sort((a, b) => a.ProductName.localeCompare(b.ProductName)).map(p => (
                                    <option key={p._id} value={p._id}>{p.ProductName}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                name="Quantity"
                                value={currentItem.Quantity}
                                onChange={handleItemChange}
                                style={{ ...styles.input, flex: 1 }}
                                min="1"
                            />
                            <button type="button" onClick={addItem} style={styles.addButton}>Add</button>
                        </div>
                    </div>

                    {formData.Items && formData.Items.length > 0 && (
                        <div style={styles.itemsList}>
                            {formData.Items.map((item, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                    <span>{item?.ProductName || 'Unknown Product'} x {item?.Quantity || 0}</span>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span>${(item?.Price || 0) * (item?.Quantity || 0)}</span>
                                        <DeleteIcon style={styles.removeIcon} onClick={() => removeItem(index)} fontSize="small" />
                                    </div>
                                </div>
                            ))}
                            <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '0.5rem', paddingTop: '0.5rem', fontWeight: 'bold', textAlign: 'right' }}>
                                Total: ${formData.Items.reduce((acc, item) => acc + ((item?.Price || 0) * (item?.Quantity || 0)), 0)}
                            </div>
                        </div>
                    )}

                    <button type="submit" disabled={isLoading} style={{ ...styles.submitButton, backgroundColor: isLoading ? '#9ca3af' : '#1f2937', cursor: isLoading ? 'not-allowed' : 'pointer' }}>
                        {isLoading ? 'Processing...' : (currentId ? 'Update Order' : 'Create Order')}
                    </button>
                    {currentId && (
                        <button type="button" onClick={handleDelete} disabled={isLoading} style={{ ...styles.deleteButton, opacity: isLoading ? 0.5 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}>
                            Delete Order
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddOrderModal;
