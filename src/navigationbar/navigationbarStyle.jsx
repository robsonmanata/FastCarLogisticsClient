export class NavigationStyles {
    sidebar = {
        width: '200px',
        height: 'calc(100vh - 70px)', // Adjust height to account for TopBar
        backgroundColor: '#E5E7EB',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '0.5rem', // Further reduced padding
        boxSizing: 'border-box',
        position: 'fixed',
        left: 0,
        top: '70px', // Push down by TopBar height
        zIndex: 900,
    };

    menu = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.1rem', // Minimal gap
        flex: 1,
    };
    menuItem = {
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0.75rem', // Tighter padding
        color: 'rgba(9, 9, 9, 0.7)',
        textDecoration: 'none',
        borderRadius: '8px',
        transition: 'all 0.2s',
        cursor: 'pointer',
        fontSize: '0.9rem', // Smaller font
    };
    menuItemActive = {
        backgroundColor: 'rgba(234, 232, 232, 0.1)',
        color: 'black',
    };
    icon = {
        marginRight: '0.75rem',
        fontSize: '1.1rem', // Smaller icon
    };
    bottomSection = {
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.1rem', // Minimal gap
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '0.5rem',
    };
}
