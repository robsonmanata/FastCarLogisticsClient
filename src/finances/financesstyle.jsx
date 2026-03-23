export class FinancesStyles {
    wrapper = {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#f3f4f6'
    };
    contentWrapper = {
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        marginTop: '80px'
    };
    mainContent = {
        marginLeft: '200px',
        flex: 1,
        padding: '2rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    };
    header = {
        marginBottom: '1rem'
    };
    title = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#1f2937'
    };
    cardsGrid = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
    };
    card = {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    };
    cardValue = {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '0.5rem'
    };
    cardLabel = {
        fontSize: '0.875rem',
        color: '#6b7280',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    };
    graphContainer = {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    };
    tableContainer = {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '1.5rem',
        marginTop: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    };
    table = {
        width: '100%',
        borderCollapse: 'collapse',
        minWidth: '600px'
    };
    th = {
        textAlign: 'left',
        padding: '1rem',
        borderBottom: '2px solid #f3f4f6',
        color: '#6b7280',
        fontSize: '0.875rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    };
    td = {
        padding: '1rem',
        borderBottom: '1px solid #f3f4f6',
        color: '#1f2937',
        fontSize: '0.95rem'
    };
}
