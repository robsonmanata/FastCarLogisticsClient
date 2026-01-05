export class ItemsUsedStyles {
    wrapper = {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f3f4f6'
    };
    contentWrapper = {
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        marginTop: '80px'
    };
    mainContent = {
        marginLeft: '200px',
        flex: 1,
        padding: '2rem',
        overflowY: 'auto'
    };
    title = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '1.5rem'
    };
    tableContainer = {
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
    };
    table = {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left'
    };
    th = {
        padding: '1rem',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
        color: '#6b7280',
        fontWeight: '600',
        fontSize: '0.75rem',
        textTransform: 'uppercase'
    };
    td = {
        padding: '1rem',
        borderBottom: '1px solid #e5e7eb',
        color: '#374151',
        fontSize: '0.875rem'
    };
    empty = {
        padding: '2rem',
        textAlign: 'center',
        color: '#6b7280'
    };
}
