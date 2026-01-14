import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SettingsStyles } from './settingsstyle';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { updateUser } from '../actions/user';
import imageCompression from 'browser-image-compression';

const Settings = () => {
    const styles = new SettingsStyles();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        role: '',
        profilePicture: ''
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user?.result) {
            setFormData({
                name: user.result.name || '',
                surname: user.result.surname || '',
                email: user.result.email || '',
                role: user.result.role || 'User',
                password: '', // Don't show hash
                profilePicture: user.result.profilePicture || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                    setFormData(prev => ({ ...prev, profilePicture: reader.result }));
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user?.result?._id) {
            // Dispatch update
            if (formData.password && formData.password !== formData.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            const updatedData = {
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                role: formData.role, // Usually user can't change their own role here, but we pass it back
                password: formData.password,
                profilePicture: formData.profilePicture
            };

            await dispatch(updateUser(user.result._id, updatedData));

            // Update local storage to reflect changes immediately
            const newProfile = { ...user, result: { ...user.result, ...updatedData, password: user.result.password } }; // don't put plain password in local storage
            localStorage.setItem('profile', JSON.stringify(newProfile));
            setUser(newProfile);

            setIsEditing(false);
            setFormData({ ...formData, password: '' });
            alert('Profile updated successfully!');
        }
    };

    return (
        <div style={styles.wrapper}>
            <TopBar />
            <div style={{ display: 'flex', flex: 1 }}>
                <NavigationBar />
                <div style={styles.mainContent} className="main-content">
                    <div style={styles.header}>
                        <h1 style={styles.title}>Personal Settings</h1>
                    </div>

                    <div style={styles.section}>
                        {/* Profile Card */}
                        <div style={styles.card}>
                            <div style={{ position: 'absolute', top: '2rem', right: '2rem', cursor: 'pointer' }} onClick={() => setIsEditing(!isEditing)}>
                                {isEditing ? <span style={{ color: 'green' }}>Cancel</span> : <EditIcon style={styles.editIcon} />}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {formData.profilePicture ? (
                                        <img src={formData.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <span style={{ fontSize: '2rem', color: '#9ca3af' }}>{formData.name ? formData.name.charAt(0) : 'U'}</span>
                                    )}
                                </div>
                            </div>
                            {isEditing && (
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                    <label htmlFor="settings-profile-upload" style={{
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
                                        Change Profile Picture
                                    </label>
                                    <input
                                        id="settings-profile-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            )}

                            <form onSubmit={handleSubmit} style={styles.profileGrid}>
                                <div style={styles.fieldGroup}>
                                    <span style={styles.label}>First Name</span>
                                    {isEditing ? (
                                        <input name="name" value={formData.name} onChange={handleChange} style={styles.input} />
                                    ) : (
                                        <span style={styles.value}>{formData.name}</span>
                                    )}
                                </div>
                                <div style={styles.fieldGroup}>
                                    <span style={styles.label}>Last Name</span>
                                    {isEditing ? (
                                        <input name="surname" value={formData.surname} onChange={handleChange} style={styles.input} />
                                    ) : (
                                        <span style={styles.value}>{formData.surname}</span>
                                    )}
                                </div>
                                <div style={styles.fieldGroup}>
                                    <span style={styles.label}>Email</span>
                                    {/* Email often read-only as it is ID, but let's allow edit if backend supports it */}
                                    <span style={styles.value}>{formData.email}</span>
                                </div>
                                <div style={styles.fieldGroup}>
                                    <span style={styles.label}>Role</span>
                                    <span style={styles.value}>{formData.role}</span>
                                </div>

                                {isEditing && (
                                    <>
                                        <div style={styles.fieldGroup}>
                                            <span style={styles.label}>Reset Password</span>
                                            <input
                                                name="password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                style={{ ...styles.input, border: '1px solid #ddd' }}
                                            />
                                        </div>
                                        <div style={styles.fieldGroup}>
                                            <span style={styles.label}>Repeat Password</span>
                                            <input
                                                name="confirmPassword"
                                                type="password"
                                                value={formData.confirmPassword || ''}
                                                onChange={handleChange}
                                                style={{ ...styles.input, border: '1px solid #ddd' }}
                                            />
                                        </div>
                                    </>
                                )}

                                {isEditing && (
                                    <div style={{ ...styles.fieldGroup, gridColumn: 'span 2', marginTop: '1rem' }}>
                                        <button type="submit" style={{
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#1f2937',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            width: 'fit-content'
                                        }}>
                                            <SaveIcon fontSize="small" /> Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
