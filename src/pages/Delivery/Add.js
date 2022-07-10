import React from "react"
import { useState } from "react";
import { Card, CardBody, Button } from '@windmill/react-ui'
import { DeliveryForm } from "./Form";
import SectionTitle from "../../components/Typography/SectionTitle";
import toast from "react-hot-toast";
import { postDelivery } from "../../adapters/delivery";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


export const DeliveryAdd = ({ onSubmit }) => {
    const [region, setRegion] = useState('');
    const [price, setPrice] = useState('');
    const { user } = useContext(UserContext)

    const handleAddition = () => {
        toast.promise(
            postDelivery(user.data.token, { price, region }),
            {
                loading: "Saving Delivery option",
                success: () => {
                    onSubmit();
                    setRegion('');
                    setPrice('');
                    return "Delivery option saved"
                },
                error: "Error saving delivery option"
            }
        )
    }
    return (
        <Card className="mb-8 shadow-md">
            <CardBody>
                <div className="text-gray-600 dark:text-gray-400">
                    <SectionTitle>Add Delivery option</SectionTitle>

                    <DeliveryForm {...{
                        price: { value: price, setValue: setPrice },
                        region: { value: region, setValue: setRegion }
                    }} />

                    <Button className="mt-4" onClick={handleAddition}>Save</Button>
                </div>
            </CardBody >
        </Card >
    );
}