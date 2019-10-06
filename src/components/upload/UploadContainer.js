import React from 'react';
import UploadMessage from './UploadMessage';

const UploadContainer = (props) => {

    const { getRootProps, getInputProps, isDragActive, isDragReject, disabled } = props

    return (    
        
            <div style={styles} className={`p-4 ${isDragActive && 'border-primary'} ${isDragReject && 'border-danger'} ${disabled && 'border-secondary'} rounded d-flex justify-content-center align-items-center`} {...getRootProps()}>
                <input {...getInputProps()} />
                <UploadMessage {...props} />
            </div>
        
    )
}

const styles = {
    borderStyle: 'dashed', 
    borderWidth: 5,
}

export default UploadContainer;