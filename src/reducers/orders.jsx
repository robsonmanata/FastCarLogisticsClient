export default (state = { items: [], meta: {} }, action) => {
    switch (action.type) {
        case 'FETCH_ALL_ORDERS':
            return {
                items: action.payload.data,
                meta: {
                    currentPage: action.payload.currentPage,
                    numberOfPages: action.payload.numberOfPages,
                    totalCount: action.payload.totalCount
                }
            };
        case 'CREATE_ORDER':
            return { ...state, items: [action.payload, ...state.items] };
        case 'UPDATE_ORDER':
            return { ...state, items: state.items.map((order) => (order._id === action.payload._id ? action.payload : order)) };
        case 'DELETE_ORDER':
            return { ...state, items: state.items.filter((order) => order._id !== action.payload) };
        default:
            return state;
    }
};
