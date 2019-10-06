import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Animated } from "react-animated-css";

const WidgetBody = ({ icon, iconColor, label, value, Chart }) => {
    
    return (        
        <div className="d-flex h-100 flex-column">
            { 
                value ?
                <> 
                    <Animated className="row h-100 m-2 d-flex" animationIn="fadeIn">
                        <div className="col-lg-5 p-2 d-flex justify-content-center align-items-start">
                            <span className={`${iconColor} rounded-circle d-flex justify-content-center align-items-center`} style={{width: 60, height: 60}}>
                                <FontAwesomeIcon icon={icon} size="2x"/>
                            </span>
                        </div>
                        <div className="col-lg-7 d-flex flex-column justify-content-center align-items-center">
                            <span className="text-dark text-center">{label}</span>
                            <Animated animationIn="bounceIn" animationOut="bounceOut">
                                <span className="text-dark text-center" style={styles.value}><b>{value}</b></span>
                            </Animated>
                        </div>             
                    </Animated>
                    <div className="row">
                        <Animated className="col ml-4 mr-4 mb-2 p-0 rounded col" style={{height:90, width:100}} animationIn="fadeIn">
                            <Chart />
                        </Animated>
                    </div>
                </>
                :
                <div className="d-flex justify-content-center align-items-center h-100">
                    <span className="text-primary"><FontAwesomeIcon icon="circle-notch" spin size="3x"/></span>
                </div>
            }
        </div>
    )
}

const styles = {
    value: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        lineHeight: 1,
    }
}

export default WidgetBody; 