export class DashboardStyles {
    wrapper = {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'white',
    };
    mainContent = {
        marginLeft: '250px', // Width of sidebar
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
    title = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#1f2937',
    };
    searchBar = {
        padding: '0.75rem 1.5rem',
        borderRadius: '20px',
        border: '1px solid #070707ff',
        width: '300px',
        outline: 'none',
    };
    sectionTitle = {
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: '1rem',
    };
    cardsGrid = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
    };
    card = {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    };
    cardValue = {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '0.5rem',
    };
    cardLabel = {
        fontSize: '0.875rem',
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    };
    gridContainer = {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
    };
    contentCard = {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        minHeight: '300px',
    };
    stockRow = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };
    stockLabel = {
        color: '#4b5563',
    };
    stockValue = {
        fontWeight: 'bold',
        color: '#1f2937',
    };
    lowStock = {
        color: '#ef4444',
        fontWeight: '500',
    };
    lowStockValue = {
        color: '#ef4444',
        fontWeight: 'bold',
    };
    dot = {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#ef4444',
    };
    categoryImage = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '4px',
    };
}
