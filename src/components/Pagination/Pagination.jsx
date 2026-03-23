import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

import { PaginationStyles } from './paginationstyle';

const Pagination = ({ page, count, onChange, total }) => {
    const styles = new PaginationStyles();

    return (
        <div style={styles.container}>
            <div style={styles.resultsText}>
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
                sx={styles.muiPagination}
            />
        </div>
    );
};

export default Pagination;
