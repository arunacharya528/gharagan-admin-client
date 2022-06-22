import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'
import React, { useEffect, useState } from 'react';
import { getBrands } from '../../adapters/brand';
import { getCategories } from '../../adapters/category';
import { CheckIcon } from '../../icons';
import { useForm } from "react-hook-form";

export const GeneralInfoForm = (props = {
    name: String,
    summary: String,
    category: String,
    brand: String,
    onSubmit: { value: String, action: Function }
}) => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([])

    useEffect(() => {
        getCategories()
            .then(response => { setCategories(response.data) })
            .catch(error => console.log(error))

        getBrands()
            .then(response => { setBrands(response.data) })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        setValue('name', props.name)
        setValue('summary', props.summary)
        setValue('category_id', props.category)
        setValue('brand_id', props.brand)
    }, [props]);


    return (
        <form onSubmit={handleSubmit(data => props.onSubmit.action(data))}>
            <Label>
                <span>Name</span>
                <Input className="mt-1" placeholder="Enter product name" valid={errors.name ? false : undefined} {...register('name', { required: "Product name is required" })} />
                {errors.name ? <HelperText valid={false}>{errors.name.message}</HelperText> : ''}
            </Label>

            <Label className="mt-4">
                <span>Summary</span>
                <Textarea className="mt-1" rows="3" placeholder="Enter summary" name="summary" valid={errors.summary ? false : undefined} {...register('summary', { required: "Product summary is required" })} />
                {errors.summary ? <HelperText valid={false} >{errors.summary.message}</HelperText> : ''}
            </Label>

            <Label className="mt-4">
                <span>Category</span>
                <div className={"grid gap-6 sm:grid-cols-3 md:grid-cols-5 p-3 rounded-md " + (errors.category_id ? "border border-red-600" : "")}>

                    {categories.map((category, index) =>
                        <div className="flex flex-col" key={index}>
                            <span className="ml-2">{category.name}</span>
                            {category.child_categories.map((child_category) =>
                                <Label className="ml-6" radio>
                                    <Input type="radio" value={child_category.id} {...register('category_id', { required: "Category is required" })}
                                        defaultChecked={parseInt(props.category) === child_category.id ? true : false}
                                    />
                                    <span className="ml-2">{child_category.name}</span>
                                </Label>
                            )}
                        </div>
                    )}
                </div>
                {errors.category_id ? <HelperText valid={false}>{errors.category_id.message}</HelperText> : ''}
            </Label>

            <Label className="mt-4">
                <span>Brand</span>
                <Select className="mt-1" name="brand" valid={errors.brand_id ? false : undefined} defaultValue={props.brand} {...register('brand_id', { required: "Brand is required" })}>
                    {
                        brands.map((brand, index) =>
                            <option value={brand.id} key={index}>{brand.name}</option>
                        )
                    }
                </Select>

                {errors.brand_id ? <HelperText valid={false}>{errors.brand_id.message}</HelperText> : ''}
            </Label>

            <Button iconLeft={CheckIcon} type='submit' className="mt-4">
                <span>{props.onSubmit.value}</span>
            </Button>
        </form>
    );

}