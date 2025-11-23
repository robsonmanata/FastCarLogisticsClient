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
        backgroundColor: '#f0f2f5',
        overflow: 'hidden',
    };
    image = {
        width: '90%',
        height: '90%',
        objectFit: 'cover',
    };
    logoimage = {
        width: '50%',
        height: '30%',
        objectFit: 'cover',
        marginBottom: '0rem',
    };
    formSection = {
        flex: 1,
        display: 'flex',
        alignItems: 'center',


        flexDirection: 'column',
    };
    form = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        padding: '1rem',
        width: '50%',
        maxWidth: '400px',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #050505ff',
        borderRadius: '10px',
    };
    title = {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: '3rem',
        marginTop: '0rem',
    };
    titlelogin = {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: '0.5rem',
        marginTop: '0rem',
    };
    lockIcon = {
        fontSize: '1.5rem',
        color: '#030303ff',
    };
    inputGroup = {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    };
    label = {
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#4a4a4a',
    };
    input = {
        padding: '0.75rem',
        borderRadius: '6px',
        border: '1px solid #e1e1e1',
        fontSize: '1rem',
        transition: 'border-color 0.2s',
        outline: 'none',
    };
    button = {
        padding: '0.875rem',
        backgroundColor: '#0066cc',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        marginTop: '1rem',
    };
}
