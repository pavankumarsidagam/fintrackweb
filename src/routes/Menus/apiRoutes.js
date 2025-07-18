const BASE_URL = process.env.REACT_APP_API_BASE_URL_DJANGO;


const apiRoutes = {
    categories: `${BASE_URL}/categories/`,
    getTransactions: `${BASE_URL}/transactions/`,
    addTransaction: `${BASE_URL}/addtransaction/`,
}

export default apiRoutes;