import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { createProduct, updateProduct, deleteProduct } from '../actions/products';
import { createCategory } from '../actions/categories';
import { closeAddProductModal, setCurrentProductId } from '../actions/ui';
import { AddProductModalStyles } from './AddProductModalStyle';
import { checkProductExists, checkProductByBarcode } from '../api/index';

import imageCompression from 'browser-image-compression';

import ConfirmationModal from '../components/ConfirmationModal/ConfirmationModal';

const AddProductModal = () => {
    const styles = new AddProductModalStyles();
    const dispatch = useDispatch();
    const isPopupOpen = useSelector((state) => state.ui.isAddProductModalOpen);
    const currentProductId = useSelector((state) => state.ui.currentProductId);
    const scannedBarcode = useSelector((state) => state.ui.scannedBarcode);
    const productToEdit = useSelector((state) => currentProductId ? state.products.items.find((p) => p._id === currentProductId) : null);
    const categories = useSelector((state) => state.categories);
    const user = JSON.parse(localStorage.getItem('profile'));
    const userName = user?.result?.name ? `${user.result.name} ${user.result.surname || ''}`.trim() : user?.result?.givenName ? `${user.result.givenName} ${user.result.familyName}` : 'Unknown User';

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
        ProductImage: '',
        ProductSize: '',
        ProductUnit: '',
        ProductSubCategory: '',
        ProductVehicleType: '',
        ProductPartCode: '',
        ProductRevision: ''
    });
    const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    React.useEffect(() => {
        if (productToEdit) {
            // Ensure we merge with default keys so new fields aren't undefined for legacy products
            setFormData({
                ProductName: productToEdit.ProductName || '',
                ProductDescription: productToEdit.ProductDescription || '',
                ProductPrice: productToEdit.ProductPrice || '',
                ProductCategory: productToEdit.ProductCategory || '',
                ProductSKU: productToEdit.ProductSKU || '',
                ProductBarcode: productToEdit.ProductBarcode || '',
                ProductQuantity: productToEdit.ProductQuantity || '',
                ProductStatus: productToEdit.ProductStatus || 'Active',
                ProductSupplier: productToEdit.ProductSupplier || '',
                ProductLocation: productToEdit.ProductLocation || '',
                ProductQuantityUsed: productToEdit.ProductQuantityUsed || 0,
                ProductImage: productToEdit.ProductImage || '',
                ProductSize: productToEdit.ProductSize || '',
                ProductUnit: productToEdit.ProductUnit || '',
                ProductSubCategory: productToEdit.ProductSubCategory || '',
                ProductVehicleType: productToEdit.ProductVehicleType || '',
                ProductPartCode: productToEdit.ProductPartCode || '',
                ProductRevision: productToEdit.ProductRevision || ''
            });
        } else {
            setFormData({
                ProductName: '',
                ProductDescription: '',
                ProductPrice: '',
                ProductCategory: '',
                ProductSKU: '',
                ProductBarcode: scannedBarcode || '',
                ProductQuantity: '',
                ProductStatus: 'Active',
                ProductSupplier: '',
                ProductLocation: '',
                ProductQuantityUsed: 0,
                ProductImage: '',
                ProductSize: '',
                ProductUnit: '',
                ProductSubCategory: '',
                ProductVehicleType: '',
                ProductPartCode: '',
                ProductRevision: ''
            });
        }
    }, [productToEdit, scannedBarcode]);

    const [duplicateProduct, setDuplicateProduct] = useState(false);
    const [revisionNotice, setRevisionNotice] = useState('');

    // Auto-generate SKU
    React.useEffect(() => {
        const { ProductVehicleType, ProductCategory, ProductSubCategory, ProductPartCode, ProductSize, ProductUnit } = formData;
        if (ProductVehicleType && ProductCategory && ProductSubCategory && ProductPartCode) {
            let sizePart = '';
            if (ProductSize) {
                sizePart = `-${ProductSize}` + (ProductUnit ? ProductUnit.toUpperCase() : '');
            }

            const baseSku = `${ProductVehicleType}-${ProductCategory}-${ProductSubCategory}-${ProductPartCode}${sizePart}`.toUpperCase();

            // Set base SKU initially
            setFormData(prev => ({ ...prev, ProductSKU: baseSku, ProductRevision: '' }));

            // Check for duplicate via API
            if (formData.ProductName && baseSku && !currentProductId) {
                const checkDuplicate = async () => {
                    try {
                        const { data } = await checkProductExists(baseSku, formData.ProductName);

                        if (data.exists) {
                            if (data.isExactMatch) {
                                // Exact Match: Same SKU & Same Name -> Merge Qty
                                setDuplicateProduct(true);
                                setRevisionNotice('');
                            } else {
                                // Partial Match: Same Base SKU but Different Name -> New Revision
                                setDuplicateProduct(false); // It's not a duplicate, it's a new item with a revision
                                const newRevisionNum = (data.highestRevision || 0) + 1;
                                const revisionString = `R${newRevisionNum}`;

                                setFormData(prev => ({
                                    ...prev,
                                    ProductSKU: `${baseSku}-${revisionString}`,
                                    ProductRevision: revisionString
                                }));
                                setRevisionNotice(`Base SKU exists for a different product. Automatically assigned revision ${revisionString}.`);
                            }
                        } else {
                            // No Match -> Clean Base SKU
                            setDuplicateProduct(false);
                            setRevisionNotice('');
                        }
                    } catch (error) {
                        console.error('Error checking duplicate:', error);
                        setDuplicateProduct(false);
                        setRevisionNotice('');
                    }
                };

                // Debounce the API call slightly to prevent too many requests while typing/selecting
                const timeoutId = setTimeout(() => {
                    checkDuplicate();
                }, 500);

                return () => clearTimeout(timeoutId);
            } else {
                setDuplicateProduct(false);
                setRevisionNotice('');
            }
        } else {
            setDuplicateProduct(false);
            setRevisionNotice('');
        }
    }, [formData.ProductVehicleType, formData.ProductCategory, formData.ProductSubCategory, formData.ProductPartCode, formData.ProductSize, formData.ProductUnit, formData.ProductName, currentProductId]);

    // Handle barcode scanning to auto-populate
    useEffect(() => {
        if (!currentProductId && formData.ProductBarcode && formData.ProductBarcode.trim() !== '') {
            const checkBarcode = async () => {
                try {
                    const { data } = await checkProductByBarcode(formData.ProductBarcode);
                    if (data.exists && data.product) {
                        const productToFill = data.product;
                        setFormData({
                            ProductName: productToFill.ProductName || '',
                            ProductDescription: productToFill.ProductDescription || '',
                            ProductPrice: productToFill.ProductPrice || '',
                            ProductCategory: productToFill.ProductCategory || '',
                            ProductSKU: productToFill.ProductSKU || '',
                            ProductBarcode: productToFill.ProductBarcode || '',
                            // Leave quantity open for user to enter how many they are scanning/adding
                            ProductQuantity: '',
                            ProductStatus: productToFill.ProductStatus || 'Active',
                            ProductSupplier: productToFill.ProductSupplier || '',
                            ProductLocation: productToFill.ProductLocation || '',
                            ProductQuantityUsed: productToFill.ProductQuantityUsed || 0,
                            ProductImage: productToFill.ProductImage || '',
                            ProductSize: productToFill.ProductSize || '',
                            ProductUnit: productToFill.ProductUnit || '',
                            ProductSubCategory: productToFill.ProductSubCategory || '',
                            ProductVehicleType: productToFill.ProductVehicleType || '',
                            ProductPartCode: productToFill.ProductPartCode || '',
                            ProductRevision: productToFill.ProductRevision || ''
                        });
                        // Automatically flag it as a duplicate so the submission handles it as adding to stock
                        setDuplicateProduct(true);
                        setRevisionNotice('Product found via barcode. Submitting will add quantity to existing stock.');
                    }
                } catch (error) {
                    console.error('Error checking barcode:', error);
                }
            };

            // Debounce the barcode scan slightly
            const timeoutId = setTimeout(() => {
                checkBarcode();
            }, 500);

            return () => clearTimeout(timeoutId);
        }
    }, [formData.ProductBarcode, currentProductId]);

    const generatePartCode = (name) => {
        if (!name) return '';
        // Remove special chars first (keep letters and spaces) - mostly to avoid '!' or numbers breaking logic if preferred, 
        // but user only mentioned vowels/consonants. Let's keep it simple: just process the word.
        const cleanName = name.replace(/[^a-zA-Z\s]/g, '');
        const words = cleanName.trim().split(/\s+/);
        // "if for a two word part name... use last word" (implied from previous), actually user said "two or more word product take... last word"
        const target = words.length > 1 ? words[words.length - 1] : words[0];
        if (!target) return '';

        const isVowel = (char) => ['A', 'E', 'I', 'O', 'U'].includes(char.toUpperCase());
        const getConsonants = (str) => str.split('').filter(c => !isVowel(c)).join('');

        let code = '';
        if (isVowel(target[0])) {
            // "first letter is a vowel use it then follwed by consonents"
            const consonants = getConsonants(target.slice(1));
            code = target[0] + consonants.substring(0, 2);
        } else {
            // "none vowel letters" (consonants)
            const consonants = getConsonants(target);
            code = consonants.substring(0, 3);
        }
        return code.toUpperCase();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'ProductCategory' && value === 'add_new_category') {
            setIsAddingNewCategory(true);
            setFormData({ ...formData, ProductCategory: '' });
        } else if (name === 'ProductName') {
            const code = generatePartCode(value);
            setFormData({ ...formData, ProductName: value, ProductPartCode: code });
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

        // Check if the used category exists in the database labels, if not, create it.
        // This covers both "Add new category" input AND hardcoded options that might not be in DB yet.
        const categoryExists = categories.some(cat => cat.CategoryName === formData.ProductCategory);
        if (formData.ProductCategory && !categoryExists && formData.ProductCategory !== 'add_new_category') {
            await dispatch(createCategory({ CategoryName: formData.ProductCategory, CategoryDescription: '' }));
        }

        if (currentProductId) {
            console.log('Dispatching updateProduct...');
            await dispatch(updateProduct(currentProductId, { ...formData, User: userName }));
        } else {
            console.log('Dispatching createProduct...');
            await dispatch(createProduct({ ...formData, User: userName }));
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
            ProductImage: '',
            ProductSize: '',
            ProductUnit: '',
            ProductSubCategory: '',
            ProductVehicleType: '',
            ProductPartCode: '',
            ProductRevision: ''
        });
        setIsAddingNewCategory(false);
        setNewCategoryName('');
        console.log(formData);
    };

    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        setIsLoading(true);
        await dispatch(deleteProduct(currentProductId));
        setIsLoading(false);
        setIsDeleteModalOpen(false);
        dispatch(closeAddProductModal());
        dispatch(setCurrentProductId(null));
    };

    if (!isPopupOpen) return null;

    return (
        <>
            <div style={styles.overlay}>
                <div style={styles.popup}>
                    <div style={styles.popupHeader}>
                        <h2 style={styles.popupTitle}>{currentProductId ? 'Edit Product' : 'New SKU'}</h2>
                        <button style={styles.closeButton} onClick={() => { dispatch(closeAddProductModal()); dispatch(setCurrentProductId(null)); }}>
                            <CloseIcon />
                        </button>
                    </div>
                    <form style={styles.form} onSubmit={handleSubmit}>
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

                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Vehicle Type</label>
                                <select
                                    name="ProductVehicleType"
                                    value={formData.ProductVehicleType}
                                    onChange={handleInputChange}
                                    style={styles.select}
                                    required
                                >
                                    <option value="">Select Vehicle</option>
                                    <option value="CAR">CAR (Car)</option>
                                    <option value="TRK">TRK (Truck)</option>
                                    <option value="VAN">VAN (Van)</option>
                                    <option value="UNI">UNI (Universal)</option>
                                </select>
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
                                    <option value="MEC">MEC (Mechanical)</option>
                                    <option value="ELE">ELE (Electrical)</option>
                                    <option value="FLD">FLD (Fluids & lubricants)</option>
                                    <option value="BOD">BOD (Bodywork)</option>
                                    <option value="SFT">SFT (Safety)</option>
                                    <option value="ACC">ACC (Accessories)</option>
                                    <option value="TIR">TIR (Tyres & wheels)</option>

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
                            {/* Use inline style for flex ratio specifically for this row's children if needed, 
                                 but since styles object is used, we might need to override or use inline styles carefully. 
                                 For safely, I will simply use the class/style provided. 
                                 If specific flex grow is needed, I'll add it to the style prop. */}
                            <div style={{ ...styles.formGroup, flex: 2 }}>
                                <label style={styles.label}>Sub Category</label>
                                <select
                                    name="ProductSubCategory"
                                    value={formData.ProductSubCategory}
                                    onChange={handleInputChange}
                                    style={styles.select}
                                    required
                                >
                                    <option value="">Select Sub-Category</option>
                                    <option value="BRK">BRK (Brakes)</option>
                                    <option value="ENG">ENG (Engine)</option>
                                    <option value="TRN">TRN (Transmission)</option>
                                    <option value="SUS">SUS (Suspension)</option>
                                    <option value="FUE">FUE (Fuel system)</option>
                                    <option value="CLU">CLU (Clutch)</option>
                                    <option value="ALT">ALT (Alternator)</option>
                                    <option value="STR">STR (Starter)</option>
                                    <option value="BAT">BAT (Battery)</option>
                                    <option value="LGT">LGT (Lighting)</option>
                                    <option value="SNS">SNS (Sensors)</option>
                                    <option value="OIL">OIL (Engine oil)</option>
                                    <option value="GRS">GRS (Grease)</option>
                                    <option value="COO">COO (Coolant)</option>
                                    <option value="HYD">HYD (Hydraulic fluid)</option>
                                </select>
                            </div>
                            <div style={{ ...styles.formGroup, flex: 1 }}>
                                <label style={styles.label}>Code (Auto-Generated)</label>
                                <input
                                    type="text"
                                    name="ProductPartCode"
                                    value={formData.ProductPartCode}
                                    onChange={(e) => setFormData({ ...formData, ProductPartCode: e.target.value.toUpperCase() })}
                                    style={styles.input}
                                    maxLength={4}
                                    placeholder="DSC"
                                    required
                                />
                            </div>
                        </div>

                        <div style={styles.formRow}>
                            <div style={{ ...styles.formGroup, flex: 2 }}>
                                <label style={styles.label}>SKU (Auto-Generated)</label>
                                <input
                                    type="text"
                                    name="ProductSKU"
                                    value={formData.ProductSKU}
                                    readOnly
                                    style={{ ...styles.input, backgroundColor: '#f3f4f6', color: '#000000' }}
                                />
                                {revisionNotice && (
                                    <p style={{ fontSize: '0.8rem', color: '#059669', marginTop: '0.25rem', fontWeight: '500' }}>
                                        {revisionNotice}
                                    </p>
                                )}
                            </div>
                            <div style={{ ...styles.formGroup, flex: 1 }}>
                                <label style={styles.label}>Revision</label>
                                <input
                                    type="text"
                                    name="ProductRevision"
                                    value={formData.ProductRevision || '-'}
                                    readOnly
                                    style={{ ...styles.input, backgroundColor: '#f3f4f6', color: '#6b7280', textAlign: 'center' }}
                                />
                            </div>
                            <div style={{ ...styles.formGroup, flex: 1 }}>
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
                                <label style={styles.label}>Size</label>
                                <input
                                    type="text"
                                    name="ProductSize"
                                    value={formData.ProductSize}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    placeholder="e.g. 50"
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Unit</label>
                                <select
                                    name="ProductUnit"
                                    value={formData.ProductUnit}
                                    onChange={handleInputChange}
                                    style={styles.select}
                                >
                                    <option value="">Select Unit</option>
                                    <option value="kg">kg (Kilogram)</option>
                                    <option value="g">g (Gram)</option>
                                    <option value="l">l (Liter)</option>
                                    <option value="ml">ml (Milliliter)</option>
                                    <option value="m">m (Meter)</option>
                                    <option value="cm">cm (Centimeter)</option>
                                    <option value="mm">mm (Millimeter)</option>
                                </select>
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
                                    min="0"
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={{ ...styles.label, color: '#0e0e0eff', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    External Barcode (Scan Here)
                                </label>
                                <input
                                    type="text"
                                    name="ProductBarcode"
                                    value={formData.ProductBarcode}
                                    onChange={handleInputChange}
                                    style={styles.barcodeInput}
                                    placeholder="Click and scan..."
                                />
                            </div>
                        </div>



                        <div style={styles.formGroup}>
                            <label style={{ ...styles.fileInputLabel, cursor: duplicateProduct ? 'not-allowed' : 'pointer', opacity: duplicateProduct ? 0.6 : 1 }}>
                                {duplicateProduct ? 'Existing Product (Image Upload Disabled)' : (formData.ProductImage ? 'Image Uploaded' : 'Upload Product Image')}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={styles.fileInput}
                                    disabled={duplicateProduct}
                                />
                            </label>
                            {duplicateProduct && (
                                <p style={{ color: '#059669', fontSize: '0.875rem', marginTop: '0.5rem', fontWeight: '500' }}>
                                    ✓ Product exists. Submitting will add quantity to existing stock.
                                </p>
                            )}
                        </div>

                        <div style={styles.buttonGroup}>
                            <button type="submit" disabled={isLoading} style={{ ...styles.submitButton, backgroundColor: isLoading ? '#9ca3af' : styles.submitButton.backgroundColor, cursor: isLoading ? 'not-allowed' : 'pointer' }}>
                                {isLoading ? 'Processing...' : 'Submit'}
                            </button>
                            {currentProductId && (
                                <button type="button" onClick={handleDelete} disabled={isLoading} style={{ ...styles.deleteButton, backgroundColor: isLoading ? '#9ca3af' : styles.deleteButton.backgroundColor, cursor: isLoading ? 'not-allowed' : 'pointer' }}>
                                    Delete
                                </button>
                            )}
                            <button type="button" style={styles.cancelButton} onClick={() => { dispatch(closeAddProductModal()); dispatch(setCurrentProductId(null)); }}>Cancel</button>
                        </div>
                    </form>
                </div >
            </div >
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
            />
        </>
    );
};


export default AddProductModal;
