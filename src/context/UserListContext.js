import React, { createContext, useContext, useEffect, useState } from "react";
import { getUsers } from "../adapters/user";
import { UserContext } from "./UserContext";

export const UserListContext = createContext(
    {
        users: Array,
        refresh: Function
    }
);

export const UserListProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [isRefreshed, setRefresh] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        getUsers(user.data.token)
            .then(response => setUsers(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed])


    return <UserListContext.Provider value={{
        users,
        refresh: () => setRefresh(!isRefreshed)
    }}>{children}</UserListContext.Provider>
}