const financeReducer = (state = { data: null, isLoading: true }, action) => {
    switch (action.type) {
        case 'FETCH_FINANCES':
            return { ...state, data: action.payload, isLoading: false };
        case 'START_LOADING':
            return { ...state, isLoading: true };
        default:
            return state;
    }
};

export default financeReducer;
