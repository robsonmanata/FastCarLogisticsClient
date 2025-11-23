import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { createProduct } from '../actions/products';
import { closeAddProductModal } from '../actions/ui';
import { AddProductModalStyles } from './AddProductModalStyle';

const AddProductModal = () => {
    const styles = new AddProductModalStyles();
    const dispatch = useDispatch();
    const isPopupOpen = useSelector((state) => state.ui.isAddProductModalOpen);

    const placeholderCategories = [
        'Vehicle Parts & Components',
        'Workshop & Safety Supplies',
        'Logistics & Storage',
        'Accessories & Fittings',
        'Consumables & Fluids',
        'Tools & Equipment',
        'Tires & Wheels'
    ];

    const [formData, setFormData] = useState({
        ProductName: '',
        ProductDescription: '',
        ProductPrice: '',
        ProductCategory: '',
        ProductSKU: '',
        ProductBarcode: '',
        ProductQuantity: '',
        ProductStatus: 'Active',
        ProductSupplier: '',
        ProductLocation: '',
        ProductQuantityUsed: 0,
        ProductImage: ''
    });
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'ProductCategory' && value === 'add_new_category') {
            setIsAddingNewCategory(true);
            setFormData({ ...formData, ProductCategory: '' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleNewCategoryChange = (e) => {
        setNewCategoryName(e.target.value);
        setFormData({ ...formData, ProductCategory: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct(formData));
        dispatch(closeAddProductModal());
        setFormData({
            ProductName: '',
            ProductDescription: '',
            ProductPrice: '',
            ProductCategory: '',
            ProductSKU: '',
            ProductBarcode: '',
            ProductQuantity: '',
            ProductStatus: 'Active',
            ProductSupplier: '',
            ProductLocation: '',
            ProductQuantityUsed: 0,
            ProductImage: ''
        });
        setIsAddingNewCategory(false);
        setNewCategoryName('');
    };

    if (!isPopupOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <div style={styles.popupHeader}>
                    <h2 style={styles.popupTitle}>New SKU</h2>
                    <button style={styles.closeButton} onClick={() => dispatch(closeAddProductModal())}>
                        <CloseIcon />
                    </button>
                </div>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Part Name</label>
                            <input
                                type="text"
                                name="ProductName"
                                value={formData.ProductName}
                                onChange={handleInputChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Category</label>
                            <select
                                name="ProductCategory"
                                value={isAddingNewCategory ? 'add_new_category' : formData.ProductCategory}
                                onChange={handleInputChange}
                                style={styles.select}
                                required
                            >
                                <option value="">Select Category</option>
                                {placeholderCategories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                                <option value="add_new_category">Add new category</option>
                            </select>
                            {isAddingNewCategory && (
                                <input
                                    type="text"
                                    placeholder="Enter new category name"
                                    value={newCategoryName}
                                    onChange={handleNewCategoryChange}
                                    style={{ ...styles.input, marginTop: '0.5rem' }}
                                    required
                                />
                            )}
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>SKU</label>
                            <input
                                type="text"
                                name="ProductSKU"
                                value={formData.ProductSKU}
                                onChange={handleInputChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Price</label>
                            <input
                                type="number"
                                name="ProductPrice"
                                value={formData.ProductPrice}
                                onChange={handleInputChange}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Quantity</label>
                            <input
                                type="number"
                                name="ProductQuantity"
                                value={formData.ProductQuantity}
                                onChange={handleInputChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Barcode</label>
                            <input
                                type="text"
                                name="ProductBarcode"
                                value={formData.ProductBarcode}
                                onChange={handleInputChange}
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description</label>
                        <textarea
                            name="ProductDescription"
                            value={formData.ProductDescription}
                            onChange={handleInputChange}
                            style={{ ...styles.input, height: '60px', resize: 'vertical' }}
                        />
                    </div>

                    <div style={styles.buttonGroup}>
                        <button type="submit" style={styles.submitButton}>Submit</button>
                        <button type="button" style={styles.cancelButton} onClick={() => dispatch(closeAddProductModal())}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
