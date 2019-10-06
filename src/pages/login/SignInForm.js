import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Animated } from "react-animated-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Formik, Form as FormikForm, Field } from 'formik';
import { setLocale, string, object } from 'yup'; // for only what you need
import { validationMessages } from '../../utils/yupValidationMessages';


import { signIn } from '../../modules/services/auth';
import { Creators as UserActions } from '../../modules/ducks/user'



const animationDuration = 1000;

//Validations
setLocale(validationMessages)
const validations = object().shape({
    email: string().email().required(),
    password: string().min(6).required()
});


const LoginForm = ({ history } ) => {
    
    //Hooks
    const [submitState, setSubmitState] = useState({
        isSubmitting: false,
        loginFailed: false,
        isLoading: false,
        signInError: null
    });
    
    const dispatch = useDispatch();

    const handleSubmit = useCallback(
        async ({ email, password }) => {
            
            setSubmitState({ isSubmitting: true })
            
            await setTimeout(async () => {
                try {
                    setSubmitState({ isLoading: true })
                    const user = await signIn(email, password)
                    if (user) {
                        dispatch(UserActions.signInSuccess(user))
                        history.push("/dashboard");
                    }
                } 
                catch (error) {
                    setSubmitState({ 
                        loginFailed: true, 
                        isSubmitting: false,
                        signInError: error
                    })
                }            
            }, animationDuration - 500)
        },
        [dispatch, history]
    );


    return (
        <Formik initialValues={{ email: '', password: ''}} onSubmit={handleSubmit} validationSchema={validations} >
            {({ errors, touched }) => 
                <FormikForm>
                    <div className="form-group">
                        <label className="font-weight-bold text-white" htmlFor="email">Email</label>
                        <Field type="email" name="email" className="form-control form-control" aria-describedby="emailHelp" placeholder="email@example.com" />
                        {
                            errors.email && touched.email && 
                            <Animated animationIn="slideInUp" animationInDuration={700} isVisible={true}>
                                <span className="font-weight-bold text-accent" style={styles.formError}>{errors.email}</span>
                            </Animated>
                        }
                    </div>
                    <div className="form-group">
                        <label className="font-weight-bold text-white" htmlFor="password">Password</label>
                        <Field type="password" name="password" className="form-control form-control" placeholder="******" />
                        {
                            errors.password && touched.password && 
                            <Animated animationIn="slideInUp" animationInDuration={700} isVisible={true}>
                                <span className="font-weight-bold text-accent" style={styles.formError}>{errors.password}</span>
                            </Animated>
                        }
                    </div>
                    <div className="d-flex flex-column mt-4">
                        <div className={`flex-fill flex-column justify-content-center align-items-stretch ${!submitState.isLoading ? 'd-flex' : 'd-none'}`}>
                            <Animated className="flex-fill d-flex mt-1" animationIn="zoomIn" animationOut="zoomOut" animationInDuration={animationDuration} animationOutDuration={animationDuration} isVisible={!submitState.isSubmitting}>
                                <div className="flex-fill d-flex flex-column">
                                    <button disabled={submitState.isSubmitting} type="submit" className="flex-fill font-weight-bold btn btn-outline-light"><span>Entrar</span></button>
                                </div>
                            </Animated>
                            {
                                submitState.loginFailed && submitState.signInError.message &&
                                <Animated className="flex-fill d-flex mt-2" animationIn="fadeIn" animationInDelay={400} animationOut="fadeOut" animationInDuration={animationDuration} animationOutDuration={animationDuration} isVisible={!submitState.isSubmitting}>
                                    <small className="d-flex flex-fill form-text text-muted mt-2">
                                        <span className="flex-fill text-center text-white font-weight-bold">{submitState.signInError.message}</span>
                                    </small>
                                </Animated>
                            }
                        </div>
                        <div style={{display: submitState.isLoading ? 'inline' : 'none'}}>
                            <Animated className="flex-fill d-flex mt-2" animationIn="bounceIn" animationInDuration={animationDuration} animationOutDuration={animationDuration} isVisible={submitState.isLoading}>
                                <div className="flex-fill d-flex flex-column justify-content-center align-items-center">
                                    <span className="flex-fill h-100 text-white"><FontAwesomeIcon icon="circle-notch" size="3x" spin /></span>
                                    <small className="flex-fill form-text font-weight-bold text-white">Logando...</small>
                                </div>
                            </Animated>                                                    
                        </div>
                    </div>
                </FormikForm>
            }
        </Formik>
    );
}

const styles = {
    formError: {
        fontSize: 12
    }
}

export default LoginForm;