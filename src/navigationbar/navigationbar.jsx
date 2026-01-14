import React from 'react';
import { NavigationStyles } from './navigationbarStyle';
import { Link, useLocation } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';



import { useDispatch } from 'react-redux';
import { openAddProductModal } from '../actions/ui';

const NavigationBar = () => {
    const styles = new NavigationStyles();
    const location = useLocation();
    const dispatch = useDispatch();
    const isActive = (path) => location.pathname === path;

    const user = JSON.parse(localStorage.getItem('profile'));
    const role = user?.result?.role || 'User'; // Default to User if unknown

    const menuItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <HomeIcon /> },
        { label: 'Inventory', path: '/inventory', icon: <InventoryIcon /> },
        { label: 'Orders', path: '/orders', icon: <InventoryIcon /> },
        { label: 'Categories', path: '/categories', icon: <CategoryIcon /> },
    ];

    if (role === 'Admin') {
        menuItems.push(
            { label: 'Transactions', path: '/transactions', icon: <ReceiptLongIcon /> },
            { label: 'Finances', path: '/finances', icon: <MonetizationOnIcon /> },
            { label: 'Users', path: '/users', icon: <GroupIcon /> }
        );
    }

    // Settings is visible to everyone (Personal Settings)
    menuItems.push({ label: 'Settings', path: '/settings', icon: <SettingsIcon /> });

    return (
        <div style={styles.sidebar} className="sidebar">
            <div style={styles.menu}>
                {menuItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        style={{
                            ...styles.menuItem,
                            ...(isActive(item.path) ? styles.menuItemActive : {}),
                        }}
                    >
                        <span style={styles.icon}>{item.icon}</span>
                        {item.label}
                    </Link>
                ))}
            </div>

            <div style={styles.bottomSection}>
                <button
                    onClick={() => dispatch(openAddProductModal())}
                    style={{ ...styles.menuItem, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', fontSize: 'inherit', fontFamily: 'inherit' }}
                >
                    <AddIcon />
                    Add product
                </button>
                <button onClick={() => { dispatch({ type: 'LOGOUT' }); window.location.href = '/FastCarLogisticsClient/'; }} style={{ ...styles.menuItem, background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', fontSize: 'inherit', fontFamily: 'inherit' }}>
                    <LogoutIcon style={{ marginRight: '1rem' }} />
                    Log out
                </button>
            </div>
        </div>
    );
};

export default NavigationBar;
