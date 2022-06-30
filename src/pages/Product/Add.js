import React, { useState } from "react";
import PageTitle from '../../components/Typography/PageTitle'
import { Card, CardBody } from '@windmill/react-ui'
import { postProduct } from "../../adapters/product";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { GeneralInfoForm } from "../../components/Product/GeneralInfoForm";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const Add = () => {

    const { user } = useContext(UserContext)
    const history = useHistory();

    const handleSubmission = (data) => {
        toast.promise(
            postProduct(user.data.token, data)
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
                            name: '',
                            summary: '',
                            category: '',
                            brand: '',
                            onSubmit: { value: "Create", action: handleSubmission }
                        }} />
                    </div>
                </CardBody>
            </Card>

        </>
    );
}


export default Add;