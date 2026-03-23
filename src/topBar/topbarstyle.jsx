export class TopBarStyles {
    container = {
        height: '70px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 2rem',
        boxSizing: 'border-box',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
    };

    logoContainer = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        width: '25%', // Give it some space
    };

    logoimage = {
        height: '40px', // Fixed height for better control
        objectFit: 'contain',
    };

    welcomeText = {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#374151',
        whiteSpace: 'nowrap',
    };

    searchContainer = {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '600px',
        margin: '0 2rem',
    };

    searchInput = {
        width: '100%',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
        outline: 'none',
        fontSize: '0.9rem',
        color: '#374151', // Darker color for visibility
    };

    actions = {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
    };

    icon = {
        fontSize: '1.2rem',
        cursor: 'pointer',
        color: 'black',
    };

    avatar = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        overflow: 'hidden',
    };

    avatarImage = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    searchResults = {
        position: 'absolute',
        top: '100%',
        left: '0',
        right: '0',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        marginTop: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        zIndex: 1001,
        maxHeight: '300px',
        overflowY: 'auto',
    };

    searchResultItem = {
        padding: '0.75rem 1rem',
        cursor: 'pointer',
        fontSize: '0.9rem',
        color: '#374151',
        borderBottom: '1px solid #f3f4f6',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    };
}
