import React, { useState } from "react";

import { Label, Textarea, Button } from '@windmill/react-ui'
import { postQA } from "../../adapters/questionAnswer";
import toast from "react-hot-toast";
export const Reply = ({ parentId, afterSUbmission }) => {

    const [isFormViewed, toggleForm] = useState(false);

    const [query, setQuery] = useState('');

    const handleSubmission = () => {
        toast.promise(
            postQA({ query, parent_id: parentId })
                .then(response => { toggleForm(!isFormViewed); afterSUbmission() })
            ,
            {
                loading: "Replying to question",
                success: "Replied to question",
                error: "Error replying to question"
            }
        )
    }
    return (
        <div className="flex flex-col">
            <div className="my-2">
                <Button layout="outline" onClick={e => toggleForm(!isFormViewed)}>Reply</Button>
            </div>

            {
                isFormViewed ?
                    <div>
                        <Label className="">
                            <span>Your reply</span>
                            <Textarea className="mt-1" rows="5" placeholder="Enter your reply" value={query} onChange={e => setQuery(e.target.value)} />
                        </Label>

                        <Button className="mt-4" onClick={handleSubmission}>Save</Button>
                    </div>
                    : ''
            }

        </div>
    );
}