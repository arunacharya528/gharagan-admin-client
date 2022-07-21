import React, { useState } from 'react'
import { Label, Input, Card, CardBody, Button } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { postUser } from '../../adapters/user'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const Add = () => {

    const defaultPassword = 'gharagan_123'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');

    const history = useHistory();

    const { user } = useContext(UserContext);

    const handleSubmission = () => {
        toast.promise(
            postUser(user.data.token, {
                name: name,
                email: email,
                contact: contact,
                password: defaultPassword,
                role: 2
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
                        <Input className="mt-1" placeholder="Enter first name" value={name} onChange={e => setName(e.target.value)} />
                    </Label>

                    <Label className="mt-4">
                        <span>Email</span>
                        <Input type="email" className="mt-1" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
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