import React, { useCallback, useState } from 'react';

import { useDropzone } from 'react-dropzone';
import { uniqueId } from 'lodash';
import fileSize from 'filesize';

import UploadContainer from './UploadContainer';
import UploadList from './UploadList';

import { uploadFile, deleteFile } from '../../modules/services/storage';
import { toastSuccess } from '../../utils/customToast';

const Upload = (props) => {

    const [filesToUpload, setFilesToUpload] = useState([])
    const [isUploading, setIsUploading] = useState(false)
    const [blocDelete, setBlocDelete] = useState(false)

    const  { storageRef, disabled, onDeleteAfterUpload } = props;


    //Deletes an uploaded file
    const deleteUploadedFile = useCallback(async (file) => {
        
        const onDeleting = () => setBlocDelete(true)

        //Success callback for delete
        const onDeleteSuccess = (file) => {
            
            const uploadedFilesRemoved = filesToUpload.filter(f => {
                return file.id !== f.id
            })
            //Update the state
            setBlocDelete(false)
            setFilesToUpload(uploadedFilesRemoved)
            //Updates references of the images
            onDeleteAfterUpload && onDeleteAfterUpload(uploadedFilesRemoved)
        }

        //Error callback for delete
        const onDeleteFail = (id, error) => {
            setBlocDelete(false)
            console.log(id, error)
        }
        //Delete from Cloud Storage
        await deleteFile(storageRef, file, onDeleting, onDeleteSuccess, onDeleteFail)

    },[filesToUpload, onDeleteAfterUpload, storageRef])



    //Start the uploads proccess
    const doUpload = useCallback((files) => {
        return new Promise((resolve) => {
            try {

                const onUploadFinished = () => {
                    const found = files.find(file => !file.uploaded && !file.error)
                    if (found === undefined) {
                        setIsUploading(false) //Enables delete buttons only when there's no files to be uploaded anymore
                        resolve()
                    }
                }
                
                //On uploading Callback
                const onUploading = (id, progress) => {
                    //Updates the upload progress of each file
                    files = files.map(file => {
                        return id === file.id ? {
                            ...file,
                            uploaded: progress === 100,
                            error: false,
                            progress,
                        }
                        : file
                    })
                    //Updates the state
                    setFilesToUpload(files)
                }
                
                //Success callback for each upload file
                const onUploadSuccess = (id, url) => {
                    files = files.map(file => {
                        return id === file.id ? {
                            ...file,
                            error: false,
                            url
                        }
                        : file
                    })
                    //Updates the state with the download URL of the file
                    setFilesToUpload(files)
                    onUploadFinished()
                }
        
                //Upload fail callback
                const onUploadFail = (id, error) => {
                    files = files.map(file => {
                        return id === file.id ? {
                            ...file, 
                            error: true
                        }
                        : file
                    })
                    setFilesToUpload(files)
                    onUploadFinished()
                    console.log(id, error)
                }
        
        
                //Starts the upload for each file
                setIsUploading(true)
                files.forEach(file => {
                    //Only upload files which haven't uploaded yet, or got an error
                    (!file.uploaded || file.error) && uploadFile(storageRef, file, onUploading, onUploadSuccess, onUploadFail)
                })                
            } catch (error) {
                
            }
        })

    }, [storageRef])

    const onDropAccepted = useCallback(acceptedFiles => {
        
        //Files to be uploaded
        const files = acceptedFiles.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: fileSize(file.size),
            previewURL: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
        }))

        setFilesToUpload(files)
        doUpload(files).then(() => toastSuccess({message: 'Imagens enviadas com sucesso!'}))

    }, [doUpload])

    return (
        <div className="w-100">
            <UploadContainer
                isUploading={isUploading}
                {...useDropzone({ onDropAccepted, accept: props.accept, disabled })}
                {...props} />
            { 
                !!filesToUpload.length && <UploadList 
                    isUploading={isUploading} 
                    blocDelete={blocDelete} 
                    deleteUploadedFile={!isUploading ? deleteUploadedFile : null} 
                    files={filesToUpload} /> 
            }
        </div>
    )
}

export default Upload;