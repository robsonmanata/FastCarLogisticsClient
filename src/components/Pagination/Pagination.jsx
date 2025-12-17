import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

const Pagination = ({ page, count, onChange, total }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            marginTop: '1rem',
            borderTop: '1px solid #e5e7eb'
        }}>
            <div style={{ color: '#374151', fontSize: '0.875rem' }}>
                Results: {(page - 1) * 20 + 1} - {Math.min(page * 20, total)} of {total}
            </div>
            <MuiPagination
                count={count}
                page={page}
                onChange={(e, val) => onChange(val)}
                shape="rounded"
                color="primary"
                siblingCount={1}
                boundaryCount={1}
                sx={{
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
                }}
            />
        </div>
    );
};

export default Pagination;
