import React, { useContext, useState } from "react";
import toast from 'react-hot-toast';
import { putSiteData } from '../../adapters/siteData';
import { Button } from '@windmill/react-ui'
import { RichTextEditor } from '../../components/Editor';
import { UserContext } from "../../context/UserContext";

export const SiteAddress = ({ address }) => {

    const [siteAddress, setSiteAddress] = useState(address.value);
    const { user } = useContext(UserContext)

    const handleUpdate = () => {
        toast.promise(
            putSiteData(user.data.token, { value: siteAddress }, address.id)
            , {
                loading: "Updating address",
                success: () => {
                    return "Updated address";
                },
                error: "Error updating address"
            }
        )
    }

    return (
        <div className="flex items-center">
            <div className="w-64 font-semibold">Site Address</div>
            <div className="flex-grow flex flex-col">
                <RichTextEditor text={{ value: siteAddress, setValue: setSiteAddress }} />
                <div>
                    <Button onClick={handleUpdate} className="mt-4">Update</Button>
                </div>
            </div>
        </div>
    );
}