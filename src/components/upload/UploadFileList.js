import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Animated } from "react-animated-css";

import 'react-circular-progressbar/dist/styles.css';
const animationDuration = 600

const UploadFileList = ({ file, isLastItem }) => {

    return (
        <li className={`${!isLastItem&&'border-bottom'} mt-2 w-100`} style={{listStyleType: 'none'}}>
            <div className="row ml-1 mr-1" style={{minHeight: 80}}>
                <div className="w-25 p-1 d-flex justify-content-center align-items-center">
                    <img alt="" style={{maxHeight: 60, maxWidth: 60, minWidth: 40, minHeight: 40}} className="d-flex flex-fill rounded-sm" src={file.previewURL} />
                </div>
                <div className="w-50 d-none d-md-flex flex-column justify-content-center align-items-start">
                    <strong className="text-break">{file.name}</strong>
                    <span>{file.readableSize}</span>
                </div>
                <div className="p-0 d-flex flex-fill justify-content-center align-items-center" style={{minHeight: 50}}>
                    <div className="d-flex justify-content-end h-100 w-100">
                        <div className="p-1 mr-4 d-flex justify-content-center align-items-center">
                            <Animated animationInDuration={animationDuration} animationIn="bounceIn" animateOnMount={false} className="h-100 p-1 d-flex justify-content-center align-items-center" isVisible={file.url !== null}>
                                <a href={file.url} target="blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon="link" size="1x" className="text-dark" />
                                </a>
                            </Animated>
                        </div>
                        <div className="p-1 mr-4 d-flex justify-content-center align-items-center position-relative">
                            <Animated animationInDuration={animationDuration} animationIn="bounceIn" animationOut="bounceOut" className="h-100 p-1 d-flex justify-content-center align-items-center position-absolute" isVisible={!file.uploaded && !file.error} >
                                <CircularProgressbar 
                                    styles={{ 
                                        root: {width: 50},
                                        path: {
                                            stroke: '#673AB7',
                                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                            strokeLinecap: 'butt',
                                            // Customize transition animation
                                            transition: 'stroke-dashoffset 0.5s ease 0s',
                                            // Rotate the path
                                            transform: 'rotate(0.25turn)',
                                            transformOrigin: 'center center',                                    
                                        },
                                        text: {
                                            fill: '#000',
                                            fontSize: 25,
                                        }
                                    }} 
                                    value={file.progress}
                                    text={`${file.progress}%`} />
                            </Animated>
                            <Animated animationInDuration={animationDuration} animationInDelay={900} animationIn="bounceIn" animationOut="bounceOut" className="h-100 p-1 d-flex justify-content-center align-items-center position-absolute" isVisible={file.uploaded || file.error} >
                                { file.error && <FontAwesomeIcon icon="exclamation-circle" size="1x" className="text-danger" /> }
                                { file.uploaded && <FontAwesomeIcon icon="check-circle" size="1x" className="text-primary" /> }
                            </Animated>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default UploadFileList