import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: localStorage.getItem('user') 
            ? JSON.parse(localStorage.getItem('user')) 
            : null,
        isAuthenticated: !!localStorage.getItem('user'),
        token: null, // Adjust based on your authentication method
        message: ''
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.message = 'Login successful';
        },
        loginFail: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.message = action.payload || 'Login failed';
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.message = 'Logged out successfully';
        }
    }
});

export const { loginSuccess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;