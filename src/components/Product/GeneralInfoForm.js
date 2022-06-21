import { Input, HelperText, Label, Select, Textarea, Button } from '@windmill/react-ui'
import React, { useEffect, useState } from 'react';
import { getBrands } from '../../adapters/brand';
import { getCategories } from '../../adapters/category';
import { CheckIcon } from '../../icons';

export const GeneralInfoForm = (props = {
    name: { value: String, setValue: Function },
    summary: { value: String, setValue: Function },
    category: { value: String, setValue: Function },
    brand: { value: String, setValue: Function },
    onSubmit: { value: String, action: Function }
}) => {

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState(undefined)

    const [errors, setErrors] = useState({
        name: { state: false, message: 'name is required' },
        summary: { state: false, message: 'summary is required' },
        category: { state: false, message: 'category is required' },
        brand: { state: false, message: 'brand is required' }
    })

    useEffect(() => {
        getCategories()
            .then(response => { setCategories(response.data) })
            .catch(error => console.log(error))

        getBrands()
            .then(response => { setBrands(response.data) })
            .catch(error => console.log(error))
    }, [])


    const isEmpty = (value) => {
        return value.trim().length === 0;
    }

    const validate = (e) => {
        const data = e.target;
        const newErrors = errors;

        // requirement validation for all instances
        newErrors[data.name] = isEmpty(data.value) ? { state: false, message: data.name + " is required" } : { state: true, message: '' };

        // set state value to provided instance
        props[data.name].setValue(data.value)

        setErrors(newErrors);
    }

    const isValid = () => {
        var isValid = false;
        for (var key in errors) {
            isValid = errors[key].state;
            if (!isValid) {
                break;
            }
        }
        return isValid;
    }

    return (
        <>
            <Label>
                <span>Name</span>
                <Input className="mt-1" placeholder="Enter product name" valid={errors.name.state} name="name" onChange={validate} value={props.name.value} />
                <HelperText valid={errors.name.state} className="capitalize">{errors.name.message}</HelperText>
            </Label>
            <Label className="mt-4">
                <span>Summary</span>
                <Textarea className="mt-1" rows="3" placeholder="Enter summary" name="summary" valid={errors.summary.state} onChange={validate} value={props.summary.value} />
                <HelperText valid={errors.summary.state} className="capitalize">{errors.summary.message}</HelperText>
            </Label>

            <Label className="mt-4">
                <span>Category</span>
                <div className={"grid gap-6 sm:grid-cols-3 md:grid-cols-5 p-3 rounded-md " + (errors.category.state ? "border border-green-600" : "border border-red-600")}>

                    {categories.map((category, index) =>
                        <div className="flex flex-col" key={index}>
                            <span className="ml-2">{category.name}</span>
                            {category.child_categories.map((child_category) =>
                                <Label className="ml-6" radio>
                                    <Input type="radio" value={child_category.id} name="category" onChange={validate}
                                        checked={parseInt(props.category.value) === child_category.id ? true : false}
                                    />
                                    <span className="ml-2">{child_category.name}</span>
                                </Label>
                            )}
                        </div>
                    )}
                </div>
                <HelperText valid={errors.category.state} className="capitalize">{errors.category.message}</HelperText>
            </Label>

            {
                brands ?
                    <Label className="mt-4">
                        <span>Brand</span>
                        <Select className="mt-1" name="brand" onChange={validate} valid={errors.brand.state} value={props.brand.value}>
                            {
                                brands.map((brand, index) =>
                                    <option value={brand.id} key={index}>{brand.name}</option>
                                )
                            }
                        </Select>

                        <HelperText valid={errors.brand.state} className="capitalize">{errors.brand.message}</HelperText>
                    </Label>
                    : ''
            }

            <div className="flex space-x-5 mt-4 align-middle items-center">
                <Button iconLeft={CheckIcon} onClick={props.onSubmit.action} disabled={!isValid()}>
                    <span>{props.onSubmit.value}</span>
                </Button>
                <div className="flex-grow text-gray-600 dark:text-gray-400 italic text-sm font-light">
                    <span>Add other details like inventories, description and image after product is created</span>
                </div>
            </div>
        </>
    );

}