import React, { createRef, useContext, useEffect, useState } from "react";
import { Card, CardBody, Label, Input, Textarea, Select, WindmillContext, Button } from '@windmill/react-ui';
import PageTitle from '../../components/Typography/PageTitle'
import AnalogTimePicker from "react-multi-date-picker/plugins/time_picker";

import "react-multi-date-picker/styles/colors/purple.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import "react-multi-date-picker/styles/layouts/mobile.css"

import { Calendar } from "react-multi-date-picker"
import { FileSelect } from "../File/Select";
import { postAdvertisement } from "../../adapters/advertisement";
import { useHistory } from "react-router-dom";
import { FileContext } from "../../context/FileContext";
import { ImageThumbnail } from "../File/ImageThumbnail";
import { MinusIcon } from "../../icons";
import toast from "react-hot-toast";

const moment = require('moment')

const Add = () => {

    const { mode } = useContext(WindmillContext)
    const { files } = useContext(FileContext)

    const [name, setName] = useState(undefined);
    const [summary, setSummary] = useState(undefined);
    const [page, setPage] = useState(undefined);
    const [type, setType] = useState(undefined);
    const [url, setURL] = useState(undefined);
    const [active, setActive] = useState(undefined);
    const [fileId, setFileId] = useState(undefined);
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [selectedImage, setSelectedImage] = useState(undefined);

    useEffect(() => {
        files.map((file) => {
            if (file.id === fileId) {
                setSelectedImage(file);
            }
        })
    }, [files, fileId])

    const history = useHistory();
    const [isSelectorDisplayed, setSelectorTodisplay] = useState(false);
    const types = ['banner', 'promotion', 'category'];
    const pages = ['home', 'detail', 'filter', 'profile'];

    const handleDateChange = range => {
        setDateRange(range)
    };


    const handleSubmission = () => {
        toast.promise(
            postAdvertisement({
                name: name,
                summary: summary,
                page: page,
                type: type,
                file_id: fileId,
                url_slug: url,
                active: parseInt(active),
                active_from: moment(Date.parse(dateRange[0])).format('YYYY-MM-DD HH:mm:ss'),
                active_to: moment(Date.parse(dateRange[1])).format('YYYY-MM-DD HH:mm:ss'),
            })
                .then(response => history.push("/app/advertisement"))
            ,
            {
                loading: "Saving advertisement",
                success: "Advertisement saved",
                error: (error) => error.message
            }
        )
    }
    return (
        <>
            <PageTitle>
                <div className='flex justify-between align-middle'>
                    <span>Add Advertisement</span>
                </div>

            </PageTitle>

            <Card>
                <CardBody>
                    <div className="text-gray-600 dark:text-gray-400">

                        <Label>
                            <span>Name</span>
                            <Input className="mt-1" placeholder="Enter advertisement name" onChange={e => setName(e.target.value)} value={name} />
                        </Label>

                        <Label className="mt-4">
                            <span>Advertisement Summary</span>
                            <Textarea className="mt-1" placeholder="Enter short summary" onChange={e => setSummary(e.target.value)} value={summary} rows={10} />
                        </Label>


                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div className="">
                                <Label>Type</Label>
                                <div className="mt-2 flex flex-col">
                                    {types.map((instance, i) =>
                                        <Label radio key={i} className="ml-4">
                                            <Input type="radio" value={type ? type : instance} name="type" className="" onChange={e => setType(e.target.value)} />
                                            <span className="ml-2">{instance.charAt(0).toUpperCase() + instance.slice(1)}</span>
                                        </Label>

                                    )}
                                </div>
                            </div>
                            <div className="">
                                <Label>Page</Label>
                                <div className="mt-2 flex flex-col">
                                    {pages.map((instance, i) =>
                                        <Label radio key={i} className="ml-4">
                                            <Input type="radio" value={page ? page : instance} name="page" className="" onChange={e => setPage(e.target.value)} />
                                            <span className="ml-2">{instance.charAt(0).toUpperCase() + instance.slice(1)}</span>
                                        </Label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Label className="mt-4">
                            <span>Enter URL slug</span>
                            <Input className="mt-1" placeholder="Enter URL" onChange={e => setURL(e.target.value)} value={url} />
                        </Label>

                        <Label className="mt-4">
                            <span>Status</span>
                            <Select className="mt-1" onChange={e => setActive(e.target.value)} value={active}>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </Select>
                        </Label>

                        <Label className="mt-4">
                            <span className="block">Pick the range of date</span>
                            <div className="flex justify-center py-4">
                                <Calendar
                                    range
                                    numberOfMonths={2}
                                    showOtherDays
                                    className={"bg-" + mode + " rmdp-mobile"}
                                    plugins={[
                                        <AnalogTimePicker position="bottom" />,
                                    ]}
                                    onChange={handleDateChange}
                                    value={dateRange}
                                />
                            </div>

                            {
                                Date.parse(dateRange[0]) !== Date.parse(dateRange[1])
                                    ?
                                    <>
                                        {
                                            Date.parse(dateRange[1]) ?
                                                <>
                                                    Starts {moment(new Date(dateRange[0])).fromNow()}
                                                    <br />
                                                    Runs for {moment(new Date(dateRange[1])).from(new Date(dateRange[0]), true)}
                                                </>
                                                : ''
                                        }
                                        <br />

                                    </>
                                    : ''
                            }
                        </Label>

                        <div className="mt-4">
                            <span>Select an image</span>
                            <br />

                            {
                                selectedImage ?
                                    <div className="grid grid-cols-4 gap-5">
                                        <ImageThumbnail
                                            viewAction={() => { }}
                                            removalAction={{
                                                icon: <MinusIcon className="w-8 h-8 p-2" />,
                                                action: () => { setFileId(undefined); setSelectedImage(undefined) }
                                            }}
                                            file={selectedImage}
                                        />
                                    </div>
                                    :
                                    ''
                            }

                            <Button className={"mt-4 mb-5 "} onClick={() => setSelectorTodisplay(!isSelectorDisplayed)}>
                                {isSelectorDisplayed ? 'Close Selection Mode' : 'Select Image from Database'}
                            </Button>
                            <br />

                            {isSelectorDisplayed ?
                                <FileSelect selectedIds={(ids) => setFileId(ids[0])} />
                                : ''
                            }
                        </div>

                        <Button
                            className="mt-4"
                            onClick={handleSubmission}
                        // disabled={() => {
                        //     return name && summary && page && type && active && fileId && url ? false : true
                        // }}
                        >Create</Button>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default Add;