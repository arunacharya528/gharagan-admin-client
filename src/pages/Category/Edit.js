import React, { useEffect, useState } from "react"
import { getCategory, putCategory } from "../../adapters/category";
import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'
import Category from "./Category";

export const Edit = ({ id, categories, afterSubmission }) => {

    // const [category, setCategory] = useState([]);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isParent, setIsParent] = useState(false);
    const [parentId, setParentId] = useState(0);

    useEffect(() => {
        getCategory(id)
            .then(response => {
                setName(response.data.name)
                setDescription(response.data.description)
                setIsParent(response.data.is_parent)
                setParentId(response.data.parent_id)
            })
            .catch(error => console.log(error))
    }, []);

    const handleSubmission = () => {
        putCategory({ name: name, description: description, is_parent: isParent, parent_id: parentId }, id)
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
            {
                isParent ?
                    <div className="mt-4">This category is a parent hence cannot be made a child</div>
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