import React, { useEffect, useState } from "react";
import { Input, HelperText, Label, Select, Textarea, Button, Card, CardBody } from '@windmill/react-ui'
import { getCategories, postCategory } from "../../adapters/category";
import PageTitle from '../../components/Typography/PageTitle'
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const Add = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isParent, setIsParent] = useState(false);
    const [parentId, setParentId] = useState(null);

    const [categories, setCategories] = useState([]);
    const history = useHistory();
    useEffect(() => {
        getCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.log(error))
    }, []);

    const handleSubmission = () => {
        toast.promise(
            postCategory({
                name: name,
                description: description,
                is_parent: isParent ? 1 : 0,
                parent_id: parentId
            }).then(response => history.push("/app/category"))
            ,
            {
                loading: "Saving",
                success: "Saved category",
                error: "Error saving category"
            }
        )
    }

    return (
        <>
            <PageTitle>Add Category</PageTitle>

            <Card>
                <CardBody>
                    <Label>
                        <span>Name</span>
                        <Input className="mt-1" placeholder="Enter product name" onChange={e => setName(e.target.value)} value={name} />
                    </Label>
                    <Label className="mt-4">
                        <span>Description</span>
                        <Textarea className="mt-1" rows="10" placeholder="Enter summary" onChange={e => setDescription(e.target.value)} value={description} />
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

                    <div>
                        <Button className="mt-4" onClick={handleSubmission}>Save</Button>
                    </div>
                </CardBody>
            </Card>


        </>
    )
}

export default Add;