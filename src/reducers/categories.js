export default (categories = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_CATEGORIES':
            return action.payload;
        case 'CREATE_CATEGORY':
            return [...categories, action.payload];
        default:
            return categories;
    }
}
