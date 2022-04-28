import { Card, CardBody, Button } from '@windmill/react-ui'
import moment from 'moment';
import React from 'react';
import { StarRate } from '../../components/Rating/StarRate';
import { TrashIcon } from '../../icons';
import { HashLink } from 'react-router-hash-link'

export const RatingView = ({ rating }) => {

    return (
        <Card className="mb-4">
            <CardBody>
                {/* {console.log(rating.id)} */}
                <div className="flex flex-row" id={"rating" + rating.id}>
                    <div className="w-full">
                        <div className='flex flex-col space-y-2'>
                            <div className='space-x-2'>
                                <span className='font-bold'>{rating.user.first_name + " " + rating.user.last_name}</span>

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
                        <Button icon={TrashIcon} layout="link" aria-label="Like" />
                    </div>
                </div>

            </CardBody>
        </Card>
    );
}