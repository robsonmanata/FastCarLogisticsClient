export default (state = { isAddProductModalOpen: false, currentProductId: null, scannedBarcode: null }, action) => {
    switch (action.type) {
        case 'OPEN_ADD_PRODUCT_MODAL':
            return { ...state, isAddProductModalOpen: true };
        case 'CLOSE_ADD_PRODUCT_MODAL':
            return { ...state, isAddProductModalOpen: false, scannedBarcode: null };
        case 'SET_CURRENT_PRODUCT_ID':
            return { ...state, currentProductId: action.payload };
        case 'SET_SCANNED_BARCODE':
            return { ...state, scannedBarcode: action.payload };
        default:
            return state;
    }
};
