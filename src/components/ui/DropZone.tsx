import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDropzone} from "react-dropzone";
import {uploadFile} from "../../features/uploadSlice";
import {useAppDispatch} from "../../types/hooks";
import {RootState} from "../../store/index.module";
import {useSelector} from "react-redux";
import {STATUS} from "../../types/Status";
import LoadingUi from "./LoadingUi";

interface FileDropzoneProps {
    onFileUploadUrl?: (link: string) => void
    placeholder?: string;
    storedFileUrl?: string | null;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({onFileUploadUrl, placeholder, storedFileUrl}) => {
    const dispatch = useAppDispatch();
    const {message, status, image_url,} = useSelector((state: RootState) => state.file);
    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles[0] || null;
            if (file) {
                try {
                    await dispatch(uploadFile(file)).unwrap()
                } catch (err) {
                    return err
                }

            }
        },
        [onFileUploadUrl, dispatch]
    );
    useEffect(() => {

        if (image_url && onFileUploadUrl)
            onFileUploadUrl(image_url)
    }, [image_url])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {"image/*": []},
        maxFiles: 1,
    });
    if (status === STATUS.PENDING)
        return <div
            className="border-2 border-dashed border-gray-400 p-6 text-center rounded-md cursor-pointer hover:border-blue-500 transition-colors"
        >
            <LoadingUi/>
        </div>
    else if (status === STATUS.FULFILLED)
        return (
            <div
                className="border-2 border-dashed border-green-200 text-green-400 p-6 text-center rounded-md cursor-pointer flex flex-row justify-between items-center">
                {message ?? 'File Uploaded Successfully'}
                {image_url &&
                    <img className="object-cover w-[60px] h-[60px]" src={image_url} alt="Uploaded File"/>}
                {!image_url && storedFileUrl &&
                    <img className="object-cover w-[60px] h-[60px]" src={storedFileUrl} alt="Uploaded File"/>}
            </div>
        )
    else
        return (
            <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-400 p-6 text-center rounded-md cursor-pointer hover:border-blue-500 transition-colors"
            >

                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-blue-500">Drop the image here...</p>
                ) : (
                    <div className='flex flex-row justify-center gap-4 items-center'>
                        <p className="text-gray-600">
                            {placeholder ?? "Drag & drop an image, or click to select"}
                        </p>
                        {!image_url && storedFileUrl &&
                            <img className="object-cover w-[60px] h-[60px]" src={storedFileUrl} alt="Uploaded File"/>}
                    </div>

                )}
            </div>
        );
};

export default FileDropzone;
