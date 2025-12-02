export class InventoryStyles {
    wrapper = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'white',
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
        marginBottom: '2rem',
    };
    title = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#1f2937',
    };
    controls = {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
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
        backgroundColor: '#f3f4f6',
        outline: 'none',
        width: '300px',
        color: '#4b5563',
    };
    filterButton = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        backgroundColor: '#f3f4f6',
        color: '#4b5563',
        cursor: 'pointer',
    };
    newSkuButton = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        backgroundColor: '#374151',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '500',
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
        color: '#6b7280',
        textTransform: 'uppercase',
        borderBottom: '1px solid #f3f4f6',
    };
    td = {
        padding: '1rem',
        fontSize: '0.9rem',
        color: '#1f2937',
        borderBottom: '1px solid #f3f4f6',
        verticalAlign: 'middle',
    };
    partCell = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        fontWeight: '600',
    };
    partImage = {
        width: '40px',
        height: '40px',
        borderRadius: '6px',
        objectFit: 'cover',
        backgroundColor: '#f3f4f6',
    };
    categoryBadge = {
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '500',
        backgroundColor: '#e5e7eb',
        color: '#374151',
        display: 'inline-block',
    };
    barcode = {
        fontFamily: '"Libre Barcode 39", cursive', // Assuming a barcode font or fallback
        fontSize: '2rem',
        lineHeight: '1',
        color: '#1f2937',
    };
    warningIcon = {
        color: '#f59e0b',
        fontSize: '1.2rem',
    };
    addStockButton = {
        padding: '0.25rem 0.75rem',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        backgroundColor: 'white',
        color: '#1f2937',
        fontSize: '0.85rem',
        cursor: 'pointer',
        fontWeight: '500',
    };
    utilizeStockButton = {
        padding: '0.25rem 0.75rem',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        backgroundColor: 'white',
        color: '#ef4444', // Red color for utilize
        fontSize: '0.85rem',
        cursor: 'pointer',
        fontWeight: '500',
    };
    actionIcon = {
        color: '#9ca3af',
        cursor: 'pointer',
    };

    // Popup Styles
    overlay = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
    };
    popup = {
        width: '400px',
        backgroundColor: 'white',
        height: '100%',
        padding: '1.5rem', // Reduced padding
        boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
    };
    popupHeader = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem', // Reduced margin
    };
    popupTitle = {
        fontSize: '1.25rem', // Reduced font size
        fontWeight: 'bold',
        color: '#1f2937',
    };
    closeButton = {
        background: 'none',
        border: 'none',
        fontSize: '1.25rem', // Reduced font size
        cursor: 'pointer',
        color: '#6b7280',
    };
    form = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem', // Reduced gap
    };
    formRow = {
        display: 'flex',
        gap: '1rem',
    };
    formGroup = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem', // Reduced gap
        flex: 1,
    };
    label = {
        fontSize: '0.85rem', // Reduced font size
        fontWeight: '600',
        color: '#374151',
    };
    input = {
        padding: '0.5rem', // Reduced padding
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        fontSize: '0.9rem', // Reduced font size
        outline: 'none',
    };
    select = {
        padding: '0.5rem', // Reduced padding
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        fontSize: '0.9rem', // Reduced font size
        outline: 'none',
        backgroundColor: 'white',
        color: '#1f2937',
    };
    buttonGroup = {
        display: 'flex',
        gap: '1rem',
        marginTop: '1.5rem', // Reduced margin
    };
    submitButton = {
        flex: 1,
        padding: '0.6rem', // Reduced padding
        borderRadius: '6px',
        border: 'none',
        backgroundColor: '#374151',
        color: 'white',
        fontWeight: '600',
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
    filterInputGroup = {
        display: 'flex',
        gap: '0.5rem'
    };
    filterInput = {
        width: '50%',
        padding: '0.5rem',
        borderRadius: '4px',
        border: '1px solid #ddd',
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
    barcodeContainer = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };
    barcodeBars = {
        display: 'flex',
        gap: '2px',
        height: '20px'
    };
    popupOverlay = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    };
    popupContainer = {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        width: '300px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    };
    confirmPopupTitle = {
        marginBottom: '1rem',
        fontSize: '1.25rem',
        fontWeight: 'bold'
    };
    popupText = {
        marginBottom: '1rem',
        color: '#4b5563'
    };
    popupInput = {
        width: '100%',
        padding: '0.5rem',
        marginBottom: '1rem',
        borderRadius: '4px',
        border: '1px solid #d1d5db'
    };
    popupActions = {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-end'
    };
    popupCancelButton = {
        padding: '0.5rem 1rem',
        border: '1px solid #d1d5db',
        borderRadius: '4px',
        background: 'white',
        cursor: 'pointer',
        color: '#374151'
    };
    popupConfirmButton = {
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '4px',
        background: '#374151',
        color: 'white',
        cursor: 'pointer'
    };
    contentWrapper = {
        display: 'flex',
        flex: 1,
    };
    filterContainer = {
        position: 'relative',
    };
    barcodeLineThin = {
        width: '1px',
        backgroundColor: 'black',
    };
    barcodeLineThick = {
        width: '2px',
        backgroundColor: 'black',
    };
}
