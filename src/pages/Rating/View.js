import { Card, CardBody, Button } from '@windmill/react-ui'
import moment from 'moment';
import React, { useContext } from 'react';
import { StarRate } from '../../components/Rating/StarRate';
import { TrashIcon } from '../../icons';
import { HashLink } from 'react-router-hash-link'
import { deleteRating } from '../../adapters/rating';
import toast from 'react-hot-toast';
import { ModalContext } from '../../context/ModalContext';
import { UserContext } from '../../context/UserContext';

export const RatingView = ({ rating, refresh }) => {
    const { user } = useContext(UserContext)
    const { setModalData, openModal, closeModal } = useContext(ModalContext)
    const handleDeleteButtonPress = (id) => {
        const handleDeletion = () => {
            toast.promise(
                deleteRating(user.data.token, id)
                , {
                    loading: "Deleting rating",
                    success: () => {
                        refresh();
                        closeModal();
                        return "Deleted rating";
                    },
                    error: "Error deleting rating"
                }
            )

        }
        setModalData({
            title: "Are you sure you want to delete this rating?",
            body:
                <div>
                    <p>The rating would be permanently be deleted and would affect the rating of product</p>
                    <Button className="mt-4" onClick={handleDeletion}>Confirm deletion</Button>
                </div>
        })
        openModal()
    }

    return (
        <Card className="mb-4">
            <CardBody>
                <div className="flex flex-row" id={"rating" + rating.id}>
                    <div className="w-full">
                        <div className='flex flex-col space-y-2'>
                            <div className='space-x-2'>
                                <span className='font-bold'>{rating.user.name}</span>

                                {
                                    rating.product
                                        ?
                                        <HashLink to={"/app/product/" + rating.product.id + "#rating" + rating.id} className='underline'>{rating.product.name}</HashLink>
                                        : ''
                                }

                            </div>
                            <StarRate rate={rating.rate} />
                            <div>
                                {rating.comment}
                            </div>
                            <span className='italic text-gray-500'>{moment(rating.created_at).fromNow()}</span>
                        </div>
                    </div>
                    <div className="w-16">
                        <Button icon={TrashIcon} layout="link" aria-label="Like" onClick={e => handleDeleteButtonPress(rating.id)} />
                    </div>
                </div>

            </CardBody>
        </Card>
    );
}