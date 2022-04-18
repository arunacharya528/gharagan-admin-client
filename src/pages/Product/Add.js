import React, { useEffect, useState } from "react";
import PageTitle from '../../components/Typography/PageTitle'
import { Card, CardBody, Badge, Modal, ModalHeader, ModalBody } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'
import { useLocation } from "react-router-dom";
import { getCategories } from "../../adapters/category";
import { getBrands } from "../../adapters/brand";
import { CheckIcon, CrossIcon } from "../../icons";
import { postProduct } from "../../adapters/product";
import { useHistory } from "react-router-dom";

const Add = () => {

    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [brandId, setBrandId] = useState(0);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState(undefined)

    const history = useHistory();

    useEffect(() => {
        getCategories()
            .then(response => { setCategories(response.data) })
            .catch(error => console.log(error))

        getBrands()
            .then(response => { setBrands(response.data) })
            .catch(error => console.log(error))
    }, [])


    const handleSubmission = () => {
        postProduct({
            name: name,
            summary: summary,
            category_id: categoryId,
            brand_id: brandId
        }).then(response => { history.push("/app/product/" + response.data.id + "/edit") })
            .catch(error => console.log(error))
    }

    return (
        <>
            <PageTitle>
                <div className="flex justify-between align-middle">
                    <span>Add new product</span>
                </div>
            </PageTitle>

            <Card className="mb-8 shadow-md">
                <CardBody>

                    <div className="text-gray-600 dark:text-gray-400">
                        <Label>
                            <span>Name</span>
                            <Input className="mt-1" placeholder="Enter product name" onChange={e => setName(e.target.value)} value={name} />
                        </Label>
                        <Label className="mt-4">
                            <span>Summary</span>
                            <Textarea className="mt-1" rows="3" placeholder="Enter summary" onChange={e => setSummary(e.target.value)} value={summary} />
                        </Label>

                        <Label className="mt-4">
                            <span>Category</span>
                            <div className="grid gap-6 mb-8 sm:grid-cols-3 md:grid-cols-5">
                                {categories.map((category, index) =>
                                    <div className="flex flex-col">
                                        <span className="ml-2">{category.name}</span>
                                        {category.child_categories.map((child_category) =>
                                            <Label className="ml-6" radio>
                                                <Input type="radio" value={child_category.id} name="category" onChange={e => setCategoryId(child_category.id)}
                                                    checked={categoryId === child_category.id ? true : false}
                                                />
                                                <span className="ml-2">{child_category.name}</span>
                                            </Label>
                                        )}
                                    </div>

                                )}
                            </div>
                        </Label>

                        {
                            brands ?
                                <Label className="mt-4">
                                    <span>Brand</span>
                                    <Select className="mt-1" onChange={e => setBrandId(e.target.value)} value={brandId}>
                                        {
                                            brands.map((brand, index) =>
                                                <option value={brand.id} key={index}>{brand.name}</option>
                                            )
                                        }
                                    </Select>
                                </Label>
                                : ''
                        }


                        <div className="flex justify-between mt-4 align-middle">
                            <Button iconLeft={CheckIcon} onClick={handleSubmission}>
                                <span>Create</span>
                            </Button>
                            <div className="mb-4 text-gray-600 dark:text-gray-400 italic text-sm font-light">
                                <span>Add other details like inventories, description and image after product is created</span>
                            </div>
                            <Button iconRight={CrossIcon}>
                                <span>Cancel</span>
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>

        </>
    );
}


export default Add;