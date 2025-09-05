const BASE_URL = process.env.REACT_APP_API_BASE_URL_DJANGO;


const apiRoutes = {
    // Family Details
    familyName: `${BASE_URL}/familyname/`,

    // Transactions Menu
    categories: `${BASE_URL}/categories/`,
    getTransactions: `${BASE_URL}/transactions/`,
    addTransaction: `${BASE_URL}/addtransaction/`,

    // Members Menu
    addUser: `${BASE_URL}/adduser/`,
    getUsers: `${BASE_URL}/getusers/`,


}

export default apiRoutes;