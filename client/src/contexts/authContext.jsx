import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import * as authService from "../services/authService";
import { usePersistedState } from "../hooks/usePersistedState";


const AuthContext = createContext();

AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {});
    const [errors, setError] = useState('');

    const loginSubmitHandler = async (values) => {
        const result = await authService.login(values.email, values.password);

        setAuth(result);

        localStorage.setItem('accessToken', result.accessToken);

        navigate('/')
    };

    const registerSubmitHandler = async (values) => {
        
        try {
            if(values.password !== values.confirmPassword){
                throw new Error('Password missmatch!');
            }
                const result = await authService.register(values.email, values.password);
        
                setAuth(result);
        
                localStorage.setItem('accessToken', result.accessToken);
        
                navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const logoutHandler = () => {
        setAuth({});

        localStorage.removeItem('accessToken');

        navigate('/');
    };

    const values = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        userId: auth._id,
        username: auth.username || auth.email,
        email: auth.email,
        isAuthenticated: !!auth.accessToken,
        errors
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;