import React from 'react';

const PageError = ({ code, text }) => (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <span className="display-1">{code}</span>
        <h1>{text}</h1>
    </div>
)

export default PageError;