import React, { useContext, useEffect, useState } from "react";
import { Button } from '@windmill/react-ui'
import { MinusIcon, PlusIcon } from "../../icons";
import { FileContext } from "../../context/FileContext";
import { ImageThumbnail } from "./ImageThumbnail";

export const FileSelect = ({ selectedIds }) => {


    const [isToggleSelected, toggleSelected] = useState(false);
    const [isToggleAll, toggleAll] = useState(true);

    const { files } = useContext(FileContext);
    const [allFiles, setAllFiles] = useState([]);

    useEffect(() => {
        setAllFiles(files);
    }, [files])


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
                <div class="flex-1 overflow-y-scroll">
                    <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 pr-4">

                        {
                            isToggleAll ?
                                <>
                                    {
                                        allFiles.map((file, index) =>
                                            <ImageThumbnail
                                                file={file}
                                                key={index}
                                                viewAction={() => { }}
                                                removalAction={{
                                                    icon: file.selected ?
                                                        <MinusIcon className="w-8 h-8 p-2" />
                                                        : <PlusIcon className="w-8 h-8 p-2" />,
                                                    action: () => { handleSelection(file.id) }
                                                }}
                                            />
                                        )
                                    }
                                </>

                                : ''
                        }
                        {
                            isToggleSelected ?
                                <>
                                    {allFiles.filter((file) => file.selected === true).map((file, index) =>
                                        <ImageThumbnail
                                            file={file}
                                            key={index}
                                            viewAction={() => { }}
                                            removalAction={{
                                                icon: file.selected ?
                                                    <MinusIcon className="w-8 h-8 p-2" />
                                                    : <PlusIcon className="w-8 h-8 p-2" />,
                                                action: () => { handleSelection(file.id) }
                                            }}
                                        />
                                    )}
                                </>
                                : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}