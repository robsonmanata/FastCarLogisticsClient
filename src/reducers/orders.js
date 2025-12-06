export default (orders = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_ORDERS':
            return action.payload;
        case 'CREATE_ORDER':
            return [action.payload, ...orders];
        case 'UPDATE_ORDER':
            return orders.map((order) => (order._id === action.payload._id ? action.payload : order));
        case 'DELETE_ORDER':
            return orders.filter((order) => order._id !== action.payload);
        default:
            return orders;
    }
};
