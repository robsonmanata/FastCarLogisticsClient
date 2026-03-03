export class MenuStyles {
    container = {
        padding: '2rem',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    header = {
        fontSize: '2rem',
        color: '#1f2937',
        marginBottom: '2rem',
        fontWeight: 'bold',
    };

    grid = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '2rem',
        maxWidth: '800px',
        width: '100%',
    };

    box = {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        gap: '1rem',
        color: '#374151',
    };

    boxHover = {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        color: '#2563eb',
    };

    icon = {
        fontSize: '3rem',
        color: 'inherit',
    };

    label = {
        fontSize: '1rem',
        fontWeight: '600',
        textAlign: 'center',
    };

    // Scan Modal styles
    modalOverlay = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
    };

    modalContent = {
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
    };

    scanInput = {
        opacity: 0,
        position: 'absolute',
        pointerEvents: 'none',
    };

    scanAnimationContainer = {
        width: '100px',
        height: '100px',
        border: '4px solid #10b981',
        borderRadius: '12px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    };

    scanLine = {
        position: 'absolute',
        width: '100%',
        height: '2px',
        backgroundColor: 'red',
        boxShadow: '0 0 4px red',
        animation: 'scan 2s linear infinite',
    };
}
