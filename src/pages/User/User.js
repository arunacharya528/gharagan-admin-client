import React, { useState, useEffect } from "react";
import { Table, TableCell, TableBody, TableContainer, TableHeader, TableRow, Button } from '@windmill/react-ui'

import PageTitle from '../../components/Typography/PageTitle'
import { getUsers } from "../../adapters/user";
import { EditIcon, TrashIcon } from "../../icons";

const User = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers()
            .then(response => setUsers(response.data))
            .catch(error => console.log(error))
    }, [])

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

    return (
        <>
            <PageTitle>
                Users
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
                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Button layout="link" size="icon" aria-label="Delete">
                                                <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                            </Button>
                                        </div>
                                    </TableCell>

                                </TableRow>
                            )
                        }
                        {/* {dataTable.map((category, i) => (
                            <>
                                <TableRow key={i}>
                                    <TableCell>
                                        None
                                    </TableCell>
                                    <TableCell className="bg-gray-700 text-white border-l-4 border-gray-700">
                                        {category.name}
                                    </TableCell>
                                    <TableCell>
                                        {category.description}
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center space-x-4">
                                            <Button layout='link' size="icon" onClick={e => handleEditButtonPress(category.id)}>
                                                <EditIcon className="w-5 h-5" aria-hidden="true" />
                                            </Button>
                                            <Button layout="link" size="icon" aria-label="Delete">
                                                <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                {
                                    category.child_categories.map((child_category, i) => (
                                        <>
                                            <TableRow key={i}>
                                                <TableCell >
                                                    {category.name}
                                                </TableCell>
                                                <TableCell className="border-l-4 border-gray-700">
                                                    {child_category.name}
                                                </TableCell>
                                                <TableCell>
                                                    {child_category.description}
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex items-center space-x-4">
                                                        <Button layout='link' size="icon" onClick={e => handleEditButtonPress(child_category.id)}>
                                                            <EditIcon className="w-5 h-5" aria-hidden="true" />
                                                        </Button>
                                                        <Button layout="link" size="icon" aria-label="Delete">
                                                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    ))
                                }
                            </>
                        ))} */}

                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default User;