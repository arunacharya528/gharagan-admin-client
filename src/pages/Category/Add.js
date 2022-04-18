import React, { useState } from "react";
import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'
import { postCategory } from "../../adapters/category";


export const Add = ({ categories, afterSubmission }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isParent, setIsParent] = useState(false);
    const [parentId, setParentId] = useState(null);

    const handleSubmission = () => {
        postCategory({
            name: name,
            description: description,
            is_parent: isParent ? 1 : 0,
            parent_id: parentId
        })
            .then(response => afterSubmission())
            .catch(error => console.log(error))
    }

    return (
        <>
            <Label>
                <span>Name</span>
                <Input className="mt-1" placeholder="Enter product name" onChange={e => setName(e.target.value)} value={name} />
            </Label>
            <Label className="mt-4">
                <span>Description</span>
                <Textarea className="mt-1" rows="15" placeholder="Enter summary" onChange={e => setDescription(e.target.value)} value={description} />
            </Label>

            <Label className="mt-6 w-full" check>
                <Input type="checkbox" onChange={e => setIsParent(e.target.checked)} />
                <span className="ml-2 block">
                    This category is parent
                </span>
            </Label>

            {
                isParent ?
                    ''
                    :
                    <Label className="mt-4">
                        <span>Select parent</span>
                        <Select className="mt-1" value={parentId} onChange={e => setParentId(e.target.value)}>
                            {categories.map((category, index) =>
                                <option key={index} value={category.id}>{category.name}</option>
                            )}
                        </Select>
                    </Label>
            }

            <Button className="mt-4" onClick={handleSubmission}>Save</Button>
        </>
    )
}
