import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { UsersStyles } from './Usersstyle';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import { getUsers, createUser, updateUser, deleteUser } from '../actions/user';
import imageCompression from 'browser-image-compression';
import ConfirmationModal from '../components/ConfirmationModal/confirmationmodal';

const Users = () => {
    const styles = new UsersStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const users = useSelector((state) => state.user); // Assumed to be an array from reducer

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
    const [selectedUser, setSelectedUser] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'User',
        profilePicture: ''
    });

    const handleOpenAdd = () => {
        setModalType('add');
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'User',
            profilePicture: ''
        });
        setIsModalOpen(true);
    };

    useEffect(() => {
        dispatch(getUsers());
        if (location.state?.openAddModal) {
            handleOpenAdd();
            window.history.replaceState({}, document.title);
        }
    }, [dispatch, location.state]);



    const handleOpenEdit = (user) => {
        setModalType('edit');
        setSelectedUser(user);
        setFormData({
            firstName: user.name || '',
            lastName: user.surname || '',
            email: user.email || '',
            password: '',
            confirmPassword: '',
            role: user.role || 'User',
            profilePicture: user.profilePicture || ''
        });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
                    setFormData(prev => ({ ...prev, profilePicture: reader.result }));
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleDeleteUser = () => {
        // Just open the confirmation modal
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        await dispatch(deleteUser(selectedUser._id));
        setIsDeleteModalOpen(false);
        handleCloseModal();
        dispatch(getUsers());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (modalType === 'add') {
            // Basic validation
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords don't match");
                return;
            }

            const newUserData = {
                ...formData,
                name: formData.firstName,
                surname: formData.lastName
            };

            await dispatch(createUser(newUserData));
        } else {
            // Edit
            if (formData.password && formData.password !== formData.confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            const updatedData = {
                name: formData.firstName,
                surname: formData.lastName,
                email: formData.email,
                role: formData.role,
                password: formData.password,
                profilePicture: formData.profilePicture
            };
            await dispatch(updateUser(selectedUser._id, updatedData));
        }

        handleCloseModal();
        dispatch(getUsers()); // Refresh list
    };

    return (
        <div style={styles.wrapper}>
            <TopBar />
            <div style={{ display: 'flex', flex: 1 }}>
                <NavigationBar />
                <div style={styles.mainContent}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>All Employees</h1>
                        <button style={styles.addButton} onClick={handleOpenAdd}>
                            <AddIcon /> Add Employee
                        </button>
                    </div>

                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Name</th>
                                    <th style={styles.th}>Role</th>
                                    <th style={styles.th}>Email</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(users) && users.map((u) => (
                                    <tr key={u._id}>
                                        <td style={styles.td}>
                                            <div style={styles.userCell}>
                                                <div style={styles.avatar}>
                                                    {u.profilePicture ? (
                                                        <img src={u.profilePicture} alt={u.name} style={styles.avatarImage} />
                                                    ) : (
                                                        u.name ? u.name.charAt(0) : 'U'
                                                    )}
                                                </div>
                                                <span>{u.name} {u.surname}</span>
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <span style={{
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '9999px',
                                                fontSize: '0.875rem',
                                                backgroundColor: u.role === 'Admin' ? '#dbeafe' : '#f3f4f6',
                                                color: u.role === 'Admin' ? '#1e40af' : '#374151'
                                            }}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td style={styles.td}>{u.email}</td>
                                        <td style={styles.td}>
                                            <MoreHorizIcon
                                                style={{ cursor: 'pointer', color: '#6b7280' }}
                                                onClick={() => handleOpenEdit(u)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div style={styles.overlay}>
                    <div style={styles.modal}>
                        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {modalType === 'add' ? 'Add Employee' : 'Edit Employee'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                    {formData.profilePicture ? (
                                        <img src={formData.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <span style={{ fontSize: '1.5rem', color: '#9ca3af' }}>{formData.firstName ? formData.firstName.charAt(0) : 'U'}</span>
                                    )}
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                <label htmlFor="modal-profile-upload" style={{
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    color: '#374151',
                                    fontWeight: '500',
                                    padding: '0.5rem 1rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    backgroundColor: 'white',
                                    transition: 'background-color 0.2s'
                                }}>
                                    {modalType === 'add' ? 'Add Profile Picture' : 'Change Profile Picture'}
                                </label>
                                <input
                                    id="modal-profile-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>First Name</label>
                                    <input name="firstName" value={formData.firstName} onChange={handleInputChange} style={styles.input} required />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Last Name</label>
                                    <input name="lastName" value={formData.lastName} onChange={handleInputChange} style={styles.input} required />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Email</label>
                                    <input name="email" type="email" value={formData.email} onChange={handleInputChange} style={styles.input} required />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Role</label>
                                    <select name="role" value={formData.role} onChange={handleInputChange} style={styles.select}>
                                        <option value="User">User</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>{modalType === 'add' ? 'Password' : 'Change Password'}</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    required={modalType === 'add'}
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>{modalType === 'add' ? 'Confirm Password' : 'Repeat Password'}</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    required={modalType === 'add'}
                                />
                            </div>

                            <div style={styles.actionButtons}>
                                {modalType === 'edit' && (
                                    <button type="button" onClick={handleDeleteUser} style={{ ...styles.cancelButton, backgroundColor: '#ef4444', color: 'white', border: 'none', marginRight: 'auto' }}>
                                        Delete User
                                    </button>
                                )}
                                <button type="button" onClick={handleCloseModal} style={styles.cancelButton}>Cancel</button>
                                <button type="submit" style={styles.saveButton}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                title="Delete User"
                message={`Are you sure you want to delete ${formData.firstName} ${formData.lastName}? This action cannot be undone.`}
                onConfirm={confirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
            />
        </div>
    );
};

export default Users;
