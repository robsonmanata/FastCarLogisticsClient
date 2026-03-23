export class BarcodeGeneratorStyles {
    errorText = {
        color: 'red',
        fontSize: '12px'
    };
    inlineWrapper = {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        cursor: 'pointer'
    };
    inlineCanvas = {
        height: '40px',
        maxWidth: '100px',
        objectFit: 'contain'
    };
    modalOverlay = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        cursor: 'pointer'
    };
    modalContent = {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        minWidth: '400px'
    };
    productDetails = {
        textAlign: 'center',
        width: '100%'
    };
    productName = {
        margin: '0 0 0.5rem 0',
        color: '#1f2937'
    };
    productInfo = {
        margin: '0 0 0.25rem 0',
        color: '#4b5563',
        fontSize: '0.9rem'
    };
    priceText = {
        margin: '0',
        color: '#4b5563',
        fontSize: '0.9rem'
    };
    divider = {
        border: 'none',
        borderTop: '1px solid #e5e7eb',
        margin: '1rem 0'
    };
    scanHeader = {
        margin: 0,
        color: '#374151'
    };
    canvasContainer = {
        padding: '1rem',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    };
    closeButton = {
        marginTop: '1rem',
        padding: '0.5rem 1.5rem',
        backgroundColor: '#374151',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };
}
