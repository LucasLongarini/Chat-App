import React, { useState, useContext, createContext } from 'react';
import APIService from '../services/apiService';

const authContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
};

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);

    // checks if the authToken in cookies is valid
    const authenticate = async () => {
        try {
            const response = await APIService.get('/authenticate');
            setUser(response.user);
            return response.user;
        }
        catch {
            return false;
        }
    };

    const login = async (email, password) => {
        const response = await APIService.post('/authenticate/login', {
            email : email,
            password: password
        });
        setUser(response.user);
        return response.user;
    }

    const register = async (username, email, password) => {
        const response = await APIService.post('/authenticate/register', {
            username: username,
            email : email,
            password: password
        });
        setUser(response.user);
        return response.user;
    }

    // removes the authToken cookie
    const signout = () => {
        setUser(null);
        return true;
    };

    // Return the user object and auth methods
    return {
        user,
        login,
        register,
        authenticate,
        signout,
    };
}