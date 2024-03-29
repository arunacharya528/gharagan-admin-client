import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { getIfLoggedIn, login, logout } from "../adapters/auth";
import Login from "../pages/Login";

export const UserContext = createContext({
    user: { loading: Boolean, data: { token: String, role: Number } },
    setUser: Function,
    logout: Function,
    updateUser: Function
});

export const UserProvider = ({ children }) => {
    const cookies = new Cookies();
    const initialState = { loading: true, data: {} };
    const [user, setUser] = useState({ loading: true, data: initialState });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [isRefreshed, setRefresh] = useState(false);

    const history = useHistory();

    const getLoggedInStatus = () => {
        const token = cookies.get('token');
        if (token && token !== '') {
            getIfLoggedIn({ token: token })
                .then(response => {
                    var data = response.data;
                    data['token'] = token;
                    setUser({ loading: false, data: data })
                })
                .catch(response => setUser({ loading: true, data: initialState }))
        }
    }

    useEffect(() => {
        getLoggedInStatus()
        setInterval(() => {
            getLoggedInStatus()
        }, 1000 * 60 * 5)
    }, [isRefreshed])

    const handleLogin = () => {
        toast.promise(
            login({ email, password }),
            {
                loading: "Logging in",
                success: response => {
                    setUser({
                        loading: false,
                        data: {
                            token: response.data.token,
                            role: response.data.role
                        }
                    })
                    cookies.set('token', response.data.token, { path: "/", expires: new Date(Date.now() + (60 * 60 * 1000)) })
                    setTimeout(() => {
                        toast(
                            "Your session has expired. Login again to continue your operations.",
                            {
                                duration: 6000,
                            }
                        );
                        handleLogout(response.data.token)
                    }, 60 * 60 * 1000)
                    history.push("/app/dashboard")
                    return "Successfully logged in"
                },
                error: error => {
                    setError(error.response.data.message)
                    return "Error logging in"
                }

            }
        )
    }

    const handleLogout = () => {
        toast.promise(
            logout(user.data.token),
            {
                loading: "Logging out",
                success: () => {
                    setUser(initialState);
                    cookies.remove('token')
                    return "Successfully logged out"
                },
                error: "Error occured while logging out"
            }
        )
    }

    if (user.data.role === 3) {
        handleLogout();
    }

    const updateUser = () => setRefresh(!isRefreshed)
    return <UserContext.Provider value={{ user, setUser, logout: handleLogout, updateUser }}>
        {!user.loading ?
            children :
            <Login {...{
                email: { value: email, setValue: setEmail },
                password: { value: password, setValue: setPassword },
                onSubmit: handleLogin,
                error: error
            }} />}
    </UserContext.Provider>
};