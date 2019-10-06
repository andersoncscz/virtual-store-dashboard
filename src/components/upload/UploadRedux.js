import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { uniqueId } from 'lodash';
import fileSize from 'filesize';

import UploadContainer from './UploadContainer';
import UploadList from './UploadList';

import { Creators as UploadActions } from '../../modules/ducks/upload';

const Upload = (props) => {
    
    const dispatch = useDispatch();    
    const { disabled, accept } = props;
    const { isUploading, files } = useSelector(state => state.upload);

    const onDropAccepted = useCallback(acceptedFiles => {
        
        //Files to be uploaded
        const filesSelected = acceptedFiles.map(file => ({
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
        
        dispatch(UploadActions.uploadFilesSaga(files.concat(filesSelected)))

    }, [dispatch, files])

    return (
        <div className="w-100">
            <UploadContainer {...props} {...useDropzone({ onDropAccepted, accept, disabled })} isUploading={isUploading} />
            { !!files.length && <UploadList isUploading={isUploading} files={files} /> }
        </div>
    )
}

export default Upload;