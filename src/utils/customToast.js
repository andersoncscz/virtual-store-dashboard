import React from 'react';
import { toast } from 'react-toastify';
import CustomToastMessage from '../components/toast/CustomToastMessage';

const position = toast.POSITION.TOP_CENTER

export const toastSuccess = ({ message, autoClose = true }) => {
    toast.success(
        <CustomToastMessage {...{message, icon: 'check-circle', className: 'text-white'}} />, {
        position,
        autoClose
    });
}

export const toastError = ({ message, autoClose = true }) => {
    toast.error(
        <CustomToastMessage {...{message, icon: 'exclamation-circle', className: 'text-white'}} />, {
        position,
        autoClose
    });
}

export const toastInfo = ({ message, icon = 'exclamation-circle', autoClose = true }) => {
    toast.info(
        <CustomToastMessage {...{message, icon, className: 'text-white'}} />, {
        position,
        autoClose
    });
}

export const toastDefault = ({ message, icon = 'exclamation-circle', autoClose = true }) => {
    toast(
        <CustomToastMessage {...{message, icon, className: 'text-dark'}} />, {
        position,
        autoClose
    });
}


export const toastDismiss = () => toast.dismiss()