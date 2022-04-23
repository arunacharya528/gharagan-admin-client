import {
    Card, CardBody
} from '@windmill/react-ui'
import React from 'react';

const moment = require('moment');

export const View = ({ ad, displayShort }) => {

    const getBadge = (status) => {

        // status = status === 0 ? false : status === 1 ? true : undefined;
        return <span className={'py-1 px-2 font-bold text-white rounded-full ' + (status ? 'bg-green-600' : ' bg-red-600')}>
            {status ? 'Active' : 'Inactive'}
        </span>
    }
    return (
        <>
            {
                ad.file ?
                    <a href={process.env.REACT_APP_FILE_PATH + "/" + ad.file.path} target="_blank">
                        <img src={process.env.REACT_APP_FILE_PATH + "/" + ad.file.path} className="rounded" />
                    </a >
                    : ''
            }

            <div className="grid grid-cols-3 truncate gap-3 mt-4">
                <div className='font-bold'>Name</div>
                <div className='col-span-2'>{ad.name}</div>

                <div className='font-bold'>URL slug</div>
                <div className='col-span-2'>
                    <a href={ad.url_slug} title="Forward to advertisement link" target='_blank'>{ad.url_slug}</a>
                </div>

                <div className='font-bold'>Page</div>
                <div className='col-span-2'>{ad.page}</div>

                <div className='font-bold'>Type</div>
                <div className='col-span-2'>{ad.type}</div>


                <div className='font-bold'>Status</div>
                <div className='col-span-2'>{getBadge(ad.active)}</div>

                <div className='font-bold'>Active from</div>
                <div className='col-span-2'>
                    {moment(ad.active_from).format('MMMM Do YYYY, h:mm:ss az')}
                    {' '}
                    (<span><b>Starts: </b>{moment(ad.active_from).fromNow()}</span>)
                </div>

                <div className='font-bold'>Active to</div>
                <div className='col-span-2'>
                    {moment(ad.active_to).format('MMMM Do YYYY, h:mm:ss az')}
                    {' '}
                    (<span><b>Runs: </b>{moment(ad.active_to).from(ad.active_from, true)}</span>)
                </div>

                <div className='font-bold'>Created at</div>
                <div className='col-span-2'>
                    {moment(ad.created_at).format('MMMM Do YYYY, h:mm:ss az')}
                </div>

                <div className='font-bold'>Updated at</div>
                <div className='col-span-2'>
                    {moment(ad.updated_at).format('MMMM Do YYYY, h:mm:ss az')}
                </div>

            </div>
        </>
    );
}