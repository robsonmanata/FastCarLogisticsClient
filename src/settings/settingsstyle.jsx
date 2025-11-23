export class SettingsStyles {
    wrapper = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'white',
    };
    mainContent = {
        marginLeft: '250px',
        flex: 1,
        padding: '2rem',
        marginTop: '70px',
        backgroundColor: '#f9fafb', // Light grey background for the page content area
    };
    header = {
        marginBottom: '2rem',
    };
    title = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#1f2937',
    };
    section = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    };
    card = {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        position: 'relative',
    };
    cardHeader = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
    };
    cardTitle = {
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#1f2937',
    };
    editIcon = {
        cursor: 'pointer',
        color: '#4b5563',
    };
    profileGrid = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
    };
    fieldGroup = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    };
    label = {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#1f2937',
    };
    value = {
        fontSize: '1rem',
        color: '#4b5563',
    };
    gridContainer = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
    };
    roleList = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    };
    roleRow = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 0',
    };
    roleLeft = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    };
    radio = {
        width: '18px',
        height: '18px',
        cursor: 'pointer',
    };
    roleName = {
        fontSize: '1rem',
        color: '#4b5563',
    };
    roleActions = {
        display: 'flex',
        gap: '1rem',
    };
    actionButton = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.9rem',
        cursor: 'pointer',
        border: 'none',
        background: 'none',
    };
    editAction = {
        color: '#2563eb',
    };
    deleteAction = {
        color: '#ef4444',
    };
    permissionsTable = {
        width: '100%',
        borderCollapse: 'collapse',
    };
    permissionHeader = {
        textAlign: 'center',
        fontSize: '0.8rem',
        fontWeight: '600',
        color: '#6b7280',
        paddingBottom: '1rem',
        textTransform: 'uppercase',
    };
    permissionRow = {
        borderBottom: '1px solid #f3f4f6',
    };
    permissionCell = {
        padding: '1rem 0',
        textAlign: 'center',
    };
    permissionName = {
        textAlign: 'left',
        fontWeight: '500',
        color: '#4b5563',
    };
    checkIcon = {
        color: '#10b981',
        fontSize: '1.2rem',
    };
    toggleSwitch = {
        position: 'relative',
        display: 'inline-block',
        width: '36px',
        height: '20px',
    };
    toggleInput = {
        opacity: 0,
        width: 0,
        height: 0,
    };
    toggleSlider = {
        position: 'absolute',
        cursor: 'pointer',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ccc',
        transition: '.4s',
        borderRadius: '34px',
    };
    toggleSliderChecked = {
        backgroundColor: '#2563eb',
    };
    toggleSliderBefore = {
        position: 'absolute',
        content: '""',
        height: '16px',
        width: '16px',
        left: '2px',
        bottom: '2px',
        backgroundColor: 'white',
        transition: '.4s',
        borderRadius: '50%',
    };
    toggleSliderBeforeChecked = {
        transform: 'translateX(16px)',
    };
}
