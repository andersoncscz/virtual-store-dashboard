import * as firebase from "firebase/app";
import 'firebase/firestore';

import { Creators as UploadActions } from '../ducks/upload';
import { uploadFile } from './storage';

export const getCategories = async (onSuccess, onFail) => {
    try {
        const snapshot = await firebase.firestore().collection('products').get()
        const docs = snapshot.docs.map(category => ({
            id: category.id,
            ...category.data()
        }))
        onSuccess(docs)
    } catch (error) {
        console.log(error)
    }
}


export const getProducts = async (categories, onFetching, onSuccess, onFail) => {

    try {
        
        onFetching()
        Promise.all(
            categories.map(category => {
                return firebase.firestore()
                    .collection('products')
                    .doc(category.id)
                    .collection('items')
                    .get()
                    .then(response => {
                        return response.docs.map(product => ({
                            category: category.id,
                            categoryTitle: category.title,
                            productId: product.id,
                            ...product.data(),
                        }))
                    })
            })
        )
        .then(result => {
            if (!!result.length) {
                const data = result.reduce((outArray, currentArray) => outArray.concat(currentArray))
                onSuccess(data)
            }
        })
    } catch (error) {
        console.log(error)
        onFail(error)
    }
}


export const getProductsSizes = async (onSuccess, onFail) => {
    try {
        const snapshot = await firebase.firestore().collection('products_sizes').get()
        const docs = snapshot.docs[0].data().sizes
        onSuccess(docs)
    } catch (error) {
        console.log(error)
    }
}


export const saveProduct = async (product, onSuccess, onFail) => {

    const { category, data, productId } = product

    try {
        let doc = null
        const ref = firebase
                .firestore()
                .collection('products')
                .doc(category)
                .collection('items')
            
        if (productId === undefined) {
            doc = await ref.add(data)
            product.productId = doc.id
        }
        else {
            await ref.doc(productId).update(data)
        }

        onSuccess(product)

    } catch (error) {
        console.log(error)
        onFail(error)
    }
}

export const saveUrlProductImages = async (product, files, onSuccess, onFail) => {
    
    const { category, productId } = product
    const images = files.map(f => f.url)
    
    try {
        await firebase
                .firestore()
                .collection('products')
                .doc(category)
                .collection('items')
                .doc(productId)
                .update({ images })

        onSuccess()
    }
    catch (error) {
        console.log(error)
        onFail(error)
    }
}

export const uploadProductImages = ({ dispatch, storageRef, files, product }) => {

    return new Promise((resolve, reject) => {
        try {

            const onUploadFinished = () => {
                if (!files.find(file => !file.uploaded && !file.error && !file.url)) {
                    product && saveUrlProductImages(
                        product, 
                        files, 
                        () => {}, 
                        (error) => {}
                    )
                    resolve()
                }
            }
            
            //On uploading Callback
            const onUploading = (id, progress) => {
                //Updates the upload progress of each file
                files = files.map(file => {
                    return id === file.id ? {
                        ...file,
                        uploaded: progress === 100,
                        error: false,
                        progress,
                    }
                    : file
                })
                dispatch(UploadActions.updateProgressSaga(files))
            }
            
            //Success callback for each upload file
            const onUploadSuccess = (id, url) => {
                files = files.map(file => {
                    return id === file.id ? {
                        ...file,
                        error: false,
                        url
                    }
                    : file
                })
                dispatch(UploadActions.updateProgress(files))
                onUploadFinished()
            }
    
            //Upload fail callback
            const onUploadFail = (id, error) => {
                files = files.map(file => {
                    return id === file.id ? {
                        ...file, 
                        error: true
                    }
                    : file
                })
                dispatch(UploadActions.updateProgress(files))
                onUploadFinished()
                console.log(id, error)
            }
    
            //Starts the upload for each file
            files.forEach(file => {
                //Only upload files which haven't uploaded yet, or got an error
                (!file.uploaded || file.error) && uploadFile(storageRef, file, onUploading, onUploadSuccess, onUploadFail)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteProduct = async (product, onSuccess, onFail) => {
    try {
        //Delete product data
        const { category, productId } = product
        await firebase
            .firestore()
            .collection("products")
            .doc(category)
            .collection('items')
            .doc(productId)
            .delete()
        
        onSuccess()
        deleteProductImages(`${category}/${productId}`)
            
    } catch (error) {
        onFail(error)
    }
}


export const deleteProductImagesFromUrls = async (files) => {
    try {
        files.forEach(file => {
            firebase.storage().refFromURL(file.url).delete()
        })                    
    } catch (error) {
        console.log(error)
    }
}


export const deleteProductImages = (path) => {
    console.log(`Deleting files from: ${path}`)
    const ref = firebase.storage().ref(path);
    ref.listAll().then(dir => {
        dir.items.forEach(fileRef => {
            firebase.storage().ref(`${ref.fullPath}/${fileRef.name}`).delete();
            console.log(`Deleted: ${ref.fullPath}/${fileRef.name}`)
        });
    }).catch(error => {
        console.log(`Error to delete: ${error}`)
    });    
}