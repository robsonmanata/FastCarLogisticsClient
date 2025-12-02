export class OrdersStyles {
    wrapper = {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'white',
    };
    contentWrapper = {
        display: 'flex',
        flex: 1,
        marginTop: '70px',
    };
    mainContent = {
        marginLeft: '200px',
        flex: 1,
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    };
    header = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    };
    titleGroup = {
        display: 'flex',
        flexDirection: 'column',
    };
    title = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#1f2937',
    };
    subtitle = {
        fontSize: '0.9rem',
        color: '#6b7280',
    };
    actionsGroup = {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
    };
    searchBar = {
        padding: '0.6rem 1rem',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        width: '250px',
        outline: 'none',
        fontSize: '0.9rem',
    };
    filterButton = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1rem',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        backgroundColor: 'white',
        color: '#374151',
        fontWeight: '500',
        cursor: 'pointer',
    };
    addOrderButton = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1rem',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#1f2937',
        color: 'white',
        fontWeight: '500',
        cursor: 'pointer',
    };
    tableContainer = {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        overflow: 'hidden',
    };
    table = {
        width: '100%',
        borderCollapse: 'collapse',
    };
    th = {
        textAlign: 'left',
        padding: '1rem',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#4b5563',
        textTransform: 'uppercase',
        borderBottom: '1px solid #e5e7eb',
    };
    tr = {
        borderBottom: '1px solid #f3f4f6',
    };
    td = {
        padding: '1rem',
        fontSize: '0.9rem',
        color: '#1f2937',
        verticalAlign: 'middle',
    };
    statusBadge = (status) => ({
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        backgroundColor: status === 'Completed' ? '#d1fae5' : status === 'Pending' ? '#fef3c7' : '#fee2e2',
        color: status === 'Completed' ? '#065f46' : status === 'Pending' ? '#92400e' : '#b91c1c',
    });
    actionButton = {
        padding: '0.4rem',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        backgroundColor: 'white',
        color: '#374151',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    expandedRow = {
        backgroundColor: '#f9fafb',
    };
    detailsContainer = {
        padding: '1rem 2rem',
    };
    detailsTitle = {
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
    };
    itemsTable = {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '1rem',
    };
    itemTh = {
        textAlign: 'left',
        padding: '0.5rem',
        fontSize: '0.8rem',
        fontWeight: '600',
        color: '#6b7280',
        borderBottom: '1px solid #e5e7eb',
    };
    itemTd = {
        padding: '0.5rem',
        fontSize: '0.9rem',
        color: '#374151',
    };
}
