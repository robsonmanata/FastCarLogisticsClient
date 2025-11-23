import React, { useState } from 'react';
import { SettingsStyles } from './settingsstyle';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';

const Toggle = ({ checked, onChange }) => {
    const styles = new SettingsStyles();
    return (
        <label style={styles.toggleSwitch}>
            <input type="checkbox" checked={checked} onChange={onChange} style={styles.toggleInput} />
            <span style={{
                ...styles.toggleSlider,
                ...(checked ? styles.toggleSliderChecked : {})
            }}>
                <span style={{
                    ...styles.toggleSliderBefore,
                    ...(checked ? styles.toggleSliderBeforeChecked : {})
                }}></span>
            </span>
        </label>
    );
};

const Settings = () => {
    const styles = new SettingsStyles();

    const [roles] = useState([
        { id: 1, name: 'Manager', selected: true },
        { id: 2, name: 'Editor', selected: false },
        { id: 3, name: 'Supplier', selected: false },
        { id: 4, name: 'Seller', selected: false },
        { id: 5, name: 'Admin', selected: false },
        { id: 6, name: 'Finance', selected: false },
    ]);

    const [permissions] = useState([
        { name: 'Customer', view: true, edit: true, create: true, approval: true },
        { name: 'Product', view: true, edit: true, create: true, approval: true },
        { name: 'User', view: true, edit: true, create: true, approval: false },
        { name: 'Supplier', view: true, edit: true, create: false, approval: false },
        { name: 'Store', view: true, edit: false, create: false, approval: false },
        { name: 'Billing', view: true, edit: false, create: false, approval: false },
    ]);

    return (
        <div style={styles.wrapper}>
            <TopBar />
            <div style={{ display: 'flex', flex: 1 }}>
                <NavigationBar />
                <div style={styles.mainContent} className="main-content">
                    <div style={styles.header}>
                        <h1 style={styles.title}>Personal settings</h1>
                    </div>

                    <div style={styles.section}>
                        {/* Profile Card */}
                        <div style={styles.card}>
                            <div style={{ position: 'absolute', top: '2rem', right: '2rem' }}>
                                <EditIcon style={styles.editIcon} />
                            </div>
                            <div style={styles.profileGrid}>
                                <div style={styles.fieldGroup}>
                                    <span style={styles.label}>Name*</span>
                                    <span style={styles.value}>John Hopkins</span>
                                </div>
                                <div style={styles.fieldGroup}>
                                    <span style={styles.label}>Store</span>
                                    <span style={styles.value}>Leicester, UK</span>
                                </div>
                                <div style={styles.fieldGroup}>
                                    <span style={styles.label}>Company email*</span>
                                    <span style={styles.value}>j.hopkins@inventor.io</span>
                                </div>
                                <div style={styles.fieldGroup}>
                                    <span style={styles.label}>Employee code</span>
                                    <span style={styles.value}>94-K-6764-LEI</span>
                                </div>
                                <div style={styles.fieldGroup}>
                                    <span style={styles.label}>Account password*</span>
                                    <span style={styles.value}>******************</span>
                                </div>
                                <div style={styles.fieldGroup}>
                                    <span style={styles.label}>Current role</span>
                                    <span style={styles.value}>Manager</span>
                                </div>
                            </div>
                        </div>

                        <div style={styles.gridContainer}>
                            {/* Role Card */}
                            <div style={styles.card}>
                                <div style={styles.cardHeader}>
                                    <span style={styles.cardTitle}>Role</span>
                                    <EditIcon style={styles.editIcon} />
                                </div>
                                <div style={styles.roleList}>
                                    {roles.map((role) => (
                                        <div key={role.id} style={styles.roleRow}>
                                            <div style={styles.roleLeft}>
                                                <input type="radio" checked={role.selected} readOnly style={styles.radio} />
                                                <span style={{ ...styles.roleName, fontWeight: role.selected ? 'bold' : 'normal', color: role.selected ? 'black' : '#4b5563' }}>{role.name}</span>
                                            </div>
                                            <div style={styles.roleActions}>
                                                <button style={{ ...styles.actionButton, ...styles.editAction }}>
                                                    <EditIcon style={{ fontSize: '1rem' }} /> Edit
                                                </button>
                                                <button style={{ ...styles.actionButton, ...styles.deleteAction }}>
                                                    <DeleteOutlineIcon style={{ fontSize: '1rem' }} /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Permissions Card */}
                            <div style={styles.card}>
                                <div style={styles.cardHeader}>
                                    <span style={styles.cardTitle}>Permissions</span>
                                    <EditIcon style={styles.editIcon} />
                                </div>
                                <table style={styles.permissionsTable}>
                                    <thead>
                                        <tr>
                                            <th style={{ ...styles.permissionHeader, textAlign: 'left' }}></th>
                                            <th style={styles.permissionHeader}>VIEW</th>
                                            <th style={styles.permissionHeader}>EDIT</th>
                                            <th style={styles.permissionHeader}>CREATE</th>
                                            <th style={styles.permissionHeader}>APPROVAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {permissions.map((perm) => (
                                            <tr key={perm.name} style={styles.permissionRow}>
                                                <td style={{ ...styles.permissionCell, ...styles.permissionName }}>{perm.name}</td>
                                                <td style={styles.permissionCell}>
                                                    {perm.view ? <CheckIcon style={styles.checkIcon} /> : null}
                                                </td>
                                                <td style={styles.permissionCell}>
                                                    <Toggle checked={perm.edit} onChange={() => { }} />
                                                </td>
                                                <td style={styles.permissionCell}>
                                                    <Toggle checked={perm.create} onChange={() => { }} />
                                                </td>
                                                <td style={styles.permissionCell}>
                                                    <Toggle checked={perm.approval} onChange={() => { }} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
