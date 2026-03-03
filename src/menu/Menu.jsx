import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MenuStyles } from './MenuStyle';

import AddBoxIcon from '@mui/icons-material/AddBox';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { openAddProductModal, setScannedBarcode } from '../actions/ui';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';

const Menu = () => {
    const styles = new MenuStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [hoveredBox, setHoveredBox] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanBuffer, setScanBuffer] = useState('');
    const scanInputRef = useRef(null);

    // Keep focus on the hidden input when scanning
    useEffect(() => {
        if (isScanning && scanInputRef.current) {
            scanInputRef.current.focus();
        }
    }, [isScanning]);

    const handleBoxClick = (action) => {
        if (action === 'addProduct') {
            dispatch(openAddProductModal());
        } else if (action === 'scan') {
            setIsScanning(true);
        } else if (action === 'addOrder') {
            navigate('/orders', { state: { openAddModal: true } });
        } else if (action === 'addCategory') {
            navigate('/categories', { state: { openAddModal: true } });
        } else if (action === 'addEmployee') {
            navigate('/users', { state: { openAddModal: true } });
        } else if (action === 'settings') {
            navigate('/settings');
        }
    };

    const handleScanSubmit = (e) => {
        e.preventDefault();
        if (scanBuffer.trim()) {
            const barcode = scanBuffer.trim();
            setIsScanning(false);
            setScanBuffer('');

            // Dispatch the scanned barcode into Redux, which AddProductModal uses to auto-fill
            dispatch(setScannedBarcode(barcode));
            dispatch(openAddProductModal());
        }
    };

    const user = JSON.parse(localStorage.getItem('profile'));

    const boxes = [
        { id: 'addProduct', label: 'Add Product', icon: <AddBoxIcon style={styles.icon} /> },
        { id: 'scan', label: 'Scan (Add Product)', icon: <QrCodeScannerIcon style={styles.icon} /> },
        { id: 'addOrder', label: 'Add Order', icon: <AddShoppingCartIcon style={styles.icon} /> },
        { id: 'addCategory', label: 'Add Category', icon: <CategoryIcon style={styles.icon} /> },
        ...(user?.result?.role === 'Admin' ? [{ id: 'addEmployee', label: 'Add Employee', icon: <PersonAddIcon style={styles.icon} /> }] : []),
        { id: 'settings', label: 'Settings', icon: <SettingsIcon style={styles.icon} /> },
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', flexDirection: 'column' }}>
            <TopBar />
            <div style={{ display: 'flex', flexGrow: 1, marginTop: '20px' }}>
                <NavigationBar />
                <div style={{ flex: 1, padding: '2rem' }}>
                    <div style={{ ...styles.container, padding: 0, marginTop: 0, minHeight: 'auto' }}>
                        <h1 style={styles.header}>Quick Actions Menu</h1>
                        <div style={styles.grid}>
                            {boxes.map((box) => (
                                <div
                                    key={box.id}
                                    style={{
                                        ...styles.box,
                                        ...(hoveredBox === box.id ? styles.boxHover : {})
                                    }}
                                    onMouseEnter={() => setHoveredBox(box.id)}
                                    onMouseLeave={() => setHoveredBox(null)}
                                    onClick={() => handleBoxClick(box.id)}
                                >
                                    {box.icon}
                                    <span style={styles.label}>{box.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scan Modal */}
            {isScanning && (
                <div style={styles.modalOverlay} onClick={() => setIsScanning(false)}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <QrCodeScannerIcon style={{ fontSize: '4rem', color: '#10b981' }} />
                        <h2 style={{ margin: 0, color: '#1f2937' }}>Ready to Scan!</h2>
                        <p style={{ color: '#6b7280', margin: 0 }}>Please use your barcode scanner now.</p>

                        <form onSubmit={handleScanSubmit}>
                            <input
                                ref={scanInputRef}
                                type="text"
                                style={styles.scanInput}
                                value={scanBuffer}
                                onChange={(e) => setScanBuffer(e.target.value)}
                                onBlur={() => {
                                    // re-focus immediately if they click away
                                    if (isScanning && scanInputRef.current) {
                                        scanInputRef.current.focus();
                                    }
                                }}
                                autoFocus
                            />
                        </form>

                        <button
                            style={{
                                marginTop: '1rem',
                                padding: '0.75rem 2rem',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                            onClick={() => setIsScanning(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
