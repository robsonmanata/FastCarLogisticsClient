export default (state = { items: [], meta: {} }, action) => {
    switch (action.type) {
        case 'FETCH_ALL_Products':
            return {
                items: action.payload.data,
                meta: {
                    currentPage: action.payload.currentPage,
                    numberOfPages: action.payload.numberOfPages,
                    totalCount: action.payload.totalCount
                }
            };
        case 'CREATE_Product':
            // If the item already exists in the current view (i.e. we merged stock into an existing item), replace it.
            // Otherwise, prepend it to the current list.
            if (state.items.find((p) => p._id === action.payload._id)) {
                return {
                    ...state,
                    items: state.items.map((p) => p._id === action.payload._id ? action.payload : p)
                };
            }
            return { ...state, items: [action.payload, ...state.items] };
        case 'UPDATE_PRODUCT':
            return { ...state, items: state.items.map((product) => product._id === action.payload._id ? action.payload : product) };
        case 'DELETE_PRODUCT':
            return { ...state, items: state.items.filter((product) => product._id !== action.payload) };
        default:
            return state;
    }
}
