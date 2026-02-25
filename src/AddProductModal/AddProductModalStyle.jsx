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
        width: '650px', // Increased width for better fitting
        backgroundColor: 'white',
        maxHeight: '95vh', // Allow slight more height
        padding: '1rem', // Reduced padding
        borderRadius: '8px', // slightly tighter corners
        boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
    };
    popupHeader = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem', // Reduced margin
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
        gap: '0.4rem', // Reduced overall form gap
    };
    formRow = {
        display: 'flex',
        gap: '0.5rem', // Tighter rows
    };
    formGroup = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        flex: 1,
    };
    label = {
        fontSize: '0.75rem', // Slightly smaller
        fontWeight: '600',
        color: '#374151',
    };
    input = {
        padding: '0.35rem 0.5rem', // Thinner inputs
        borderRadius: '4px',
        border: '1px solid #d1d5db',
        fontSize: '0.85rem',
        outline: 'none',
    };
    barcodeInput = {
        padding: '0.35rem 0.5rem',
        borderRadius: '4px',
        border: '2px dashed #374151', // Distinct green dashed border
        backgroundColor: '#374151', // Light green background
        fontSize: '0.9rem',
        fontWeight: 'bold',
        outline: 'none',
        color: '#ffffff', // Changed to white
    };
    select = {
        padding: '0.35rem 0.5rem', // Thinner selects
        borderRadius: '4px',
        border: '1px solid #d1d5db',
        fontSize: '0.85rem',
        outline: 'none',
        backgroundColor: 'white',
        color: '#1f2937',
    };
    buttonGroup = {
        display: 'flex',
        gap: '0.5rem',
        marginTop: '0.5rem', // Tighter spacing
    };
    submitButton = {
        flex: 1,
        padding: '0.5rem', // Thinner buttons
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#374151',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer',
    };
    cancelButton = {
        flex: 1,
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #d1d5db',
        backgroundColor: 'white',
        color: '#374151',
        fontWeight: '600',
        cursor: 'pointer',
    };
    deleteButton = {
        flex: 1,
        padding: '0.5rem',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#ef4444',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer',
    };
    fileInputLabel = {
        padding: '0.5rem', // Thinner label
        backgroundColor: '#374151',
        color: 'white',
        borderRadius: '4px',
        border: 'none',
        textAlign: 'center',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: '0.85rem',
        fontWeight: '600',
        marginTop: '0.25rem', // Tighter margin
    };
    fileInput = {
        display: 'none',
    };
}
