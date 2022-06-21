import React, { useState } from "react";
import PageTitle from '../../components/Typography/PageTitle'
import { Card, CardBody } from '@windmill/react-ui'
import { postProduct } from "../../adapters/product";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { GeneralInfoForm } from "../../components/Product/GeneralInfoForm";

const Add = () => {

    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [brandId, setBrandId] = useState(0);

    const history = useHistory();

    const handleSubmission = () => {
        toast.promise(
            postProduct({
                name: name,
                summary: summary,
                category_id: categoryId,
                brand_id: brandId
            })
                .then(response => {
                    history.push("/app/product/" + response.data.id + "/edit");
                    toast(<div>
                        Make sure to add other information to this product like <b>Inventory</b> and <b>Images</b>
                    </div>, { duration: 6000 })
                })
            ,
            {
                loading: "Saving product",
                success: "Successfully saved product",
                error: "There was an error saving the product"
            }
        )
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
                        <GeneralInfoForm {...{
                            name: { value: name, setValue: setName },
                            summary: { value: summary, setValue: setSummary },
                            category: { value: categoryId, setValue: setCategoryId },
                            brand: { value: brandId, setValue: setBrandId },
                            onSubmit: { value: "Create", action: handleSubmission }
                        }} />
                    </div>
                </CardBody>
            </Card>

        </>
    );
}


export default Add;