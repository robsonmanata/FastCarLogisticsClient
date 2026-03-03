export class ChatStyles {
    container = {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
    };

    mainContent = {
        flex: 1,
        padding: '2rem',
        marginLeft: '220px', // For NavigationBar offset
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 64px)', // Adjust for topbar
    };

    chatWrapper = {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
    };

    // Sidebar
    sidebar = {
        width: '320px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
    };

    sidebarHeader = {
        padding: '1rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
    };

    sidebarTitle = {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#1f2937',
        margin: 0,
    };

    // Users List
    userList = {
        flex: 1,
        overflowY: 'auto',
    };

    userItem = {
        padding: '1rem',
        borderBottom: '1px solid #f3f4f6',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        position: 'relative',
    };

    userItemActive = {
        backgroundColor: '#eff6ff',
    };

    userItemHover = {
        backgroundColor: '#f9fafb',
    };

    avatar = {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#d1d5db',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '1rem',
        overflow: 'hidden',
    };

    avatarImg = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    userInfo = {
        flex: 1,
        overflow: 'hidden',
    };

    userName = {
        fontWeight: 'bold',
        color: '#1f2937',
        fontSize: '1rem',
        marginBottom: '0.25rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    userLastMessage = {
        fontSize: '0.85rem',
        color: '#6b7280',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    unreadBadge = {
        backgroundColor: '#10b981',
        color: 'white',
        borderRadius: '12px',
        padding: '0.1rem 0.5rem',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        marginLeft: '0.5rem',
    };

    // Chat Window
    chatWindow = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#e5e7eb', // Slightly darker like WhatsApp background
        position: 'relative',
    };

    chatHeader = {
        padding: '1rem',
        borderBottom: '1px solid #d1d5db',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
    };

    messagesArea = {
        flex: 1,
        padding: '1.5rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    };

    messageBubble = {
        maxWidth: '70%',
        padding: '0.75rem 1rem',
        borderRadius: '12px',
        position: 'relative',
        wordWrap: 'break-word',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    };

    messageSent = {
        backgroundColor: '#10b981', // App theme green
        color: 'white',
        alignSelf: 'flex-end',
        borderBottomRightRadius: '2px',
    };

    messageReceived = {
        backgroundColor: 'white',
        color: '#1f2937',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: '2px',
    };

    messageTime = {
        fontSize: '0.7rem',
        color: 'inherit',
        opacity: 0.8,
        display: 'block',
        textAlign: 'right',
        marginTop: '0.2rem',
    };

    emptyState = {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#6b7280',
    };

    // Input Area
    inputArea = {
        padding: '1rem',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #d1d5db',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    };

    input = {
        flex: 1,
        padding: '0.75rem 1rem',
        borderRadius: '24px',
        border: '1px solid #d1d5db',
        outline: 'none',
        fontSize: '1rem',
    };

    sendButton = {
        backgroundColor: '#1f2937', // Dark theme color
        color: 'white',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    };

    // User Selection Modal
    modalOverlay = {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    };

    modalContent = {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        width: '400px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
    };

    userListModal = {
        overflowY: 'auto',
        marginTop: '1rem',
    };
}
