import React, { useState, useEffect } from "react";
import { Table, TableCell, TableBody, TableContainer, TableHeader, TableRow, Button, Badge } from '@windmill/react-ui'

import PageTitle from '../../components/Typography/PageTitle'
import { deleteUser, getUsers } from "../../adapters/user";
import { CrossIcon, EditIcon, EyeIcon, PlusIcon, TrashIcon } from "../../icons";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const User = () => {
    const [users, setUsers] = useState([]);
    const [isRefreshed, setRefresh] = useState(false);

    useEffect(() => {
        getUsers()
            .then(response => setUsers(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed])

    const getUserType = (userType) => {
        switch (userType) {
            case 1:
                return 'super-admin'
            case 2:
                return 'admin';
            case 3:
                return 'user';
        }
    }

    const handleDeletion = (id) => {
        toast.promise(
            deleteUser(id)
                .then(response => setRefresh(!isRefreshed))
            ,
            {
                loading: "Deleting user account",
                success: "Deleted user account",
                error: "Error deleting user account"
            }
        )
    }

    return (
        <>
            <PageTitle>
                <div className="flex justify-between">
                    <span>Users</span>
                    <Link to={"/app/user/add"}>
                        <Button icon={PlusIcon} layout="link" aria-label="Like" />
                    </Link>
                </div>
            </PageTitle>

            <TableContainer className="mb-8">
                <Table className="table-fixed w-full">
                    <TableHeader>
                        <tr>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>User Type</TableCell>
                            <TableCell>Action</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {
                            users.map((user, index) =>
                                <TableRow>
                                    <TableCell>{user.first_name}</TableCell>
                                    <TableCell>{user.last_name}</TableCell>
                                    <TableCell className="truncate" title={user.email}>{user.email}</TableCell>
                                    <TableCell>{user.contact}</TableCell>
                                    <TableCell>{getUserType(user.type)}</TableCell>
                                    <TableCell className="">
                                        <div className="flex items-center space-x-4">
                                            <Link to={"/app/user/" + user.id + "/view"} layout="link" size="icon" aria-label="View">
                                                <EyeIcon className="w-5 h-5" aria-hidden="true" />
                                            </Link>
                                            {
                                                user.type !== 1 ?
                                                    <Button layout="link" size="icon" aria-label="Delete" onClick={e => handleDeletion(user.id)}>
                                                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                                    </Button>
                                                    :
                                                    <Badge type="warning">
                                                        <CrossIcon className="w-5 h-5" />
                                                    </Badge>
                                            }
                                        </div>

                                    </TableCell>

                                </TableRow>
                            )
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default User;