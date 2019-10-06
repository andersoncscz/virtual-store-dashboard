import React from 'react'

const TableActions = (props) => {
    const { children } = props
    return (
        <div className={props.className} {...props}>
            {children}
        </div>
    )
}

export default TableActions