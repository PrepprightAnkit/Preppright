// src/actions/authActions.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';

// Action to handle login
export const login = (formData) => async (dispatch) => {
    try {
        const response = await fetch('http://localhost:8000/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data,
            });
        } else {
            dispatch({
                type: LOGIN_FAILURE,
                payload: data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: 'An error occurred while logging in.',
        });
    }
};

// Action to handle logout
export const logout = () => async (dispatch) => {
    try {
        await fetch('http://localhost:8000/api/v1/users/logout', {
            method: 'POST',
        });

        dispatch({ type: LOGOUT });
    } catch (error) {
        console.error('Logout failed:', error);
    }
};
