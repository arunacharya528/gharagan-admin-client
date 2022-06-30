import React, { useState } from "react";
import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'
import toast from 'react-hot-toast';
import { putSiteData } from '../../adapters/siteData';

export const Logo = ({ logogSm, logoLg }) => {

    const [logoSmall, setLogoSmall] = useState(logogSm.value);
    const [logoLarge, setLogoLarge] = useState(logoLg.value);

    const handleUpdate = (value, id) => {
        toast.promise(
            putSiteData({ value: value }, id)
            , {
                loading: "Updating logo",
                success: () => {
                    return "Updated logo";
                },
                error: "Error updating logo"
            }
        )
    }

    return (
        <>
            <div className="flex items-center">
                <div className="w-64 font-semibold">Logo Small</div>
                <div className="flex-grow flex flex-col space-y-3">
                    <img src={logoSmall} className="w-32" />
                    <div className="flex space-x-3">
                        <Label className="flex-grow">
                            <Input placeholder="Enter logo url" value={logoSmall} onChange={e => setLogoSmall(e.target.value)} />
                        </Label>
                        <Button onClick={e => handleUpdate(logoSmall, logogSm.id)}>Update</Button>
                    </div>

                </div>
            </div>

            <div className="flex items-center">
                <div className="w-64 font-semibold">Logo Large</div>
                <div className="flex-grow flex flex-col space-y-3">
                    <img src={logoLarge} className="w-32" />


                    <div className="flex space-x-3">
                        <Label className="flex-grow">
                            <Input placeholder="Enter logo url" value={logoLarge} onChange={e => setLogoLarge(e.target.value)} />
                        </Label>
                        <Button onClick={e => handleUpdate(logoLarge, logoLg.id)}>Update</Button>
                    </div>
                </div>
            </div>
        </>
    );
}