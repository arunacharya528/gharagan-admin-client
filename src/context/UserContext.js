import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { getIfLoggedIn, login } from "../adapters/auth";
import Login from "../pages/Login";

export const UserContext = createContext({ user: { loading: Boolean, data: { token: String, role: Number } }, setUser: Function });

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ loading: true, data: { token: '', role: undefined } });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (document.cookie !== "") {
            getIfLoggedIn({ token: document.cookie })
                .then(response => setUser({ loading: false, data: { token: document.cookie, role: response.data.role } }))
                .catch(response => setUser({ loading: true, data: { token: '', role: undefined } }))
        }
    }, [])


    const handleLogin = () => {
        login({ email, password })
            .then(response => {
                setUser({
                    loading: false,
                    data: {
                        token: response.data.token,
                        role: response.data.role
                    }
                })

                document.cookie = response.data.token;
            })
            .catch(error => console.log(error))
    }

    return <UserContext.Provider value={{ user, setUser }}>
        {!user.loading ?
            children :
            <Login {...{
                email: { value: email, setValue: setEmail },
                password: { value: password, setValue: setPassword },
                onSubmit: handleLogin
            }} />}
    </UserContext.Provider>
};