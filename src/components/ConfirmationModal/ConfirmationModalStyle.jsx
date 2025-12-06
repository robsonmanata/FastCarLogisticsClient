export class ConfirmationModalStyles {
    overlay = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2000, // Higher than other modals
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
    popup = {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        width: '400px',
        maxWidth: '90%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
    };
    title = {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#1f2937',
        margin: 0,
    };
    message = {
        fontSize: '1rem',
        color: '#4b5563',
        margin: 0,
    };
    buttonGroup = {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
    };
    confirmButton = {
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#ef4444',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '0.9rem',
        flex: 1,
    };
    cancelButton = {
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        backgroundColor: 'white',
        color: '#374151',
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '0.9rem',
        flex: 1,
    };
}
