export class PaginationStyles {
    container = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        marginTop: '1rem',
        borderTop: '1px solid #e5e7eb'
    };
    resultsText = {
        color: '#374151',
        fontSize: '0.875rem'
    };
    muiPagination = {
        '& .MuiPaginationItem-root': {
            border: '1px solid #d1d5db',
            backgroundColor: 'white',
            '&:hover': {
                backgroundColor: '#f3f4f6'
            },
            '&.Mui-selected': {
                backgroundColor: '#1f2937',
                color: 'white',
                border: 'none',
                '&:hover': {
                    backgroundColor: '#111827'
                }
            }
        }
    };
}
