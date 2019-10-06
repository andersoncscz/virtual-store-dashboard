import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UploadMessage = ({ isDragActive, isDragReject, dragAcceptedMessage, dragRejectedMessage, dragDefaultMessage, dragDisabledMessage, disabled }) => {

    const renderMessage = () => {
        if (isDragActive) {
            if (!isDragReject) {
                return <span className="text-center"><FontAwesomeIcon className="text-primary mr-4" icon="thumbs-up" size="2x" /> {dragAcceptedMessage}</span>
            }
            return <span className="text-center"><FontAwesomeIcon className="text-danger mr-4" icon="thumbs-down" size="2x" /> {dragRejectedMessage}</span>
        }
        else {
            if (!disabled) {
                return <span className="text-center"><FontAwesomeIcon className="text-primary mr-4" icon="cloud-upload-alt" size="2x" /> {dragDefaultMessage}</span>
            }
            return <span className="text-center text-secondary"><FontAwesomeIcon className="text-warning mr-4" icon="exclamation-triangle" size="2x" /> {dragDisabledMessage}</span>
        }
    }

    return (
        <> {renderMessage()} </>
    )
}

export default UploadMessage