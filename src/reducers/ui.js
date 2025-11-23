export default (state = { isAddProductModalOpen: false }, action) => {
    switch (action.type) {
        case 'OPEN_ADD_PRODUCT_MODAL':
            return { ...state, isAddProductModalOpen: true };
        case 'CLOSE_ADD_PRODUCT_MODAL':
            return { ...state, isAddProductModalOpen: false };
        default:
            return state;
    }
};
