export default (products = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_Products':
            return action.payload;
        case 'CREATE_Product':
            return [...products, action.payload];
        default:
            return products;
    }
}
