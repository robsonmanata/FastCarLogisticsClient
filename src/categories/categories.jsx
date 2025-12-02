
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CategoriesStyles } from './categoriesstyle';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';

import parts from '../assets/parts.png';
import { createCategory, updateCategory } from '../actions/categories';

const Categories = () => {
    const styles = new CategoriesStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.categories);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const [formData, setFormData] = useState({
        CategoryName: '',
        CategoryDescription: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (category) => {
        setCurrentCategoryId(category._id);
        setFormData({
            CategoryName: category.CategoryName,
            CategoryDescription: category.CategoryDescription || ''
        });
        setIsPopupOpen(true);
    };

    const handleClose = () => {
        setIsPopupOpen(false);
        setCurrentCategoryId(null);
        setFormData({
            CategoryName: '',
            CategoryDescription: ''
        });
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (currentCategoryId) {
            await dispatch(updateCategory(currentCategoryId, formData));
        } else {
            await dispatch(createCategory(formData));
        }
        setIsLoading(false);
        handleClose();
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
                        {categories.map((category) => (
                            <div key={category._id} style={styles.categoryCard}>
                                <div style={styles.cardLeft}>
                                    <img src={parts} alt={category.CategoryName} style={styles.categoryImage} />
                                    <div style={styles.categoryInfo}>
                                        <span style={styles.categoryName}>{category.CategoryName}</span>
                                        <span style={styles.itemCount}>{category.CategoryProducts ? category.CategoryProducts.length : 0} items</span>
                                    </div>
                                </div>
                                <div style={styles.actionContainer}>
                                    <MoreHorizIcon
                                        style={styles.moreIcon}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEdit(category);
                                        }}
                                    />
                                    <div style={styles.arrowButton} onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('/inventory', { state: { category: category.CategoryName } });
                                    }}>
                                        <ArrowForwardIcon style={{ fontSize: '1rem' }} />
                                    </div>
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
                            <h2 style={styles.popupTitle}>{currentCategoryId ? 'Edit Category' : 'New Category'}</h2>
                            <button style={styles.closeButton} onClick={handleClose}>
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
                                <button type="submit" disabled={isLoading} style={{ ...styles.submitButton, backgroundColor: isLoading ? '#9ca3af' : styles.submitButton.backgroundColor, cursor: isLoading ? 'not-allowed' : 'pointer' }}>
                                    {isLoading ? 'Processing...' : 'Submit'}
                                </button>
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
