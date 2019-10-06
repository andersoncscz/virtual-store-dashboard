import * as firebase from "firebase/app";
import 'firebase/storage';

export const uploadFile = (storageRef, file, onUploading, onSuccess, onFail) => {
    try {

        const uploadTask = firebase.storage().ref(`${storageRef}/${file.name}`).put(file.file)
        
        uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            onUploading(file.id, parseInt(progress))
        }, error => {
            throw error
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                onSuccess(file.id, downloadURL)
            });
        })
    } 
    catch (error) {
        onFail(file.id, error)
    }
}


export const deleteFile = async (storageRef, file, onDeleting, onSuccess, onFail) => {
    try {
        onDeleting()
        await firebase.storage().ref(`${storageRef}/${file.name}`).delete()
        onSuccess(file)
    } 
    catch (error) {
        onFail(file.id, error)
    }
}
