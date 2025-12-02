export class NavigationStyles {
    sidebar = {
        width: '200px',
        height: 'calc(100vh - 70px)', // Adjust height to account for TopBar
        backgroundColor: '#E5E7EB',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        boxSizing: 'border-box',
        position: 'fixed',
        left: 0,
        top: '70px', // Push down by TopBar height
        zIndex: 900,
    };

    menu = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem', // Reduced gap for compact layout
        flex: 1,
    };
    menuItem = {
        display: 'flex',
        alignItems: 'center',
        padding: '0.6rem 1rem', // Reduced padding for compact layout
        color: 'rgba(9, 9, 9, 0.7)',
        textDecoration: 'none',
        borderRadius: '8px',
        transition: 'all 0.2s',
        cursor: 'pointer',
        fontSize: '0.95rem', // Slightly smaller font
    };
    menuItemActive = {
        backgroundColor: 'rgba(234, 232, 232, 0.1)',
        color: 'black',
    };
    icon = {
        marginRight: '0.75rem', // Slightly reduced margin
        fontSize: '1.2rem',
    };
    bottomSection = {
        marginTop: 'auto', // Push to bottom
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem', // Reduced gap
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '0.5rem',
    };
}
