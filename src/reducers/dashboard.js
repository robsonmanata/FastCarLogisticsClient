const dashboardReducer = (state = {
    lowStock: 0,
    products: 0,
    orders: 0,
    notifications: 0,
    itemsUsed: 0,
    categories: 0,
    itemsOrdered: 0
    // add others as needed
}, action) => {
    switch (action.type) {
        case 'FETCH_DASHBOARD_STATS':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default dashboardReducer;
