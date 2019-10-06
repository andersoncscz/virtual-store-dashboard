import * as firebase from "firebase/app";

export const signIn = async (email, password) => {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => resolve(response.user))
            .catch((error) => reject(error));
    })
}

export const signOut = async () => firebase.auth().signOut()

export const isSignedIn = () => firebase.auth().currentUser ? true : false

export const onAuthStateChanged = callback => {
    firebase
        .auth()
        .onAuthStateChanged(callback)
}

export const signInWithSocialNetworks = async () => {
    return new Promise((resolve, reject) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {

            const token = result.credential.accessToken; // This gives you a Google Access Token. You can use it to access the Google API.
            const user = result.user; // The signed-in user info.
            console.log(user)

            resolve({
                ...user,
                token
            })
        })
        .catch((error) => reject(error));
    })
}

export const signUp = async (email, password) => {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => resolve(response.user))
            .catch((error) => reject(error));
    })
}