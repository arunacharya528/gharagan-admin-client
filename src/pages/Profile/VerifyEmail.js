import React, { useContext, useState } from "react"
import { sendVerificationNotification, verifyEmail } from "../../adapters/auth"
import { UserContext } from "../../context/UserContext";
import toast from 'react-hot-toast'
import { Button, Label, Input, HelperText } from '@windmill/react-ui'

export const VerifyEmail = ({ onSubmit }) => {

    const { user, updateUser } = useContext(UserContext)
    const [pin, setPin] = useState('');


    const resendVerificationEMail = () => {
        toast.promise(
            sendVerificationNotification(user.data.token),
            {
                loading: "Sending verification notification to " + user.data.email,
                success: "Verification notification sent to " + user.data.email,
                error: "Error sending verification notification to " + user.data.email
            }
        );
    }

    const submitForVerification = () => {
        toast.promise(
            verifyEmail(user.data.token, { verificationPin: pin }),
            {
                loading: "Verifying email",
                success: () => {
                    updateUser()
                    onSubmit()
                    return "Email verified"
                },
                error: "Error occured while verifying email"
            }
        )
    }
    return (
        <div className=" flex flex-col space-y-2 w-full">
            You must verify your email to continue
            <div className="flex flex-col space-y-5">
                <Label>
                    <Input className="mt-1" placeholder="Enter PIN here" value={pin} onChange={e => setPin(e.target.value)} />
                    <HelperText valid={undefined}>A pin code was sent to {user.data.email}</HelperText>
                </Label>
                <Button onClick={submitForVerification}>
                    Submit
                </Button>
            </div>

            <Button layout="link" onClick={resendVerificationEMail}>
                Resend PIN
            </Button>
        </div>
    );
}