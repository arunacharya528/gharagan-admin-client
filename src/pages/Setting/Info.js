import React, { useContext, useState } from "react";
import { Button } from '@windmill/react-ui';
import toast from 'react-hot-toast';
import { putSiteData } from '../../adapters/siteData';
import { RichTextEditor } from '../../components/Editor';
import { UserContext } from "../../context/UserContext";

export const SiteInfo = ({ emailData, contactData }) => {

    const [email, setEmail] = useState(emailData.value);
    const [contact, setContact] = useState(contactData.value);

    const { user } = useContext(UserContext)

    const handleEmailUpdate = () => {
        toast.promise(
            putSiteData(user.data.token, { value: email }, emailData.id)
            , {
                loading: "Updating email",
                success: () => {
                    return "Updated email";
                },
                error: "Error updating email"
            }
        )
    }

    const handleContactUpdate = () => {
        toast.promise(
            putSiteData(user.data.token, { value: contact }, contactData.id)
            , {
                loading: "Updating contact",
                success: () => {
                    return "Updated contact";
                },
                error: "Error updating contact"
            }
        )
    }

    return (
        <>
            <div className="flex items-center">
                <div className="w-64 font-semibold">Email</div>
                <div className="flex-grow flex flex-col">
                    <RichTextEditor text={{ value: email, setValue: setEmail }} />
                    <div className="space-x-5">
                        <Button onClick={handleEmailUpdate} className="mt-4">Update</Button>
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <div className="w-64 font-semibold">Contact</div>
                <div className="flex-grow flex flex-col">
                    <RichTextEditor text={{ value: contact, setValue: setContact }} />
                    <div className="space-x-5">
                        <Button onClick={handleContactUpdate} className="mt-4">Update</Button>
                    </div>
                </div>
            </div>
        </>
    );
}