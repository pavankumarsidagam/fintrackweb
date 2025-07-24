import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_BASE_URL_NODE;
const DJANGO_BASE_URL = process.env.REACT_APP_API_BASE_URL_DJANGO;

const axiosInstance = axios.create({
    baseURL: DJANGO_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config)=> {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log('Error in response:', error.response);
        if (
            error.response &&
            error.response.status === 403 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(`${BASE_URL}/refresh-token`, {}, { withCredentials: true });
                const newAccessToken = res.data.token;
                localStorage.setItem('token', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error('Refresh token failed:', err);
                localStorage.removeItem('token');
                window.location.href = '/login'; 
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;