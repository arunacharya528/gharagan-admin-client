import React, { useState } from 'react'
import { Label, Input, Card, CardBody, Button } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { postUser } from '../../adapters/user'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import toast from 'react-hot-toast'

const Add = () => {

    const defaultPassword = 'gharagan_123'

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');

    const history = useHistory();


    const handleSubmission = () => {
        toast.promise(
            postUser({
                first_name: firstName,
                last_name: lastName,
                email: email,
                contact: contact,
                password: defaultPassword,
                type: 2
            })
                .then(response => history.push("/app/user"))

            , {
                loading: "Adding new admin account",
                success: "Added new admin account",
                error: "Error adding admin account"
            }
        )


    }
    return (
        <>
            <PageTitle>
                Add new admin account
            </PageTitle>


            <Card>
                <CardBody>
                    <Label>
                        <span>First Name</span>
                        <Input className="mt-1" placeholder="Enter first name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </Label>

                    <Label className="mt-4">
                        <span>Last Name</span>
                        <Input className="mt-1" placeholder="Enter last name" value={lastName} onChange={e => setLastName(e.target.value)} />
                    </Label>

                    <Label className="mt-4">
                        <span>Email</span>
                        <Input className="mt-1" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    </Label>

                    <Label className="mt-4">
                        <span>Contact</span>
                        <Input className="mt-1" placeholder="Enter contact number" value={contact} onChange={e => setContact(e.target.value)} />
                    </Label>

                    <div className='mt-4 text-dark dark:text-gray-500 text-sm'>
                        The default password is {defaultPassword}
                    </div>
                    <Button className="mt-4" onClick={handleSubmission}>Create</Button>
                </CardBody>
            </Card>
        </>
    );
}

export default Add;