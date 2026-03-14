import {createContext, useContext, useEffect, useRef, useState} from "react";
import {authService} from "../api/authService";
import {API_INSTANCE} from "../api/axiosInstance";
import {useNavigate} from "react-router-dom";


const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(null);
    const tokenRef = useRef(null);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        tokenRef.current = token;
    }, [token]);

    useEffect(() => {
        const init = async () => {
            try {
                const res = await authService.refresh();
                const {accessToken} = res.data
                tokenRef.current = accessToken;
                API_INSTANCE.defaults.headers.Authorization = `Bearer ${accessToken}`;
                setToken(accessToken);

                const userData = await authService.me();
                setUser(userData.data);

            } catch (error) {
                // if (!error.success && error.statusCode === 401) {
                //     navigate("/auth/login");
                setUser(null);
                setToken(null);
                // }
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);


    useEffect(() => {
        const reqInterceptor = API_INSTANCE.interceptors.request.use((config) => {
            if (token && !config._retry) {
                config.headers.Authorization = `Bearer ${tokenRef.current}`;
            }
            return config;
        });
        return () => API_INSTANCE.interceptors.request.eject(reqInterceptor);
    }, [token]);

    useEffect(() => {
        const resInterceptor = API_INSTANCE.interceptors.response.use(res => res, async (error) => {
            const originalRequest = error.config;
            if (error?.statusCode === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const res = await authService.refresh();
                    const {accessToken} = res.data
                    setToken(accessToken);
                    tokenRef.current = accessToken;
                    API_INSTANCE.defaults.headers.Authorization = `Bearer ${accessToken}`;
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                    return API_INSTANCE(originalRequest);
                } catch (refreshErr) {
                    await logout();
                    return Promise.reject(refreshErr);
                }
            }

            return Promise.reject(error);
        });

        return () => API_INSTANCE.interceptors.response.eject(resInterceptor);
    }, []);

    const login = async (credentials) => {
        try {
            const res = await authService.login(credentials);
            const {accessToken, user} = res.data
            setToken(accessToken);
            setUser(user);
            return res.message || "Login successful"
        } catch (error) {
            console.error("Login attempt failed:", error);
            throw error;
        }
    };

    const register = async (payload) => {
        try {
            const res = await authService.register(payload);
            const {accessToken, user} = res.data
            setToken(accessToken);
            setUser(user);
            return res.message || "Account creation successful"
        } catch (error) {
            console.error("Register attempt failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const res = await authService.logout();
            setToken(null);
            setUser(null);
            tokenRef.current = null;
            delete API_INSTANCE.defaults.headers.Authorization;
            navigate("/auth/login");
            return res.message || "Account creation successful"
        } catch (error) {
            console.error("Logout attempt failed:", error);
            throw error;
        }
    };

    return (<AuthContext.Provider
        value={{user, token, login, register, logout, loading}}
    >
        {children}
    </AuthContext.Provider>);
};

export const useAuth = () => useContext(AuthContext);
