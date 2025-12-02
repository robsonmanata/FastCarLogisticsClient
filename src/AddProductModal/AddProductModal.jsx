import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { createProduct, updateProduct } from '../actions/products';
import { createCategory } from '../actions/categories';
import { closeAddProductModal, setCurrentProductId } from '../actions/ui';
import { AddProductModalStyles } from './AddProductModalStyle';

import imageCompression from 'browser-image-compression';

const AddProductModal = () => {
    const styles = new AddProductModalStyles();
    const dispatch = useDispatch();
    const isPopupOpen = useSelector((state) => state.ui.isAddProductModalOpen);
    const currentProductId = useSelector((state) => state.ui.currentProductId);
    const productToEdit = useSelector((state) => currentProductId ? state.products.find((p) => p._id === currentProductId) : null);
    const categories = useSelector((state) => state.categories);

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

    React.useEffect(() => {
        if (productToEdit) {
            setFormData(productToEdit);
        } else {
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
        }
    }, [productToEdit]);

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

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const options = {
                maxSizeMB: 0.2,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            };

            try {
                const compressedFile = await imageCompression(file, options);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData(prev => ({
                        ...prev,
                        ProductImage: reader.result
                    }));
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('Submitting form...');
        console.log('Current Product ID:', currentProductId);
        console.log('Form Data:', formData);

        if (isAddingNewCategory && newCategoryName) {
            await dispatch(createCategory({ CategoryName: newCategoryName, CategoryDescription: '' }));
        }

        if (currentProductId) {
            console.log('Dispatching updateProduct...');
            await dispatch(updateProduct(currentProductId, formData));
        } else {
            console.log('Dispatching createProduct...');
            await dispatch(createProduct(formData));
        }
        setIsLoading(false);
        dispatch(closeAddProductModal());
        dispatch(setCurrentProductId(null));
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
        console.log(formData);
    };

    if (!isPopupOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <div style={styles.popupHeader}>
                    <h2 style={styles.popupTitle}>{currentProductId ? 'Edit Product' : 'New SKU'}</h2>
                    <button style={styles.closeButton} onClick={() => { dispatch(closeAddProductModal()); dispatch(setCurrentProductId(null)); }}>
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
                                {categories && categories.map((cat) => (
                                    <option key={cat._id} value={cat.CategoryName}>
                                        {cat.CategoryName}
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

                    <div style={styles.formGroup}>
                        <label style={styles.fileInputLabel}>
                            {formData.ProductImage ? 'Image Uploaded' : 'Upload Product Image'}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={styles.fileInput}
                            />
                        </label>
                    </div>

                    <div style={styles.buttonGroup}>
                        <button type="submit" disabled={isLoading} style={{ ...styles.submitButton, backgroundColor: isLoading ? '#9ca3af' : styles.submitButton.backgroundColor, cursor: isLoading ? 'not-allowed' : 'pointer' }}>
                            {isLoading ? 'Processing...' : 'Submit'}
                        </button>
                        <button type="button" style={styles.cancelButton} onClick={() => { dispatch(closeAddProductModal()); dispatch(setCurrentProductId(null)); }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
