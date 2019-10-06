import * as firebase from "firebase/app";
import 'firebase/firestore';

export const subscribeToTotalOfUsers = (onSuccess) => {
    try {
        return firebase
                .firestore()
                .collection('users')
                .onSnapshot((snapshot) => {
                    onSuccess(snapshot.size)
                }, (error) => {
                    throw error
                })
    } catch (error) {
        console.log(error)
    }
}


export const subscribeToTotalOfOrders = (onSuccess) => {
    try {
        return firebase
                .firestore()
                .collection('orders')
                .onSnapshot((snapshot) => {
                    onSuccess(snapshot.size)
                }, (error) => {
                    throw error
                })
    } catch (error) {
        console.log(error)
    }
}