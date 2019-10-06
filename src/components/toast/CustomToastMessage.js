import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomToastMessage = ({ message, icon, className }) => {
    return (
        <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={icon} size="2x" className={className} /> 
            <span className={`${className} w-100 text-center`}>{message}</span>
        </div>
    )
}

export default CustomToastMessage 