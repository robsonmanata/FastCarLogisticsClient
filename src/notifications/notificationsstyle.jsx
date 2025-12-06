export class NotificationStyles {
    container = {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f3f4f6',
    };
    contentWrapper = {
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        marginTop: '70px', // Push content below fixed TopBar
    };
    mainContent = {
        flex: 1,
        padding: '2rem',
        overflowY: 'auto',
        marginLeft: '250px', // Matches sidebar width
    };
    header = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        color: '#1f2937',
    };
    notificationList = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    };
    notificationItem = {
        backgroundColor: 'white',
        padding: '1rem', // Reduced padding
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    };
    notificationContent = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    };
    message = {
        fontSize: '0.95rem', // Reduced font size
        color: '#374151',
        fontWeight: '500',
    };
    date = {
        fontSize: '0.85rem',
        color: '#6b7280',
    };
    unreadIndicator = {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: '#ef4444',
        marginLeft: '1rem',
    };
    readIndicator = {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: '#d1d5db',
        marginLeft: '1rem',
    };
}
