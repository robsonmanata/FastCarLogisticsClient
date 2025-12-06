import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, updateOrder, deleteOrder } from '../actions/orders';
import { getProducts } from '../actions/products';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const AddOrderModal = ({ onClose, currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const orderToEdit = useSelector((state) => currentId && Array.isArray(state.orders) ? state.orders.find((o) => o._id === currentId) : null);

    useEffect(() => {
        dispatch(getProducts());
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleItemChange = (e) => {
        setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
    };

    const addItem = () => {
        const product = Array.isArray(products) ? products.find(p => p && p._id === currentItem.productId) : null;
        if (product) {
            const newItem = {
                productId: product._id,
                ProductName: product.ProductName,
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

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        modal: {
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            width: '500px',
            maxHeight: '90vh',
            overflowY: 'auto',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
        },
        closeButton: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6b7280',
        },
        formGroup: {
            marginBottom: '1rem',
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '500',
            color: '#374151',
        },
        input: {
            width: '100%',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            color: '#1f2937',
            backgroundColor: 'white',
        },
        select: {
            width: '100%',
            padding: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            color: '#1f2937',
            backgroundColor: 'white',
        },
        addItemGroup: {
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'flex-end',
            marginBottom: '1rem',
        },
        addButton: {
            padding: '0.5rem 1rem',
            backgroundColor: '#1f2937',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
        },
        itemsList: {
            marginBottom: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '0.5rem',
            color: '#1f2937',
        },
        submitButton: {
            width: '100%',
            padding: '0.75rem',
            backgroundColor: isLoading ? '#9ca3af' : '#1f2937',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            marginTop: '1rem',
        },
        deleteButton: {
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '0.5rem',
        },
        removeIcon: {
            cursor: 'pointer',
            color: '#ef4444',
            marginLeft: '0.5rem',
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

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Add Items</label>
                        <div style={styles.addItemGroup}>
                            <select
                                name="productId"
                                value={currentItem.productId}
                                onChange={handleItemChange}
                                style={{ ...styles.select, flex: 2 }}
                            >
                                <option value="">Select Product</option>
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

                    <button type="submit" disabled={isLoading} style={styles.submitButton}>
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
