import React from 'react'
import UploadFileList from './UploadFileList';

const UploadList = ({ files }) => {
    return (
        <div className="d-flex w-100 justify-content-start mt-4" >
            <ul className="p-0 w-100 overflow-hidden">
                { 
                    files.map((file, index) => {
                        return (
                            <UploadFileList 
                                key={file.id} 
                                file={file}
                                isLastItem={index + 1 === files.length} />
                        )
                    }) 
                }
            </ul>
        </div>
    )
}

export default UploadList