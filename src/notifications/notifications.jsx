import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, markAsRead } from '../actions/notifications';
import { NotificationStyles } from './notificationsstyle';

import moment from 'moment';
import TopBar from '../topBar/topbar';
import NavigationBar from '../navigationbar/navigationbar';

const Notifications = () => {
    const styles = new NotificationStyles();
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications);

    const user = useSelector((state) => state.auth.authData);

    useEffect(() => {
        dispatch(getNotifications());
    }, [dispatch]);

    const handleNotificationClick = (id, readBy) => {
        const userId = user?.result?._id || user?.result?.googleId;
        const userName = user?.result?.name;
        const isRead = readBy.some(r => r.userId === userId);

        if (!isRead) {
            dispatch(markAsRead(id, userName));
        }
    };

    return (
        <div style={styles.container}>
            <TopBar />
            <div style={styles.contentWrapper}>
                <NavigationBar />
                <div style={styles.mainContent}>
                    <h1 style={styles.header}>Notifications</h1>
                    <div style={styles.notificationList}>
                        {notifications.length === 0 ? (
                            <p style={{ color: '#6b7280' }}>No notifications yet.</p>
                        ) : (
                            notifications.map((notification) => {
                                const userId = user?.result?._id || user?.result?.googleId;
                                const isRead = notification.readBy?.some(r => r.userId === userId);

                                return (
                                    <div
                                        key={notification._id}
                                        style={{
                                            ...styles.notificationItem,
                                            backgroundColor: isRead ? 'white' : '#fef2f2',
                                        }}
                                        onClick={() => handleNotificationClick(notification._id, notification.readBy || [])}
                                    >
                                        <div style={styles.notificationContent}>
                                            <span style={styles.message}>{notification.message}</span>
                                            <span style={styles.date}>{moment(notification.createdAt).fromNow()}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            {notification.readBy?.map((reader, index) => (
                                                <div key={index} title={`Read by ${reader.userName} at ${moment(reader.readAt).format('LLL')}`} style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#d1d5db',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.7rem',
                                                    color: '#374151',
                                                    fontWeight: 'bold',
                                                    cursor: 'help'
                                                }}>
                                                    {reader.userName?.charAt(0).toUpperCase()}
                                                </div>
                                            ))}
                                            {!isRead && <div style={styles.unreadIndicator}></div>}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
