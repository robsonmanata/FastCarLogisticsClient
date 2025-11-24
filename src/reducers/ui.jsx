export default (state = { isAddProductModalOpen: false, currentProductId: null }, action) => {
    switch (action.type) {
        case 'OPEN_ADD_PRODUCT_MODAL':
            return { ...state, isAddProductModalOpen: true };
        case 'CLOSE_ADD_PRODUCT_MODAL':
            return { ...state, isAddProductModalOpen: false };
        case 'SET_CURRENT_PRODUCT_ID':
            return { ...state, currentProductId: action.payload };
        default:
            return state;
    }
};
