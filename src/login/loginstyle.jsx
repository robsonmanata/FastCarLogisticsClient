export class LoginStyles {
    container = {
        display: 'flex',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'white',
        overflow: 'hidden',
    };
    imageSection = {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    };
    image = {
        width: '90%',
        height: '90%',
        objectFit: 'cover',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)', // Darker shadow
        borderRadius: '8px',
    };
    formSection = {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
    };
    formCard = {
        width: '100%',
        maxWidth: '400px',
        minHeight: '450px', // Reduced minHeight
        height: 'auto',
        padding: '1.5rem', // Reduced padding
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // Center content vertically
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        boxSizing: 'border-box',
    };
    logoimage = {
        width: '120px', // Reduced width
        height: 'auto',
        objectFit: 'contain',
        marginBottom: '1rem', // Reduced margin
    };
    lockIconContainer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0.5rem', // Reduced margin
    };
    lockIcon = {
        fontSize: '1.8rem', // Reduced size
        color: '#244373', // blue logo color
    };
    title = {
        fontSize: '1.3rem', // Reduced font size
        fontWeight: '400',
        color: '#244373',
        marginBottom: '1.5rem', // Reduced margin
    };
    form = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem', // Reduced gap
    };
    inputRow = {
        display: 'flex',
        gap: '0.8rem', // Reduced gap
        width: '100%',
    };
    inputGroup = {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    };
    input = {
        padding: '0.75rem', // Reduced padding
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '0.9rem', // Reduced font size
        outline: 'none',
        width: '100%',
        boxSizing: 'border-box',
        color: 'white',
        backgroundColor: '#333', // Dark background for white text
    };
    passwordToggle = {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#757575',
    };
    signInButton = {
        padding: '0.75rem', // Reduced padding
        backgroundColor: '#244373', // Blue color
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '0.9rem',
        fontWeight: '500',
        cursor: 'pointer',
        textTransform: 'uppercase',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    };

    signUpLink = {
        marginTop: '0.5rem',
        fontSize: '0.85rem',
        color: '#000',
        textDecoration: 'none',
        cursor: 'pointer',
        textAlign: 'right',
        fontWeight: '500',
    };
    label = {
        color: '#244373',
        marginBottom: '0.5rem',
        fontSize: '0.9rem',
        display: 'block',
        fontWeight: 'bold',
    };
    fileInputLabel = {
        padding: '0.75rem', // Reduced padding
        backgroundColor: '#333',
        color: '#757575',
        borderRadius: '4px',
        border: '1px solid #ccc',
        textAlign: 'center',
        cursor: 'pointer',
        display: 'block',
        width: '100%',
        boxSizing: 'border-box',
        fontSize: '0.9rem', // Reduced font size
    };
    fileInput = {
        display: 'none',
    };
}
