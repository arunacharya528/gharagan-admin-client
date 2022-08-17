import React, { useContext, useEffect, useState } from 'react';
import { getRatings } from '../../adapters/rating';
import { Button } from '@windmill/react-ui'
import PageTitle from '../../components/Typography/PageTitle'
import { RatingView } from './View';
import { UserContext } from '../../context/UserContext';
import SectionTitle from '../../components/Typography/SectionTitle';
import { Link } from 'react-router-dom';

const moment = require('moment');

const Rating = ({ count }) => {
    const [ratings, setRatings] = useState([]);
    const [isRefreshed, setRefresh] = useState(false);

    const { user } = useContext(UserContext)

    useEffect(() => {
        getRatings(user.data.token)
            .then(response => setRatings(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed])

    return (
        <div>
            {
                count ?
                    <SectionTitle>
                        <div className='flex justify-between align-middle'>
                            <span>Ratings</span>
                            <Button tag={Link} to="/app/rating" layout="link">
                                View more
                            </Button>
                        </div>
                    </SectionTitle>
                    :
                    <PageTitle>
                        <div className="flex justify-between">
                            <span>Ratings</span>
                        </div>
                    </PageTitle>
            }


            <div className='text-gray-600 dark:text-gray-400'>


                {ratings.length !== 0 ?

                    count ?
                        ratings.slice(0, count).map((rating, index) =>
                            <RatingView rating={rating} key={index} refresh={() => setRefresh(!isRefreshed)} />
                        )
                        :
                        ratings.map((rating, index) =>
                            <RatingView rating={rating} key={index} refresh={() => setRefresh(!isRefreshed)} />
                        )
                    : ''
                }
            </div>

        </div>
    );
}

export default Rating;