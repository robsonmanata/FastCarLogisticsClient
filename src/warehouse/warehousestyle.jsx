export class WarehouseStyles {
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
        backgroundColor: '#f9fafb',
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
    searchInput = {
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        minWidth: '250px',
    };
    filterSelect = {
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        backgroundColor: 'white',
        color: '#6b7280',
    };
    addStoreButton = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontWeight: '500',
    };
    contentGrid = {
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '2rem',
        alignItems: 'start',
    };
    storeList = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    };
    storeCard = {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        transition: 'all 0.2s',
    };
    storeCardSelected = {
        border: '1px solid #2563eb',
        boxShadow: '0 0 0 1px #2563eb',
    };
    storeThumbnail = {
        width: '60px',
        height: '60px',
        borderRadius: '8px',
        objectFit: 'cover',
        backgroundColor: '#f3f4f6',
    };
    storeName = {
        fontWeight: '500',
        color: '#1f2937',
    };
    storeNameSelected = {
        color: '#2563eb',
    };
    storeDetails = {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        border: '1px solid #e5e7eb',
    };
    detailHeader = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '1.5rem',
    };
    imageRow = {
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
    };
    detailImage = {
        width: '120px',
        height: '120px',
        borderRadius: '12px',
        objectFit: 'cover',
        backgroundColor: '#f3f4f6',
    };
    statsGrid = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
        marginBottom: '2rem',
    };
    statRow = {
        display: 'flex',
        justifyContent: 'space-between', // Or just gap, depending on alignment
        marginBottom: '0.5rem',
    };
    statLabel = {
        color: '#4b5563',
        fontWeight: '500',
        width: '140px', // Fixed width for alignment
    };
    statValue = {
        color: '#1f2937',
        fontWeight: '400',
    };
    refundsLabel = {
        color: '#ef4444',
        fontWeight: '500',
        width: '140px',
    };
    refundsValue = {
        color: '#ef4444',
        fontWeight: '500',
    };
    statusOpen = {
        color: '#10b981',
        fontWeight: '500',
    };
    popularSection = {
        marginTop: '2rem',
    };
    popularTitle = {
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '1rem',
    };
    popularItemsRow = {
        display: 'flex',
        gap: '1rem',
    };
    popularItemCard = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '120px',
    };
    popularItemImage = {
        width: '100%',
        height: '120px',
        borderRadius: '12px',
        objectFit: 'cover',
        backgroundColor: '#f3f4f6',
    };
    popularItemName = {
        fontSize: '0.85rem',
        color: '#4b5563',
        textAlign: 'center',
    };
}
