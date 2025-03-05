import axios from 'axios';
import { loginFail, loginSuccess, logout } from '../reducers/authReducer';

// Login Action

export const login = (credentials) => async (dispatch) => {
    try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.post(`${apiUrl}/api/v1/users/login`, credentials, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.data && response.data.success) {
            const userData = response.data.user;
            dispatch(loginSuccess({
                user: userData,
                token: response.data.accessToken
            }));

            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', response.data.accessToken);
            return userData;
        } else {
            throw new Error(response.data.message || 'Login failed');
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Login failed';
        dispatch(loginFail(errorMessage));
        throw error;
    }
};

// Logout Action
export const logoutUser = () => (dispatch) => {
    // Remove token and user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch(logout());
};

// Check Authentication and Set User
export const checkAuth = () => async (dispatch) => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
        try {
            const userData = JSON.parse(storedUser);
            
            dispatch(loginSuccess({
                user: userData,
                token: userData._id // Use a unique identifier if no token
            }));
        } catch (error) {
            dispatch(logoutUser());
        }
    }
};