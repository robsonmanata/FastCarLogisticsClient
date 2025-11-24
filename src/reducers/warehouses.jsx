export default (warehouses = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_WAREHOUSES':
            return action.payload;
        case 'CREATE_WAREHOUSE':
            return [...warehouses, action.payload];
        case 'UPDATE_WAREHOUSE':
            return warehouses.map((warehouse) => warehouse._id === action.payload._id ? action.payload : warehouse);
        case 'DELETE_WAREHOUSE':
            return warehouses.filter((warehouse) => warehouse._id !== action.payload);
        default:
            return warehouses;
    }
}
