import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TopBarStyles } from './topbarstyles';
import logoImage from '../assets/fastcarlogo.webp';
import AppsIcon from '@mui/icons-material/Apps';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import * as api from '../api/index';
import { openAddProductModal } from '../actions/ui';
import { getNotifications } from '../actions/notifications';
import Badge from '@mui/material/Badge';

const TopBar = () => {
    const styles = new TopBarStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.authData);
    const { items: notifications, meta } = useSelector((state) => state.notifications);
    const unreadCount = meta?.unreadCount || 0;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    const searchItems = [
        { label: 'Dashboard', path: '/dashboard', type: 'navigation' },
        { label: 'Inventory', path: '/inventory', type: 'navigation' },
        { label: 'Categories', path: '/categories', type: 'navigation' },
        { label: 'Warehouse', path: '/warehouse', type: 'navigation' },
        { label: 'Finances', path: '/finances', type: 'navigation' },
        { label: 'Settings', path: '/settings', type: 'navigation' },
        { label: 'Add Product', type: 'action', action: openAddProductModal },
    ];

    useEffect(() => {
        dispatch(getNotifications(1));
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            setSearchResults([]);
            setShowResults(false);
        } else {
            const results = searchItems.filter(item =>
                item.label.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(results);
            setShowResults(true);
        }
    };

    const handleItemClick = (item) => {
        if (item.type === 'navigation') {
            navigate(item.path);
        } else if (item.type === 'action') {
            dispatch(item.action());
        }
        setSearchTerm('');
        setShowResults(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.logoContainer}>
                <img src={logoImage} alt="Logo" style={styles.logoimage} />
                {user?.result?.name && (
                    <span style={styles.welcomeText}>Welcome, {user.result.name}</span>
                )}
            </div>

            <div style={styles.searchContainer} ref={searchRef}>
                <div style={{ position: 'relative', width: '100%' }}>
                    <input
                        type="text"
                        placeholder="Search..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={handleSearch}
                        onFocus={() => {
                            if (searchTerm) setShowResults(true);
                        }}
                    />
                    {showResults && searchResults.length > 0 && (
                        <div style={styles.searchResults}>
                            {searchResults.map((item, index) => (
                                <div
                                    key={index}
                                    style={styles.searchResultItem}
                                    onClick={() => handleItemClick(item)}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <SearchIcon style={{ fontSize: '1rem', color: '#9ca3af' }} />
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div style={styles.actions}>
                <AppsIcon style={styles.icon} titleAccess="Menu" />
                <ChatBubbleOutlineIcon style={styles.icon} titleAccess="Chat" />
                <div style={{ cursor: 'pointer' }} onClick={() => navigate('/notifications')}>
                    <Badge badgeContent={unreadCount} color="error">
                        <NotificationsNoneIcon style={styles.icon} titleAccess="Notifications" />
                    </Badge>
                </div>
                <div style={styles.avatar}>
                    {user?.result?.profilePicture ? (
                        <img src={user.result.profilePicture} alt={user.result.name} style={styles.avatarImage} />
                    ) : (
                        <PersonIcon />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopBar;
