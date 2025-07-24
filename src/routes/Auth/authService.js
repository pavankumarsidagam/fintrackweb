import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_BASE_URL_NODE;


export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, credentials, { withCredentials: true });
        return response.data;
    } catch(error){
        throw new Error(error.response?.data?.message || "An error occurred"); 
    }
};

export const verify = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/verifyEmail`, email, { withCredentials: true });
        return response.data;
    } catch (error){
        return error;
    }
}

export const verfiyotp = async (verifydata) => {
    try {
        const response = await axios.post(`${BASE_URL}/verifyOTP`, verifydata, { withCredentials: true });
        return response.data;
    } catch (error){
        return error;
    }
}

export const changepasswordapi = async ({email, changePassword}) => {
    try {
        const response = await axios.post(`${BASE_URL}/changePassword`, {email, newPassword : changePassword}, { withCredentials: true });
        return response.data;
    } catch (error){
        return error;
    }
}