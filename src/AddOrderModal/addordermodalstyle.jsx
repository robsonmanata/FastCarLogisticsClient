export class AddOrderModalStyles {
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
        zIndex: 1000,
    };
    modal = {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        width: '500px',
        maxHeight: '90vh',
        overflowY: 'auto',
    };
    header = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    };
    title = {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#1f2937',
    };
    closeButton = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#6b7280',
    };
    formGroup = {
        marginBottom: '0.75rem',
    };
    label = {
        display: 'block',
        marginBottom: '0.25rem',
        fontWeight: '500',
        color: '#374151',
        fontSize: '0.875rem',
    };
    input = {
        width: '100%',
        padding: '0.4rem',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        color: '#1f2937',
        backgroundColor: 'white',
        fontSize: '0.875rem',
        boxSizing: 'border-box',
    };
    select = {
        width: '100%',
        padding: '0.4rem',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        color: '#1f2937',
        backgroundColor: 'white',
        fontSize: '0.875rem',
        boxSizing: 'border-box',
    };
    addItemGroup = {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'flex-end',
        marginBottom: '0.75rem',
    };
    addButton = {
        padding: '0.4rem 0.75rem',
        backgroundColor: '#1f2937',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.875rem',
    };
    itemsList = {
        marginBottom: '0.75rem',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        padding: '0.5rem',
        color: '#1f2937',
        fontSize: '0.875rem',
    };
    submitButton = {
        width: '100%',
        padding: '0.6rem',
        backgroundColor: '#1f2937',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        marginTop: '0.5rem',
        fontSize: '0.875rem',
    };
    deleteButton = {
        width: '100%',
        padding: '0.6rem',
        backgroundColor: '#ef4444',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '0.5rem',
        fontSize: '0.875rem',
    };
    removeIcon = {
        cursor: 'pointer',
        color: '#ef4444',
        marginLeft: '0.5rem',
    };
}
