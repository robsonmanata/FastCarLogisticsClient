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
            return { ...state, items: [action.payload, ...state.items] };
        case 'UPDATE_PRODUCT':
            return { ...state, items: state.items.map((product) => product._id === action.payload._id ? action.payload : product) };
        case 'DELETE_PRODUCT':
            return { ...state, items: state.items.filter((product) => product._id !== action.payload) };
        default:
            return state;
    }
}
