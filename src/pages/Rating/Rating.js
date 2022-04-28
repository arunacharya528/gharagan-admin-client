import React, { useEffect, useState } from 'react';
import { getRatings } from '../../adapters/rating';
import { Card, CardBody, Button } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { StarRate } from '../../components/Rating/StarRate';
import { TrashIcon } from '../../icons';
import { RatingView } from './View';

const moment = require('moment');

const Rating = () => {
    const [ratings, setRatings] = useState([]);
    const [isRefreshed, setRefresh] = useState(false);

    useEffect(() => {
        getRatings()
            .then(response => setRatings(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed])

    return (
        <>
            <PageTitle>
                <div className="flex justify-between">
                    <span>Ratings</span>

                </div>
            </PageTitle>

            <div className='text-gray-600 dark:text-gray-400'>
                {ratings.length !== 0 ?
                    ratings.map((rating, index) =>
                        <RatingView rating={rating} key={index} refresh={() => setRefresh(!isRefreshed)} />
                    )
                    : ''
                }
            </div>

        </>
    );
}

export default Rating;