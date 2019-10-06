import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { onAuthStateChanged } from '../../modules/services/auth';
import { Creators as UserActions } from '../../modules/ducks/user';

const Splash = ({ history }) => {
    const { signInSuccess } = UserActions;
    const dispatch = useDispatch()

    useEffect(() => {
        try {
            const handleAuthStateChanged = user => {
                if (user) {
                    dispatch(signInSuccess(user))
                    history.push("/dashboard");
                }
                else {
                    history.push("/signin");
                }
            }
            
            setTimeout(() => onAuthStateChanged(handleAuthStateChanged), 500)
        } 
        catch (error) {
            console.log(error)
        }
    }, [history, dispatch, signInSuccess])


    return (
        <div className="vh-100 vw-100">
            <div className="d-flex justify-content-center align-items-center vh-100 vw-100 text-primary">
                <FontAwesomeIcon icon="circle-notch" spin size="4x" />
            </div>            
        </div>
    )
}

export default withRouter(Splash);
