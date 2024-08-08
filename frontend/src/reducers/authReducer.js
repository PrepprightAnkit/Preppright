// src/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types';

const initialState = {
    user: null,
    isAuthenticated: false,
    message: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                message: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                message: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                message: null,
            };
        default:
            return state;
    }
};

export default authReducer;
