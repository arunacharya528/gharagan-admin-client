import React from "react"
import { useState } from "react";
import { Card, CardBody, Button } from '@windmill/react-ui'
import { DeliveryForm } from "./Form";
import SectionTitle from "../../components/Typography/SectionTitle";
import toast from "react-hot-toast";
import { postDelivery, putDelivery } from "../../adapters/delivery";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";


export const DeliveryEdit = ({ delivery, onSubmit }) => {
    const [region, setRegion] = useState('');
    const [price, setPrice] = useState('');
    const { user } = useContext(UserContext)

    useEffect(() => {
        setRegion(delivery.region)
        setPrice(delivery.price)
    }, [delivery])

    const handleAddition = () => {
        toast.promise(
            putDelivery(user.data.token, { price, region }, delivery.id),
            {
                loading: "Updating Delivery option",
                success: () => {
                    onSubmit();
                    return "Delivery option updated"
                },
                error: "Error updating delivery option"
            }
        )
    }
    return (
        <Card className="mb-8 shadow-md">
            <CardBody>
                <div className="text-gray-600 dark:text-gray-400">
                    <SectionTitle>Update Delivery option</SectionTitle>

                    <DeliveryForm {...{
                        price: { value: price, setValue: setPrice },
                        region: { value: region, setValue: setRegion }
                    }} />

                    <Button className="mt-4" onClick={handleAddition}>Update</Button>
                </div>
            </CardBody >
        </Card >
    );
}