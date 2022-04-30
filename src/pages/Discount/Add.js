import React, { useEffect, useState } from "react";

import { Label, Input, Textarea, Select, Button } from '@windmill/react-ui'
import { postDiscount, putDiscount } from "../../adapters/discount";
import toast from "react-hot-toast";
export const Add = ({ afterSubmission }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [percent, setPercent] = useState(0)
    const [status, setStatus] = useState(0);

    const handleSubmission = (e) => {
        toast.promise(
            postDiscount({
                name: name,
                description: description,
                discount_percent: percent,
                active: status
            })
                .then(response => afterSubmission())
            , {
                loading: "Adding new discount",
                success: "New discount added",
                error: "Error adding new discount"
            }
        )
    }

    return (<div>

        <Label>
            <span>Name</span>
            <Input className="mt-1" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
        </Label>

        <Label className="mt-4">
            <span>Description</span>
            <Textarea className="mt-1" placeholder="Enter description" rows="10" value={description} onChange={e => setDescription(e.target.value)} />
        </Label>

        <Label className="mt-4">
            <span>Discount Percent</span>
            <Input className="mt-1" placeholder="Enter discount percent" type="number" value={percent} onChange={e => setPercent(e.target.value)} s />
        </Label>

        <Label className="mt-4">
            <span>Status</span>
            <Select className="mt-1" value={status} onChange={e => setStatus(e.target.value)}>
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
            </Select>
        </Label>

        <Button className="mt-4" onClick={handleSubmission}>Create</Button>
    </div>);
}