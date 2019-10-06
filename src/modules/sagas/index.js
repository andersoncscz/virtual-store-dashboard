import { all } from 'redux-saga/effects';
import uploadSagas from './upload';

export default function* root() {
    //Todos os watchers de sagas ficam aqui
    yield all([
        ...uploadSagas,
    ]);
}