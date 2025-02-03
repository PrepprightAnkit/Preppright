import axios from 'axios';
import { loginSuccess, logout,loginFail } from '../reducers/authReducer';

// Login Action


export const login = (credentials) => async (dispatch) => {
    try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.post(`${apiUrl}/api/v1/users/login`, credentials);
        
        // Directly use the response.data as the user object
        const userData = response.data;
        
        // Since there's no token in the response, you might need to handle this differently
        // If your backend doesn't return a token, you might need to generate or handle authentication differently
        
        if (userData && userData._id) {
            dispatch(loginSuccess({
                user: userData,
                token: userData._id // Temporary fallback, not recommended for real authentication
            }));

            localStorage.setItem('user', JSON.stringify(userData));
            // Note: You'll need to handle token storage separately

            return response.data;
        } else {
            throw new Error('Invalid login response: Missing user ID');
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