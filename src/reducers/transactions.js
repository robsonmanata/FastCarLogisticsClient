export default (state = { items: [], meta: {} }, action) => {
    switch (action.type) {
        case 'FETCH_ALL_TRANSACTIONS':
            return {
                items: action.payload.data,
                meta: {
                    currentPage: action.payload.currentPage,
                    numberOfPages: action.payload.numberOfPages,
                    totalCount: action.payload.totalCount
                }
            };
        default:
            return state;
    }
};
