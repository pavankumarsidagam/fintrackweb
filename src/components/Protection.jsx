import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Loader from "../pages/Authentication/Loader";

const Protection = ({ children }) => {
    const [isAuth, setIsAuth] = useState(null);
    const location = useLocation();

    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            return true; 
        }
    }

    
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');

            if (!token || isTokenExpired(token)) {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL_NODE}/refresh-token`, {}, {
                        withCredentials: true 
                    });

                    localStorage.setItem('token', response.data.token);
                    setIsAuth(true);
                } catch (error) {
                    setIsAuth(false); 
                }
            } else {
                setIsAuth(true); 
            }
        };

        checkAuth();
    }, [location.pathname]);
    if (isAuth === null) return <Loader />;

    if (!isAuth) return <Navigate to="/login" replace />;

    return children;
}

export default Protection;