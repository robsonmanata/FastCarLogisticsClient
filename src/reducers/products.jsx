export default (products = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_Products':
            return action.payload;
        case 'CREATE_Product':
            return [...products, action.payload];
        case 'UPDATE_PRODUCT':
            return products.map((product) => product._id === action.payload._id ? action.payload : product);
        case 'DELETE_PRODUCT':
            return products.filter((product) => product._id !== action.payload);
        default:
            return products;
    }
}
