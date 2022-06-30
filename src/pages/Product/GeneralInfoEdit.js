import React, { useContext, useEffect, useState } from "react";
import { getProduct, putProduct } from "../../adapters/product";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { GeneralInfoForm } from "../../components/Product/GeneralInfoForm";
import { UserContext } from "../../context/UserContext";

export const GeneralInfoEdit = () => {

    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [brandId, setBrandId] = useState('');

    const location = useLocation();
    const url = location.pathname.split('/')[3];


    const { user } = useContext(UserContext)

    useEffect(() => {
        getProduct(url)
            .then(response => {
                setName(response.data.name);
                setSummary(response.data.summary);
                setCategoryId(response.data.category_id + "");
                setBrandId(response.data.brand_id + "")
            })
            .catch(error => console.log(error))
    }, [])

    const handleSubmission = (data) => {
        toast.promise(
            putProduct(user.data.token, data, url)
            ,
            {
                loading: "Updating",
                success: "Updated general info",
                error: "Error updating general info"
            })
    }

    return (
        <>
            <GeneralInfoForm {...{
                name: name,
                summary: summary,
                category: categoryId,
                brand: brandId,
                onSubmit: { action: handleSubmission, value: "Update" }
            }} />
        </>
    );
}