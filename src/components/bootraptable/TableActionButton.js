import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableActionButton = ({label, icon, iconColor, className, onClick}) => {
    return (
        <button type="button" className={className} onClick={onClick}>
            {label}
            {icon && <span className={`${iconColor} ${label && "ml-2"}`}><FontAwesomeIcon icon={icon} /></span>}
        </button>
    )
}

export default TableActionButton
