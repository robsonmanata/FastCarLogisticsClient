export class AddProductModalStyles {
    overlay = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'flex-end',
    };
    popup = {
        width: '500px',
        backgroundColor: 'white',
        maxHeight: '90vh', // Prevent it from exceeding viewport height
        padding: '1.5rem',
        borderRadius: '12px', // Smoother corners
        boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto', // Enable scrolling if content is too long
    };
    popupHeader = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    };
    popupTitle = {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#1f2937',
    };
    closeButton = {
        background: 'none',
        border: 'none',
        fontSize: '1.25rem',
        cursor: 'pointer',
        color: '#6b7280',
    };
    form = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem', // Reduced gap for compactness
    };
    formRow = {
        display: 'flex',
        gap: '1rem',
    };
    formGroup = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        flex: 1,
    };
    label = {
        fontSize: '0.85rem',
        fontWeight: '600',
        color: '#374151',
    };
    input = {
        padding: '0.5rem',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        fontSize: '0.9rem',
        outline: 'none',
    };
    select = {
        padding: '0.5rem',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        fontSize: '0.9rem',
        outline: 'none',
        backgroundColor: 'white',
        color: '#1f2937',
    };
    buttonGroup = {
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem',
    };
    submitButton = {
        flex: 1,
        padding: '0.6rem',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: '#374151',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer',
    };
    cancelButton = {
        flex: 1,
        padding: '0.6rem',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        backgroundColor: 'white',
        color: '#374151',
        fontWeight: '600',
        cursor: 'pointer',
    };
    deleteButton = {
        flex: 1,
        padding: '0.6rem',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: '#ef4444',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer',
    };
    fileInputLabel = {
        padding: '0.6rem',
        backgroundColor: '#374151',
        color: 'white',
        borderRadius: '6px',
        border: 'none',
        textAlign: 'center',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginTop: '0.5rem',
    };
    fileInput = {
        display: 'none',
    };
}
