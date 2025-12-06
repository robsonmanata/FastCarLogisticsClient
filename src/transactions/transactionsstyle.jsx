export class TransactionsStyles {
    wrapper = {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f3f4f6',
    };
    contentWrapper = {
        display: 'flex',
        flex: 1,
        marginTop: '70px',
    };
    mainContent = {
        flex: 1,
        marginLeft: '200px',
        padding: '2rem',
        overflowY: 'auto',
    };
    title = {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: '0.5rem',
    };
    subtitle = {
        color: '#6b7280',
        marginBottom: '2rem',
        display: 'block',
    };
    controls = {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        marginBottom: '1rem',
    };
    searchContainer = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    };
    searchIcon = {
        position: 'absolute',
        left: '10px',
        color: '#9ca3af',
    };
    searchInput = {
        padding: '0.5rem 1rem 0.5rem 2.5rem',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        backgroundColor: 'white',
        outline: 'none',
        width: '300px',
        color: '#4b5563',
    };
    filterContainer = {
        position: 'relative',
    };
    filterButton = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        backgroundColor: 'white',
        color: '#4b5563',
        cursor: 'pointer',
    };
    filterDropdown = {
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '4px',
        zIndex: 10,
        minWidth: '300px',
        padding: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        color: 'black'
    };
    filterGroup = {
        marginBottom: '1rem'
    };
    filterLabel = {
        display: 'block',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        color: 'black'
    };
    filterSelect = {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
        color: 'black',
        backgroundColor: 'white'
    };
    filterOption = {
        color: 'black',
        backgroundColor: 'white'
    };
    filterDateGroup = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    };
    filterDateInput = {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
        color: 'black',
        backgroundColor: 'white'
    };
    clearFiltersButton = {
        width: '100%',
        padding: '0.5rem',
        backgroundColor: '#f0f0f0',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        color: 'black'
    };
}
