import React, { useEffect, useState } from "react";
import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'
import { ButtonsIcon, CheckIcon, CrossIcon, HeartIcon } from "../../icons";
import { getCategories } from "../../adapters/category";
import { getBrands } from "../../adapters/brand";

export const GeneralInfoEdit = ({ product }) => {

    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');
    const [parentId, setParentId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [brandId, setBrandId] = useState(0);

    // data storage for backend data
    const [categories, setCategories] = useState([]);
    const [selectedTree, setSelectedTree] = useState(undefined);
    const [brands, setBrands] = useState(undefined)
    useEffect(() => {
        getCategories()
            .then(response => { setCategories(response.data) })
            .catch(error => console.log(error))

        getBrands()
            .then(response => { setBrands(response.data) })
            .catch(error => console.log(error))

        // console.log(product)

        setName(product.name);
        setSummary(product.summary)
        setCategoryId(product.category_id);
        setBrandId(product.brand_id)
        setParentId(product.parent_id)

        // setSelectedTree([])
    }, [])





    const handleSubmission = (e) => {
        console.log({ name, summary, parentId, categoryId, brandId })
    }

    return (
        <>
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
                <div className="grid gap-6 mb-8 md:grid-cols-2">
                    <Label className="mt-4">
                        <span>Selected Parent</span>
                        <div className="mt-2 flex flex-col">
                            {categories.map((category, index) =>
                                <Label className="ml-6" radio>
                                    <Input type="radio" value={category.id} name="parent_category" onChange={e => { setSelectedTree(category.child_categories); setParentId(category.id) }} />
                                    <span className="ml-2">{category.name}</span>
                                </Label>

                            )}

                        </div>
                    </Label>
                    <Label className="mt-4">
                        <span>Selected Child</span>
                        {selectedTree ?
                            <Select className="mt-1" onChange={e => setCategoryId(e.target.value)} value={categoryId} >
                                {selectedTree.map((category, index) =>
                                    <option value={category.id} key={index}>{category.name}</option>
                                )}
                            </Select>
                            : ''}

                    </Label>
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



            <div className="flex justify-between">
                <div className="mt-4">
                    <Button icon={CheckIcon} layout="link" aria-label="Save" onClick={handleSubmission} />
                </div>
                <div className="mt-4">
                    <Button icon={CrossIcon} layout="link" aria-label="Cancel" />
                </div>
            </div>

        </>
    );
}