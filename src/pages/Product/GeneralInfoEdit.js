import React, { useEffect, useState } from "react";
import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'
import { ButtonsIcon, CheckIcon, CrossIcon, HeartIcon } from "../../icons";
import { getCategories } from "../../adapters/category";
import { getBrands } from "../../adapters/brand";
import { getProduct, putProduct } from "../../adapters/product";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export const GeneralInfoEdit = () => {

    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [brandId, setBrandId] = useState(0);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState(undefined)
    const location = useLocation();
    const [toggleCancel, setToggleCancel] = useState(false);

    useEffect(() => {
        getCategories()
            .then(response => { setCategories(response.data) })
            .catch(error => console.log(error))

        getBrands()
            .then(response => { setBrands(response.data) })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        getProduct(location.pathname.split('/')[3])
            .then(response => {

                const product = response.data;
                setName(product.name);
                setSummary(product.summary)
                setCategoryId(product.category_id);
                setBrandId(product.brand_id)
            })
            .catch(error => console.log(error))
    }, [toggleCancel])

    const handleSubmission = (e) => {
        toast.promise(
            putProduct({
                name: name,
                summary: summary,
                category_id: categoryId,
                brand_id: brandId
            }, location.pathname.split("/")[3])
            ,
            {
                loading: "Updating",
                success: "Updated general info",
                error: "Error updating general info"
            })
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



            <div className="flex justify-between">
                <div className="mt-4">
                    <Button icon={CheckIcon} layout="link" aria-label="Save" onClick={handleSubmission} />
                </div>
                <div className="mt-4">
                    <Button icon={CrossIcon} layout="link" aria-label="Cancel" onClick={e => setToggleCancel(!toggleCancel)} />
                </div>
            </div>

        </>
    );
}