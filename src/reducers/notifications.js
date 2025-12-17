export default (state = { items: [], meta: {} }, action) => {
    switch (action.type) {
        case 'FETCH_NOTIFICATIONS':
            return {
                items: action.payload.data,
                meta: {
                    currentPage: action.payload.currentPage,
                    numberOfPages: action.payload.numberOfPages,
                    totalCount: action.payload.totalCount
                }
            };
        case 'MARK_AS_READ':
            return {
                ...state,
                items: state.items.map((notification) => notification._id === action.payload._id ? action.payload : notification)
            };
        case 'CREATE_NOTIFICATION':
            return { ...state, items: [action.payload, ...state.items] };
        default:
            return state;
    }
};
