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
    Modal, ModalHeader, ModalBody, ModalFooter
} from '@windmill/react-ui'

import { Card, CardBody } from '@windmill/react-ui'

import React, { useState } from 'react';
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'

import PageTitle from '../../components/Typography/PageTitle'
import { PlusIcon } from '../../icons';
import { FileSelect } from '../File/Select';
import { postBrand } from '../../adapters/brand';


export const Add = ({ afterSubmission }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState(null);
    const [fileId, setFileId] = useState(null);

    const [isSelectorDisplayed, setSelectorTodisplay] = useState(false);

    const handleBrandSubmission = (e) => {
        var data = { name: name }
        data = fileId ? { ...data, ...{ file_id: fileId } } : {
            ...data, ...{ image_url: url }
        }

        console.log(data);
        postBrand(data)
            .then(response => { afterSubmission() })
            .catch(error => console.log(error))
    }

    const handleFileSubmission = (ids) => {
        setFileId(ids[0])
        setSelectorTodisplay(!isSelectorDisplayed);
    }
    return (
        <>
            <Card className="mb-8 shadow-md">
                <CardBody>
                    <div className="mb-4 font-semibold text-gray-600 dark:text-gray-300 flex justify-between">
                        <span>General Info</span>

                    </div>
                    <div className="text-gray-600 dark:text-gray-400">

                        <Label>
                            <span>Name</span>
                            <Input className="mt-1" placeholder="Enter brand name" onChange={e => setName(e.target.value)} value={name} />
                        </Label>

                        {
                            url ?
                                <div>
                                    <span className="mb-3">Preview</span>
                                    <img src={url} className="h-64 rounded" />
                                </div>
                                : ''
                        }

                        <Label className="w-full mt-4 flex">
                            {/* <span>Image URL</span> */}
                            <Input className="" placeholder="Enter URL of an image" value={url} onChange={e => setUrl(e.target.value)} />
                        </Label>

                        <Label className="mt-4">
                            <span>File would be prioritized over image URL if both are provided</span>
                        </Label>

                        {
                            fileId ?
                                <>
                                    <Label className="mt-4">
                                        <span>File is stored for uploading</span>
                                    </Label>
                                    <Button className="mt-4" onClick={e => { setFileId(null) }}>
                                        Clear stored image
                                    </Button>
                                </>
                                :
                                <Button className={"mt-4 mb-5 " + (isSelectorDisplayed ? 'bg-red-700' : '')} onClick={e => setSelectorTodisplay(!isSelectorDisplayed)}>
                                    {isSelectorDisplayed ? 'Close Selection Mode' : 'Select Image from Database'}
                                </Button>
                        }
                        <br />
                        {isSelectorDisplayed ?
                            <>
                                <span className='my-2 block'>Only the image selected at first qould be selected </span>
                                <FileSelect selectedIds={handleFileSubmission} />
                            </>
                            : ''}
                        <br />
                        <Button className="mt-4" onClick={handleBrandSubmission}>
                            Create
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}