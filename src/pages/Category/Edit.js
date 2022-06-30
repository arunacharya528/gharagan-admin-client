import React, { useContext, useEffect, useState } from "react"
import { getCategories, getCategory, putCategory } from "../../adapters/category";
import { Input, HelperText, Label, Select, Textarea, Button, Card, CardBody } from '@windmill/react-ui'
import Category from "./Category";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import toast from "react-hot-toast";
import PageTitle from "../../components/Typography/PageTitle";
import { UserContext } from "../../context/UserContext";

const Edit = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isParent, setIsParent] = useState(false);
    const [parentId, setParentId] = useState(0);

    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const history = useHistory();

    const id = location.pathname.split('/')[3]
    const { user } = useContext(UserContext)
    useEffect(() => {
        getCategory(user.data.token, id)
            .then(response => {
                setName(response.data.name)
                setDescription(response.data.description)
                setIsParent(response.data.is_parent)
                setParentId(response.data.parent_id)
            })
            .catch(error => console.log(error))

        getCategories()
            .then(response => setCategories(response.data))
            .catch(error => console.log(error))
    }, []);

    const handleSubmission = () => {
        toast.promise(
            putCategory(user.data.token, { name: name, description: description, is_parent: isParent, parent_id: parentId }, id)
                .then(response => { history.push("/app/category") })
            ,
            {
                loading: "Updating category",
                success: "Category Updated",
                error: "Error updating category"
            }
        )
    }
    return (
        <>
            <PageTitle>Edit Category</PageTitle>
            <Card>
                <CardBody>
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
                            <div className="mt-4 text-gray-500">This category is a parent hence cannot be made a child</div>
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

export default Edit