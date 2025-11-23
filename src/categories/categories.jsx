import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CategoriesStyles } from './categoriesstyle';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import parts from '../assets/parts.png';
import { createCategory } from '../actions/categories';

const Categories = () => {
    const styles = new CategoriesStyles();
    const dispatch = useDispatch();

    const categoriesData = [
        { id: 1, name: 'Vehicle Parts & Components', count: '49 items', image: parts },
        { id: 2, name: 'Tires & Wheels', count: '7 items', image: parts },
        { id: 3, name: 'Tools & Equipment', count: '13 items', image: parts },
        { id: 4, name: 'Consumables & Fluids', count: '63 items', image: parts },
        { id: 5, name: 'Accessories & Fittings', count: '23 items', image: parts },
        { id: 6, name: 'Logistics & Storages', count: '11 items', image: parts },
        { id: 7, name: 'Workshop & Safety Supplies', count: '11 items', image: parts },
    ];

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({
        CategoryName: '',
        CategoryDescription: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCategory(formData));
        setIsPopupOpen(false);
        setFormData({
            CategoryName: '',
            CategoryDescription: ''
        });
    };

    return (
        <div style={styles.wrapper}>
            <TopBar />
            <div style={{ display: 'flex', flex: 1 }}>
                <NavigationBar />
                <div style={styles.mainContent} className="main-content">
                    <div style={styles.header}>
                        <div style={styles.titleGroup}>
                            <h1 style={styles.title}>Categories</h1>
                            <span style={styles.subtitle}>Last update January 29, 2023 at 2:39 PM</span>
                        </div>
                        <button style={styles.addCategoryButton} onClick={() => setIsPopupOpen(true)}>
                            <AddIcon /> Add category
                        </button>
                    </div>

                    <div style={styles.categoryList}>
                        {categoriesData.map((category) => (
                            <div key={category.id} style={styles.categoryCard}>
                                <div style={styles.cardLeft}>
                                    <img src={category.image} alt={category.name} style={styles.categoryImage} />
                                    <div style={styles.categoryInfo}>
                                        <span style={styles.categoryName}>{category.name}</span>
                                        <span style={styles.itemCount}>{category.count}</span>
                                    </div>
                                </div>
                                <div style={styles.arrowButton}>
                                    <ArrowForwardIcon style={{ fontSize: '1rem' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {isPopupOpen && (
                <div style={styles.overlay}>
                    <div style={styles.popup}>
                        <div style={styles.popupHeader}>
                            <h2 style={styles.popupTitle}>New Category</h2>
                            <button style={styles.closeButton} onClick={() => setIsPopupOpen(false)}>
                                <CloseIcon />
                            </button>
                        </div>
                        <form style={styles.form} onSubmit={handleSubmit}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Category Name</label>
                                <input
                                    type="text"
                                    name="CategoryName"
                                    value={formData.CategoryName}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Description</label>
                                <textarea
                                    name="CategoryDescription"
                                    value={formData.CategoryDescription}
                                    onChange={handleInputChange}
                                    style={{ ...styles.input, height: '100px', resize: 'vertical' }}
                                />
                            </div>

                            <div style={styles.buttonGroup}>
                                <button type="submit" style={styles.submitButton}>Submit</button>
                                <button type="button" style={styles.cancelButton} onClick={() => setIsPopupOpen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
