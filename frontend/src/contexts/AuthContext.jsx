import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    const login = async (formData) => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const result = await response.text();
                throw new Error(result);
            }

            const result = await response.json();
            setUser(result.data.user);
            setMessage('Login successful!');
            return { success: true, user: result.data.user };
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        setMessage('Logout successful!');
    };

    return (
        <AuthContext.Provider value={{ user, message, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
