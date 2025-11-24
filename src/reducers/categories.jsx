export default (categories = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_CATEGORIES':
            return action.payload;
        case 'CREATE_CATEGORY':
            return [...categories, action.payload];
        case 'UPDATE_CATEGORY':
            return categories.map((category) => category._id === action.payload._id ? action.payload : category);
        case 'DELETE_CATEGORY':
            return categories.filter((category) => category._id !== action.payload);
        default:
            return categories;
    }
}
