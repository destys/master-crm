import axios from 'axios';

import jwt_decode from 'jwt-decode';

const apiUrl = process.env.REACT_APP_UPLOAD_URL;

export const strapiLogin = async (identifier, password) => {
    const response = await axios.post(`${apiUrl}/api/auth/local`, {
        "identifier": identifier,
        "password": password
    });
    return response.data;
};

export const strapiLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
}

export const getOrders = async () => {
    const response = await axios.get(`${apiUrl}/api/orders`, {});
    return response.data;
}

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getUserFromToken = () => {
    const token = getToken();
    if (token) {
        const decodedToken = jwt_decode(token);
        return decodedToken;
    }
    return null;
};