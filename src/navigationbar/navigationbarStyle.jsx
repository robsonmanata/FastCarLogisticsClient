export class NavigationStyles {
    sidebar = {
        width: '250px',
        height: 'calc(100vh - 70px)', // Adjust height to account for TopBar
        backgroundColor: '#f5f5f5',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 1rem',
        boxSizing: 'border-box',
        position: 'fixed',
        left: 0,
        top: '70px', // Push down by TopBar height
        zIndex: 900,
    };

    menu = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        flex: 1,
    };
    menuItem = {
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem 1rem',
        color: 'rgba(9, 9, 9, 0.7)',
        textDecoration: 'none',
        borderRadius: '8px',
        transition: 'all 0.2s',
        cursor: 'pointer',
        fontSize: '1rem',
    };
    menuItemActive = {
        backgroundColor: 'rgba(234, 232, 232, 0.1)',
        color: 'black',
    };
    icon = {
        marginRight: '1rem',
        fontSize: '1.2rem',
    };
    bottomSection = {
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        paddingTop: '1rem',
    };
}
