export class CategoriesStyles {
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
    titleGroup = {
        display: 'flex',
        flexDirection: 'column',
    };
    title = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '0.5rem',
    };
    subtitle = {
        fontSize: '0.9rem',
        color: '#9ca3af',
    };
    addCategoryButton = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        backgroundColor: '#374151', // Matches inventory add button
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '0.9rem',
    };
    categoryList = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    };
    categoryCard = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
    };
    cardLeft = {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
    };
    categoryImage = {
        width: '60px',
        height: '60px',
        borderRadius: '8px',
        objectFit: 'cover',
        backgroundColor: '#f3f4f6',
    };
    categoryInfo = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
    };
    categoryName = {
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: '#1f2937',
    };
    itemCount = {
        fontSize: '0.9rem',
        color: '#6b7280',
    };
    arrowButton = {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6b7280',
        backgroundColor: 'white',
    };
    actionContainer = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    };
    moreIcon = {
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
        padding: '1.5rem',
        boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
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
        gap: '0.75rem',
    };
    formGroup = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
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
    buttonGroup = {
        display: 'flex',
        gap: '1rem',
        marginTop: '1.5rem',
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
}
