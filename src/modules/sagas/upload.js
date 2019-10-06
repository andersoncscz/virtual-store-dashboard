import { call, put, takeEvery, take, select, throttle } from 'redux-saga/effects';
import { Types } from '../ducks/upload';
import { uploadProductImages as doUpload } from '../services/products';
import { Creators as UploadActions } from '../../modules/ducks/upload';

import store from '../store';

function* initUploadSaga(action) {
    const { pushFiles, uploadFiles, uploadSuccess, uploadError } = yield UploadActions
    try {
        const { dispatch } = yield store
        yield put(pushFiles(action.payload.files))
        yield take(Types.ALLOW_UPLOAD)
        const { storageRef, product, files } = yield select(state => state.upload)
        yield put(uploadFiles(files))
        yield call(doUpload, { dispatch, storageRef, files, product })
        yield put(uploadSuccess())
    } catch (error) {
        yield put(uploadError())
    }
}



function* updateProgressSaga(action) {
    try {
        const { files } = yield action.payload
        yield put(UploadActions.updateProgress(files))
    } 
    catch (error) {
        yield put(UploadActions.uploadError())
    }
}



function* watchInitUploadSaga() {
    yield takeEvery(Types.UPLOAD_SAGA, initUploadSaga)
}



function* watchUpdateProgressSaga() {
    yield throttle(500, Types.UPDATE_PROGRESS_SAGA, updateProgressSaga)
}


const uploadSagas = [
    watchInitUploadSaga(),
    watchUpdateProgressSaga()
]


export default uploadSagas