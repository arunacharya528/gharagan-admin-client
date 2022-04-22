import React, { useContext, useEffect, useState } from 'react';
import { getAdvertisements } from '../../adapters/advertisement';
import { AdvertisementContext } from '../../context/AdvertisementContext';

import {
    Table,
    TableHeader,
    TableCell,
    TableBody,
    TableRow,
    TableFooter,
    TableContainer,
    Badge,
    Avatar,
    Button,
    Pagination,
    Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody,
    Label, Input, Select
} from '@windmill/react-ui'


import { BackIcon, CrossIcon, EditIcon, EyeIcon, PlusIcon, TrashIcon } from '../../icons'

import PageTitle from '../../components/Typography/PageTitle'
import { View } from './View';

const moment = require('moment');
const Advertisement = () => {

    const [advertisements, setAdvertisements] = useContext(AdvertisementContext);

    const [isRefreshed, setRefresh] = useState(true);

    const [toggleAdd, setToggleAdd] = useState(false);

    const [name, setName] = useState(undefined);
    const [type, setType] = useState('None');
    const [page, setPage] = useState('None');
    const [status, setStatus] = useState("All");
    const [from, setFrom] = useState(undefined);
    const [to, setTo] = useState(undefined);


    const [filteredAd, setFilteredAd] = useState(advertisements);

    // filter each time the dependent variable are changed
    useEffect(() => {
        const filteredData = advertisements.filter((ad) => {
            // return all if nothing is selected
            if (!name && type === "None" && page === "None" && status === 'All' && !from && !to) {
                return ad
            }
            // if anything is selected
            else {
                // check if value exists and only filter if exists
                if (
                    (name && ad.name.includes(name)) ||
                    (from && Date.parse(ad.active_from) >= Date.parse(from)) ||
                    (to && Date.parse(ad.active_to) <= Date.parse(to)) ||
                    (status !== 'All' && ad.active === parseInt(status)) ||
                    (page !== 'None' && ad.page === page) ||
                    (type !== 'None' && ad.type === type)) {
                    return ad
                }
            }
        })
        setFilteredAd(filteredData)
    }, [advertisements, name, type, page, status, from, to]);

    // useEffect(() => {
    //     setFilteredAd(advertisements)
    // }, [])

    // console.table({ name, type, page, status, from, to });
    // console.log(!name && type === "None" && page === "None" && status === 'All' && !from && !to);

    const setDefaultFilter = () => {
        setName('')
        setType('None')
        setPage('None')
        setStatus('All')
        setFrom(undefined)
        setTo(undefined)
    }

    const getBadge = (status) => {
        return <span className={'py-1 px-2 font-bold text-white rounded-full ' + (status ? 'bg-green-600 ' : 'bg-red-600')}>
            {status ? "Active" : "Inactive"}
        </span>
    }

    const determineValidation = (to) => {
        if (Date.now() - Date.parse(to) > 0) {
            return <div className='text-sm mt-4'>The deadline has already passed</div>
        }
    }


    return (
        <>

            <PageTitle>
                <div className='flex justify-between align-middle'>
                    <span>Advertisements</span>
                    <div>
                        <span>
                            <PlusIcon className='w-5 h-5'/>
                        </span>
                    </div>
                </div>

            </PageTitle>
            <div class="h-screen grid gap-6 md:grid-cols-4 text-gray-600 dark:text-gray-400">
                <div class="relative">
                    <Card className="shadow-md">

                        <CardBody>
                            <Label>
                                <span>Enter name of advertisement</span>
                                <Input className="mt-1" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                            </Label>

                            <Label className="mt-4">
                                <span>Select Type of advertisement</span>
                                <Select className="mt-1" onChange={e => setType(e.target.value)} value={type}>
                                    <option>None</option>
                                    <option>banner</option>
                                    <option>promotion</option>
                                    <option>category</option>
                                </Select>
                            </Label>
                            <Label className="mt-4">
                                <span>Select Page of advertisement</span>
                                <Select className="mt-1" onChange={e => setPage(e.target.value)} value={page}>
                                    <option>None</option>
                                    <option>home</option>
                                    <option>detail</option>
                                    <option>filter</option>
                                    <option>profile</option>
                                </Select>
                            </Label>

                            <Label className="mt-4">
                                <span>Select status</span>
                                <Select className="mt-1" onChange={e => setStatus(e.target.value)} value={status}>
                                    <option>All</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </Select>
                            </Label>

                            <Label className="mt-4">
                                <span>Enter starting date</span>
                                <Input type="datetime-local" className="mt-1" onChange={e => setFrom(e.target.value)} value={from} />
                            </Label>

                            <Label className="mt-4">
                                <span>Enter ending date</span>
                                <Input type="datetime-local" className="mt-1" onChange={e => setTo(e.target.value)} value={to} />
                            </Label>
                            <Button className="mt-4" onClick={e => setDefaultFilter()}>
                                Clear all
                            </Button>
                        </CardBody>
                    </Card>
                </div>
                <div class="flex-1 flex overflow-hidden md:col-span-3">
                    <div class="flex-1 overflow-y-scroll">
                        {filteredAd.map((ad, i) =>
                            <Card className="mb-4 shadow-md mr-4">
                                <CardBody>
                                    <div className="grid grid-cols-6 items-center gap-5">

                                        <div className=''>
                                            {
                                                ad.file ?

                                                    <img src={process.env.REACT_APP_FILE_PATH + "/" + ad.file.path} className="rounded w-full" />

                                                    : ''
                                            }
                                        </div>


                                        <div className='flex flex-col space-y-2'>
                                            <span><b>Name: </b>{ad.name}</span>
                                            <span><b>Page: </b>{ad.page}</span>
                                            <span><b>Type: </b>{ad.type}</span>
                                        </div>

                                        <div className='flex flex-col space-y-2 col-span-2'>
                                            <span>
                                                <b>From: </b>
                                                {moment(ad.active_from).format('MMMM Do YYYY, h:mm:ss az')}
                                            </span>
                                            <span>
                                                <b>To: </b>
                                                {moment(ad.active_to).format('MMMM Do YYYY, h:mm:ss az')}
                                            </span>
                                        </div>

                                        <div className='flex flex-col text-center'>
                                            {getBadge(ad.active)}
                                            {determineValidation(ad.active_to)}
                                        </div>

                                        <div className='flex items-center'>
                                            <div>
                                                <Button icon={EyeIcon} layout="link" aria-label="View" />
                                            </div>
                                            <div>
                                                <Button icon={EditIcon} layout="link" aria-label="Edit" />
                                            </div>
                                            <div>
                                                <Button icon={TrashIcon} layout="link" aria-label="Delete" />
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </>


    );
}

export default Advertisement;