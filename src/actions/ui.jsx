export const openAddProductModal = () => ({ type: 'OPEN_ADD_PRODUCT_MODAL' });
export const closeAddProductModal = () => ({ type: 'CLOSE_ADD_PRODUCT_MODAL' });
export const setCurrentProductId = (id) => ({ type: 'SET_CURRENT_PRODUCT_ID', payload: id });
export const setScannedBarcode = (barcode) => ({ type: 'SET_SCANNED_BARCODE', payload: barcode });
