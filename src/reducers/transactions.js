export default (transactions = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_TRANSACTIONS':
            return action.payload;
        default:
            return transactions;
    }
};
