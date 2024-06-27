// PhoneNumberContext.js
import React, { createContext, useState } from 'react';

const PhoneNumberContext = createContext();

export const PhoneNumberProvider = ({ children }) => {
    const [phoneNumberG, setPhoneNumberG] = useState("");

    return (
        <PhoneNumberContext.Provider value={{ phoneNumberG, setPhoneNumberG }}>
            {children}
        </PhoneNumberContext.Provider>
    );
};

export default PhoneNumberContext;
