import React, { createContext, useState, useContext } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [id, setId] = useState(null);

    return (
        <TokenContext.Provider value={{ token, setToken, role, setRole, id, setId }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};

export const useRole = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};

export const useId = () => {
    const context = useContext(TokenContext);
    if (!context){
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
}