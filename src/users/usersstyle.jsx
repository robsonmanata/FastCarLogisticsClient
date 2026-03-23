export class UsersStyles {
    wrapper = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
    };

    mainContent = {
        marginLeft: '200px',
        flex: 1,
        padding: '2rem',
        marginTop: '70px',
    };

    header = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
    };

    title = {
        fontSize: '1.875rem',
        fontWeight: 'bold',
        color: '#111827'
    };

    addButton = {
        backgroundColor: '#1f2937',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    };

    tableContainer = {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        overflow: 'hidden'
    };

    table = {
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left'
    };

    th = {
        padding: '1rem',
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
        fontWeight: '600',
        color: '#374151',
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        letterSpacing: '0.05em'
    };

    td = {
        padding: '1rem',
        borderBottom: '1px solid #e5e7eb',
        color: '#111827',
        verticalAlign: 'middle'
    };

    userCell = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    };

    avatar = {
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        backgroundColor: '#e5e7eb',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: '#374151',
        overflow: 'hidden' // Ensure image doesn't bleed
    };

    avatarImage = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    // Modal Styles
    overlay = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    };

    modal = {
        backgroundColor: 'white',
        padding: '1.5rem', // Reduced padding
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    };

    formGroup = {
        marginBottom: '0.75rem' // Reduced margin
    };

    label = {
        display: 'block',
        marginBottom: '0.25rem', // Reduced margin
        fontWeight: '500',
        color: '#374151',
        fontSize: '0.875rem' // Slightly smaller text
    };

    input = {
        width: '100%',
        padding: '0.4rem', // Reduced padding
        borderRadius: '0.375rem',
        border: '1px solid #d1d5db',
        boxSizing: 'border-box',
        fontSize: '0.875rem'
    };

    select = {
        width: '100%',
        padding: '0.4rem', // Reduced padding
        borderRadius: '0.375rem',
        border: '1px solid #d1d5db',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        fontSize: '0.875rem',
        color: '#1f2937' // Ensure text is dark
    };

    actionButtons = {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '1.5rem'
    };

    cancelButton = {
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        border: '1px solid #d1d5db',
        backgroundColor: 'white',
        color: '#374151',
        cursor: 'pointer'
    };

    saveButton = {
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        border: 'none',
        backgroundColor: '#1f2937',
        color: 'white',
        cursor: 'pointer'
    };
}
