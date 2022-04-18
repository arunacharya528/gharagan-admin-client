import React, { useEffect, useState } from "react";
import { Button } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { MinusIcon, PlusIcon } from "../../icons";
import { getFiles } from "../../adapters/file";

export const FileSelect = ({ selectedIds }) => {


    const [isToggleSelected, toggleSelected] = useState(false);
    const [isToggleAll, toggleAll] = useState(true);

    const [allFiles, setAllFiles] = useState([]);


    useEffect(() => {
        getFiles()
            .then(response => { setAllFiles(response.data) })
            .catch(error => console.log(error))
    }, []);


    const [selectedFiles, setSelectedFiles] = useState([]);

    const setDefault = () => {
        toggleSelected(false);
        toggleAll(false);
    }
    const toggleStates = (toggleName) => {
        setDefault();
        switch (toggleName) {
            case 'ALL':
                toggleAll(true);
                break;
            case 'SELECTED':
                toggleSelected(true);
                break;
        }
    }

    const handleSelection = (id) => {
        const modifiedData = allFiles.map((file) => {
            if (file.id === id) {
                if (file.selected === undefined || file.selected === false) {
                    file.selected = true;
                } else if (file.selected === true) {
                    file.selected = false
                }
            }
            return file;
        })

        setAllFiles(modifiedData);
    }

    const handleSubmission = () => {
        const ids = allFiles.filter((file) => file.selected === true).map((file, index) => { return file.id });
        selectedIds(ids)
    }
    const ImageDisplay = ({ file }) => {
        return (
            <div className="relative cursor-copy " onClick={e => handleSelection(file.id)}>
                <span className=" absolute right-0 top-0 bg-gray-700 rounded p-2">
                    {file.selected ?
                        <MinusIcon className="w-5 h-5 fill-white" aria-hidden="true" />
                        : <PlusIcon className="w-5 h-5" aria-hidden="true" />}
                </span>

                <img src={process.env.REACT_APP_FILE_PATH + "/" + file.path} alt={file.name + "image"} className="rounded-t" checked={false} />
                <div className="font-light text-center w-full bg-gray-700 rounded-b text-white">{file.name}</div>
            </div>
        );
    }
    return (
        <div class="h-screen grid gap-6 md:grid-cols-4">
            <div class="relative">
                <Button size="large" layout={isToggleSelected ? 'outline' : "link"} className="w-full text-left" onClick={e => toggleStates("SELECTED")}>
                    Selected Images
                </Button>
                <Button size="large" layout={isToggleAll ? 'outline' : 'link'} className="w-full text-left mt-3" onClick={e => toggleStates("ALL")}>
                    All Images
                </Button>

                <Button size="large" className="w-full text-left mt-3 " onClick={handleSubmission}>
                    Insert Selected Images
                </Button>
            </div>

            <div class="flex-1 flex overflow-hidden md:col-span-3">
                {
                    isToggleAll ?
                        <div class="flex-1 overflow-y-scroll">
                            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 pr-4">
                                {allFiles.map((file, index) =>
                                    <ImageDisplay file={file} key={index} />
                                )}
                            </div>
                        </div>
                        : ''
                }
                {
                    isToggleSelected ?
                        <div class="flex-1 overflow-y-scroll">
                            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 pr-4">
                                {allFiles.filter((file) => file.selected === true).map((file, index) =>
                                    <ImageDisplay file={file} key={index} />
                                )}
                            </div>
                        </div>
                        : ''
                }

            </div>
        </div>
    );
}